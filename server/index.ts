import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import multer from "multer";

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
    // Sanitize filename
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, sanitized);
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

  // API endpoint for CV upload
  app.post("/api/upload-cv", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { language } = req.body;
      if (!["english", "spanish", "portuguese"].includes(language)) {
        return res.status(400).json({ error: "Invalid language" });
      }

      const cvJsonPath = path.resolve(__dirname, "../client/public/cv/cv.json");
      
      // Read current cv.json
      let cvData: Record<string, string> = {
        english: "",
        spanish: "",
        portuguese: "",
      };

      try {
        const content = await fs.readFile(cvJsonPath, "utf-8");
        cvData = JSON.parse(content);
      } catch (error) {
        // If file doesn't exist or is invalid, use default
      }

      // Update the language entry with new file path
      cvData[language] = `/cv/${req.file.filename}`;

      // Write updated cv.json
      await fs.writeFile(cvJsonPath, JSON.stringify(cvData, null, 2));

      res.json({
        success: true,
        filename: req.file.filename,
        path: `/cv/${req.file.filename}`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Upload failed" });
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
