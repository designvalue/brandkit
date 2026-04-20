import { BrandKitShell } from "@/components/brand-kit-shell"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata("/color")

export default function ColorPage() {
  return <BrandKitShell />
}
