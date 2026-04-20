import type { MetadataRoute } from "next"
import { getAbsoluteUrl, seoRoutes } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return seoRoutes.map((route) => ({
    url: getAbsoluteUrl(route.path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority ?? 0.8,
  }))
}
