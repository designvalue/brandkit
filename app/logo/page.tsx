import { BrandKitShell } from "@/components/brand-kit-shell"
import { getRouteMetadata } from "@/lib/seo"

export const metadata = getRouteMetadata("/logo")

export default function LogoPage() {
  return <BrandKitShell />
}
