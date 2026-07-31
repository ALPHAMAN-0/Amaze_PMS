import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
