import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const localSavePlugin = () => ({
  name: "local-save-content",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Log all requests to see if middleware is active
      // process.stdout.write(`[LocalSave] ${req.method} ${req.url}\n`);

      if (req.url === "/api/save-content" && req.method === "POST") {
        console.log("[LocalSave] Intercepting save-content request");
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => {
          const body = Buffer.concat(chunks).toString();
          try {
            const parsed = JSON.parse(body);
            const content = parsed.content;

            // Resolve path relative to the project root (where vite.config.ts is)
            const filePath = path.resolve(
              import.meta.dirname,
              "client/src/data/siteContent.json"
            );

            console.log(`[LocalSave] Writing to ${filePath}`);
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Content saved successfully (local)" }));
          } catch (e) {
            console.error("[LocalSave] Error saving:", e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to save locally" }));
          }
        });
        return;
      }
      next();
    });
  },
});

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  localSavePlugin(),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
