import type { Handler, HandlerEvent } from "@netlify/functions";
import busboy from "busboy";
import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";

// Rate limiting storage (in-memory, resets on cold start)
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

export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check rate limiting
  const ip = event.headers["x-forwarded-for"]?.split(",")[0] || "unknown";
  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Too many upload requests, please try again later." }),
    };
  }

  return new Promise((resolve) => {
    try {
      const contentType = event.headers["content-type"] || "";
      
      // Parse multipart form data
      const bb = busboy({ 
        headers: { "content-type": contentType },
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB
      });

      let fileData: Buffer | null = null;
      let filename = "";
      let mimeType = "";
      let language = "";

      bb.on("file", (fieldname, file, info) => {
        filename = info.filename;
        mimeType = info.mimeType;
        
        const chunks: Buffer[] = [];
        file.on("data", (chunk) => {
          chunks.push(chunk);
        });
        
        file.on("end", () => {
          fileData = Buffer.concat(chunks);
        });
      });

      bb.on("field", (fieldname, val) => {
        if (fieldname === "language") {
          language = val;
        }
      });

      bb.on("finish", async () => {
        try {
          // Validate inputs
          if (!fileData) {
            resolve({
              statusCode: 400,
              body: JSON.stringify({ error: "No file uploaded" }),
            });
            return;
          }

          if (mimeType !== "application/pdf") {
            resolve({
              statusCode: 400,
              body: JSON.stringify({ error: "Only PDF files are allowed" }),
            });
            return;
          }

          if (!["english", "spanish", "portuguese"].includes(language)) {
            resolve({
              statusCode: 400,
              body: JSON.stringify({ error: "Invalid language" }),
            });
            return;
          }

          // Generate safe filename
          const timestamp = Date.now();
          const ext = path.extname(filename);
          const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9-]/g, "_");
          const safeFilename = `${baseName}-${timestamp}${ext}`;

          // Save file to the cv directory
          const uploadDir = path.join(process.cwd(), "client", "public", "cv");
          await fs.mkdir(uploadDir, { recursive: true });
          
          const filePath = path.join(uploadDir, safeFilename);
          await fs.writeFile(filePath, fileData);

          // Update cv.json
          const cvJsonPath = path.join(uploadDir, "cv.json");
          let cvData: Record<string, string> = {
            english: "",
            spanish: "",
            portuguese: "",
          };

          try {
            const content = await fs.readFile(cvJsonPath, "utf-8");
            cvData = JSON.parse(content);
          } catch (error) {
            console.warn("cv.json not found or invalid, using defaults");
          }

          cvData[language] = `/cv/${safeFilename}`;
          await fs.writeFile(cvJsonPath, JSON.stringify(cvData, null, 2));

          resolve({
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              filename: safeFilename,
              path: `/cv/${safeFilename}`,
            }),
          });
        } catch (error) {
          console.error("Upload error:", error);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: "Upload failed" }),
          });
        }
      });

      bb.on("error", (error) => {
        console.error("Busboy error:", error);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: "Upload processing failed" }),
        });
      });

      // Convert base64 body to buffer and pipe to busboy
      const bodyBuffer = Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8");
      const readable = Readable.from(bodyBuffer);
      readable.pipe(bb);

    } catch (error) {
      console.error("Handler error:", error);
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      });
    }
  });
};
