"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { getBrandKitRoute, type BrandKitRoute } from "@/lib/brand-kit-route"

export function useBrandKitRoute(): BrandKitRoute {
  const pathname = usePathname()
  return useMemo(() => getBrandKitRoute(pathname), [pathname])
}
