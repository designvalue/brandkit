import { BrandKitShell } from "@/components/brand-kit-shell"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata("/photo")

export default function PhotoPage() {
  return <BrandKitShell />
}
