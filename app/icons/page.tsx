import { BrandKitShell } from "@/components/brand-kit-shell"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata("/icons")

export default function IconsPage() {
  return <BrandKitShell />
}
