import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import multer from "multer";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const uploadDir = path.resolve(__dirname, "../client/public/cv");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (_req, file, cb) => {
    // Generate safe filename with timestamp to avoid conflicts and security issues
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-]/g, "_");
    const safeFilename = `${baseName}-${timestamp}${ext}`;
    cb(null, safeFilename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Rate limiting for upload endpoint
  const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 upload requests per windowMs
    message: "Too many upload requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });

  // API endpoint for CV upload with rate limiting
  app.post("/api/upload-cv", uploadLimiter, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // If a specific filename is requested, rename the file to be stable
      // This allows the client to control the final path like /cv/Franzetti-CV-English.pdf
      const { filename } = req.body;
      let finalFilename = req.file.filename;

      if (filename) {
        const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uploadDir = path.resolve(__dirname, "../client/public/cv");
        const newPath = path.join(uploadDir, safeName);

        // Overwrite existing file with same name
        await fs.rename(req.file.path, newPath);
        finalFilename = safeName;
      }

      res.json({
        success: true,
        filename: finalFilename,
        path: `/cv/${finalFilename}`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // API endpoint to save site content JSON
  app.post("/api/save-content", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "No content provided" });
      }

      // Determine path to siteContent.json
      // In dev, it's usually in src/data. In prod, we might need to handle it differently 
      // but for this implementation we target the source file for rebuilds or persistence.
      const contentPath = path.resolve(__dirname, "../client/src/data/siteContent.json");

      await fs.writeFile(contentPath, JSON.stringify(content, null, 4), "utf-8");

      res.json({ success: true, message: "Content saved successfully" });
    } catch (error) {
      console.error("Save content error:", error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
