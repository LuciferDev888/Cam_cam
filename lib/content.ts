import fs from "fs/promises";
import path from "path";
import { LandingPageData } from "@/types/landing";

export async function getLandingPageContent(slug: string): Promise<LandingPageData | null> {
  try {
    // Read the JSON file from the content directory
    const filePath = path.join(process.cwd(), "content", `${slug}.json`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent) as LandingPageData;
  } catch (error) {
    console.error(`Error loading content for slug ${slug}:`, error);
    return null;
  }
}
