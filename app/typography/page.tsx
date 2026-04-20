import { BrandKitShell } from "@/components/brand-kit-shell"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata("/typography")

export default function TypographyPage() {
  return <BrandKitShell />
}
