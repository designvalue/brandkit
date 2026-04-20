import type { Metadata } from "next"
import { getSiteUrl } from "@/lib/site-url"

type SeoRoute = {
  path: string
  title: string
  description: string
  priority?: number
}

export const seoRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "BrandKit by designvalue.co",
    description:
      "Open source brand guidelines platform built with React and Next.js.",
    priority: 1,
  },
  {
    path: "/color",
    title: "Color Guidelines",
    description:
      "Explore primary, secondary, gradient, and grayscale color systems for consistent brand expression.",
  },
  {
    path: "/logo",
    title: "Logo Guidelines",
    description:
      "Learn logo usage, spacing, and composition standards to keep brand marks consistent across touchpoints.",
  },
  {
    path: "/photo",
    title: "Photography Guidelines",
    description:
      "Define image direction, visual tone, and composition principles for cohesive brand photography.",
  },
  {
    path: "/icons",
    title: "Icon Guidelines",
    description:
      "Use icon style and sizing guidance to keep interface language clear, recognizable, and on brand.",
  },
  {
    path: "/typography",
    title: "Typography Guidelines",
    description:
      "Reference typeface choices, hierarchy, and usage rules that preserve readability and brand identity.",
  },
]

const seoRouteByPath = new Map(seoRoutes.map((route) => [route.path, route]))

export function getSeoRoute(path: string): SeoRoute {
  return (
    seoRouteByPath.get(path) ?? {
      path,
      title: "BrandKit by designvalue.co",
      description:
        "Open source brand guidelines platform built with React and Next.js.",
    }
  )
}

export function getAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}

export function getRouteMetadata(path: string): Metadata {
  const route = getSeoRoute(path)
  const canonicalUrl = getAbsoluteUrl(route.path)

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: route.title,
      description: route.description,
      siteName: "BrandKit by designvalue.co",
    },
    twitter: {
      card: "summary",
      title: route.title,
      description: route.description,
    },
  }
}
