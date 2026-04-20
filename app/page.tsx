import { BrandKitShell } from "@/components/brand-kit-shell"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata("/")

export default function HomePage() {
  return <BrandKitShell />
}
