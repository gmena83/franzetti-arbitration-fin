import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import busboy from "busboy";
import path from "path";
import { Readable } from "stream";

// Rate limiting storage (in-memory, resets on cold start)
// Note: In serverless environments, functions can be cold-started frequently,
// which means rate limiting may reset. For production, consider using a persistent
// store like Redis or DynamoDB for more reliable rate limiting.
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

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check rate limiting - require valid IP
  const ip = event.headers["x-forwarded-for"]?.split(",")[0] || event.headers["x-nf-client-connection-ip"];
  if (!ip) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Unable to identify request source" }),
    };
  }
  
  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Too many upload requests, please try again later." }),
    };
  }

  return new Promise((resolve) => {
    try {
      const contentType = event.headers["content-type"] || "";
      
      // Validate Content-Type
      if (!contentType.includes("multipart/form-data")) {
        resolve({
          statusCode: 400,
          body: JSON.stringify({ error: "Content-Type must be multipart/form-data" }),
        });
        return;
      }
      
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
        
        file.on("error", (err) => {
          console.error("File stream error:", err);
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

          // Store file in Netlify Blobs (persistent storage)
          const store = getStore({
            name: "cv-files",
            siteID: context.site?.id || process.env.SITE_ID,
            token: process.env.NETLIFY_TOKEN || context.token,
          });

          await store.set(safeFilename, fileData, {
            metadata: {
              contentType: "application/pdf",
              language,
              uploadedAt: new Date().toISOString(),
            },
          });

          // Update cv.json in blobs
          const cvConfigStore = getStore({
            name: "cv-config",
            siteID: context.site?.id || process.env.SITE_ID,
            token: process.env.NETLIFY_TOKEN || context.token,
          });

          let cvData: Record<string, string> = {
            english: "",
            spanish: "",
            portuguese: "",
          };

          try {
            const existingData = await cvConfigStore.get("cv.json", { type: "json" });
            if (existingData) {
              cvData = existingData as Record<string, string>;
            }
          } catch (error) {
            console.warn("cv.json not found in blobs, using defaults");
          }

          // Store the blob URL
          cvData[language] = `/.netlify/blobs/cv-files/${safeFilename}`;
          await cvConfigStore.setJSON("cv.json", cvData);

          resolve({
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              filename: safeFilename,
              path: `/.netlify/blobs/cv-files/${safeFilename}`,
            }),
          });
        } catch (error) {
          console.error("Upload error:", error);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ 
              error: "Upload failed",
              details: error instanceof Error ? error.message : String(error)
            }),
          });
        }
      });

      bb.on("error", (error) => {
        console.error("Busboy error:", error);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ 
            error: "Upload processing failed",
            details: error instanceof Error ? error.message : String(error)
          }),
        });
      });

      // Convert body to buffer and pipe to busboy
      // Use "binary" encoding for non-base64 bodies to prevent corruption of binary data
      const bodyBuffer = Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "binary");
      const readable = Readable.from(bodyBuffer);
      readable.pipe(bb);

    } catch (error) {
      console.error("Handler error:", error);
      resolve({
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Internal server error",
          details: error instanceof Error ? error.message : String(error)
        }),
      });
    }
  });
};
