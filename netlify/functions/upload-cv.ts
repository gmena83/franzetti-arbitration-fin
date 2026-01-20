import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import busboy from "busboy";
import path from "path";

const uploadCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = uploadCounts.get(ip);

  if (!record || now > record.resetTime) {
    uploadCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIp(event: HandlerEvent): string | null {
  const headers = event.headers || {} as Record<string, string>;
  return (
    headers["x-nf-client-connection-ip"] ||
    (headers["x-forwarded-for"] && headers["x-forwarded-for"].split(",")[0]) ||
    headers["x-real-ip"] ||
    headers["client-ip"] ||
    headers["remote-addr"] ||
    null
  );
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const ip = getClientIp(event);
    if (ip && !checkRateLimit(ip)) {
      return {
        statusCode: 429,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Too many upload requests, please try again later." }),
      };
    }

    const contentType = event.headers["content-type"] || "";
    if (!contentType.startsWith("multipart/form-data")) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid content type" }),
      };
    }

    const bb = busboy({
      headers: { "content-type": contentType },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    });

    let fileData: Buffer | null = null;
    let filename = "";
    let mimeType = "";
    let language = "";

    bb.on("file", (_fieldname, file, info) => {
      filename = info.filename;
      mimeType = info.mimeType;
      const chunks: Buffer[] = [];
      file.on("data", (chunk) => chunks.push(chunk));
      file.on("end", () => {
        fileData = Buffer.concat(chunks);
      });
    });

    bb.on("field", (fieldname, val) => {
      if (fieldname === "language") language = val;
    });

    const bodyBuffer = Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8");

    const result = await new Promise<{ statusCode: number; headers?: Record<string, string>; body: string }>((resolve) => {
      bb.on("finish", async () => {
        try {
          if (!fileData) {
            resolve({
              statusCode: 400,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ error: "No file uploaded" }),
            });
            return;
          }

          if (mimeType !== "application/pdf") {
            resolve({
              statusCode: 400,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ error: "Only PDF files are allowed" }),
            });
            return;
          }

          if (!["english", "spanish", "portuguese"].includes(language)) {
            resolve({
              statusCode: 400,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ error: "Invalid language" }),
            });
            return;
          }

          const filesStore = getStore({ name: "cv-files" });
          const configStore = getStore({ name: "cv-config" });

          const ext = path.extname(filename) || ".pdf";
          const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9-]/g, "_");
          const safeFilename = `${baseName}-${Date.now()}${ext}`;

          await filesStore.set(safeFilename, toArrayBuffer(fileData), { contentType: "application/pdf" });

          const cvData: Record<string, string> =
            (await configStore.get("cv.json", { type: "json" })) || {
              english: "",
              spanish: "",
              portuguese: "",
            };

          cvData[language] = `/cv/${safeFilename}`;

          await configStore.set("cv.json", JSON.stringify(cvData), { contentType: "application/json" });

          resolve({
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: safeFilename, path: `/cv/${safeFilename}` }),
          });
        } catch (error) {
          console.error("Upload error:", error);
          resolve({
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Upload failed" }),
          });
        }
      });

      try {
        bb.end(bodyBuffer); // Feed decoded bytes into Busboy
      } catch (e) {
        console.error("Busboy error:", e);
        resolve({
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: "Failed to parse upload" }),
        });
      }
    });

    return result;
  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
