import { Handler } from "@netlify/functions";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const FILE_PATH = "client/src/data/siteContent.json";
// Ensure the branch is correct, default to main
const BRANCH = process.env.BRANCH || "main";

const handler: Handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        console.error("Missing environment variables:", {
            hasToken: !!GITHUB_TOKEN,
            hasOwner: !!REPO_OWNER,
            owner: REPO_OWNER,
            hasName: !!REPO_NAME,
            name: REPO_NAME,
        });
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Server configuration error",
                details: `Missing: ${[
                    !GITHUB_TOKEN && "GITHUB_TOKEN",
                    !REPO_OWNER && "REPO_OWNER",
                    !REPO_NAME && "REPO_NAME"
                ].filter(Boolean).join(", ")}`
            }),
        };
    }

    try {
        const { content } = JSON.parse(event.body || "{}");

        if (!content) {
            return { statusCode: 400, body: "Missing content" };
        }

        // 1. Get the current file SHA
        const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;

        let sha = "";
        try {
            const { data } = await axios.get(getFileUrl, {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
            });
            sha = data.sha;
        } catch (error: any) {
            if (error.response?.status === 404) {
                // File doesn't exist yet, which is fine for first create, but for this use case it should exist.
                // We'll proceed with empty SHA (create mode) if that were the case, but here we expect it.
                console.warn("File not found, checking if creating new file is intended.");
            } else {
                throw error;
            }
        }

        // 2. Prepare the commit
        const newContentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString("base64");

        const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
        const commitMessage = `Update site content via Admin Dashboard [${new Date().toISOString()}]`;

        await axios.put(
            putUrl,
            {
                message: commitMessage,
                content: newContentBase64,
                sha: sha || undefined, // undefined if creating new
                branch: BRANCH,
            },
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Content saved successfully" }),
        };
    } catch (error: any) {
        console.error("Error saving content:", error.response?.data || error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save content to GitHub" }),
        };
    }
};

export { handler };
