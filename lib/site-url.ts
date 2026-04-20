/**
 * Canonical site origin for sitemap/robots and other absolute URLs.
 * Set NEXT_PUBLIC_DESIGNVALUE_SITE_URL in production (e.g. https://designvalue.com).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_DESIGNVALUE_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")

  return "http://localhost:3000"
}
