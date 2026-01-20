import type { Handler, HandlerContext } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export const handler: Handler = async (event, context: HandlerContext) => {
  try {
    // Get cv.json from Netlify Blobs
    const store = getStore({
      name: "cv-config",
      siteID: context.site?.id || process.env.SITE_ID,
      token: process.env.NETLIFY_TOKEN || context.token,
    });

    const cvData = await store.get("cv.json", { type: "json" });
    
    if (!cvData) {
      // Return default structure if not found
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          english: "",
          spanish: "",
          portuguese: "",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(cvData),
    };
  } catch (error) {
    console.error("Error retrieving cv.json:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Failed to retrieve CV configuration" }),
    };
  }
};
