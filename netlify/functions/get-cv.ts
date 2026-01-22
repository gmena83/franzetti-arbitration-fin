import type { Handler, HandlerContext } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export const handler: Handler = async (event, context: HandlerContext) => {
  // Get the filename from the path
  const filename = event.path.split("/").pop();
  
  if (!filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No filename provided" }),
    };
  }

  try {
    // Get the file from Netlify Blobs
    const store = getStore({
      name: "cv-files",
      siteID: context.site?.id || process.env.SITE_ID,
      token: process.env.NETLIFY_TOKEN || context.token,
    });

    const fileData = await store.get(filename, { type: "arrayBuffer" });
    
    if (!fileData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "File not found" }),
      };
    }

    // Return the PDF file
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000",
      },
      body: Buffer.from(fileData).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error retrieving file:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve file" }),
    };
  }
};
