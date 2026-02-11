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

  // API endpoint to revert site content (Local Dev/Git based)
  app.post("/api/revert-content", async (req, res) => {
    try {
      const contentPath = path.resolve(__dirname, "../client/src/data/siteContent.json");
      // For local dev, we try to grab the version from HEAD^ (previous commit)
      // This requires git to be available and the repo to have commits.
      const { exec } = await import("child_process");
      const { promisify } = await import("util");
      const execAsync = promisify(exec);

      // We need to resolve the relative path for git
      // Assuming server is running from root or similar, but let's be safe
      // valid git path: client/src/data/siteContent.json

      try {
        // Check if git is available and repo has history
        await execAsync("git status");

        // Restore file from previous commit
        // Note: This matches the 'client/src/data/siteContent.json' path relative to repo root
        await execAsync("git show HEAD~1:client/src/data/siteContent.json > \"" + contentPath + "\"");

        console.log("Locally reverted siteContent.json to HEAD~1");
        res.json({ success: true, message: "Content reverted successfully to previous commit (Local Git)" });
      } catch (gitError) {
        console.warn("Local git revert failed, determining it is likely not a git repo or no history:", gitError);
        // Fallback: If we can't revert via git, we might just fail or mock success
        // For now, let's return an error saying local revert requires git history
        res.status(500).json({
          error: "Local revert failed. Ensure you are in a git repository with history.",
          details: (gitError as any).message
        });
      }

    } catch (error) {
      console.error("Revert content error:", error);
      res.status(500).json({ error: "Failed to revert content" });
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
