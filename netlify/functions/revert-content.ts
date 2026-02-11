import { Handler } from "@netlify/functions";
import axios from "axios";

const FILE_PATH = "client/src/data/siteContent.json";

const handler: Handler = async (event, context) => {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.REPO_OWNER;
    const REPO_NAME = process.env.REPO_NAME;
    const BRANCH = process.env.BRANCH || "main";

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server configuration error. Missing GitHub credentials." }),
        };
    }

    try {
        // 1. Get the commit history for the file to find the previous version
        const commitsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=${FILE_PATH}&sha=${BRANCH}&per_page=2`;

        const { data: commits } = await axios.get(commitsUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (commits.length < 2) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No previous version found to revert to." }),
            };
        }

        const previousCommitSha = commits[1].sha;
        console.log(`Reverting to content from commit: ${previousCommitSha}`);

        // 2. Get the content of the file at the previous commit
        const fileContentUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${previousCommitSha}`;
        const { data: fileData } = await axios.get(fileContentUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        // The content is already base64 encoded in fileData.content
        const oldContentBase64 = fileData.content;

        // 3. Get the *current* SHA of the file (head) to allow the update
        const currentFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
        const { data: currentFileData } = await axios.get(currentFileUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        const currentSha = currentFileData.sha;


        // 4. Commit the old content as a new update
        const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
        const commitMessage = `Revert site content to version ${previousCommitSha.substring(0, 7)} via Admin Dashboard`;

        await axios.put(
            putUrl,
            {
                message: commitMessage,
                content: oldContentBase64,
                sha: currentSha,
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
            body: JSON.stringify({ message: "Content reverted successfully" }),
        };

    } catch (error: any) {
        console.error("Error reverting content:", error.response?.data || error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to revert content on GitHub", details: error.message }),
        };
    }
};

export { handler };
