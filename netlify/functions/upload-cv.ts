import { Handler } from "@netlify/functions";
import Busboy from "busboy";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const BRANCH = process.env.BRANCH || "main";

function parseMultipart(event: any): Promise<{ buffer: Buffer; filename: string }> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: event.headers,
    });

    let fileBuffer: Buffer[] = [];
    let fileName = "";

    busboy.on("file", (fieldname, file, info) => {
      const { filename } = info;
      // If the client provided a target filename in a field, strictly we should use that, 
      // but busboy event order isn't guaranteed (field vs file). 
      // Admin.tsx sends "filename" as a field.
      // However, for simplicity/robustness, we might rely on the client sending the file *with* the correct name 
      // or just the fieldname.
      // Let's capture the file content first.

      file.on("data", (data) => {
        fileBuffer.push(data);
      });
    });

    busboy.on("field", (fieldname, val) => {
      if (fieldname === "filename") {
        fileName = val;
      }
    });

    busboy.on("finish", () => {
      if (!fileName && !fileBuffer.length) {
        reject(new Error("No file uploaded"));
        return;
      }
      resolve({
        buffer: Buffer.concat(fileBuffer),
        filename: fileName,
      });
    });

    busboy.on("error", (error: any) => reject(error));

    busboy.write(event.body, event.isBase64Encoded ? "base64" : "binary");
    busboy.end();
  });
}

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  try {
    const { buffer, filename } = await parseMultipart(event);

    if (!buffer || !filename) {
      return { statusCode: 400, body: "Missing file or filename" };
    }

    const filePath = `client/public/cv/${filename}`;

    // 1. Get SHA if exists
    const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`;
    let sha = "";

    try {
      const { data } = await axios.get(getFileUrl, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      });
      sha = data.sha;
    } catch (e: any) {
      // Ignore 404 (new file)
      if (e.response?.status !== 404) throw e;
    }

    // 2. Commit file
    const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
    await axios.put(
      putUrl,
      {
        message: `Update CV: ${filename} [${new Date().toISOString()}]`,
        content: buffer.toString("base64"),
        sha: sha || undefined,
        branch: BRANCH,
      },
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "CV uploaded successfully" }),
    };

  } catch (error: any) {
    console.error("Upload error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to upload CV" }),
    };
  }
};

export { handler };
