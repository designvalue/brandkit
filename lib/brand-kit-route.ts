/**
 * Path-derived flags for BrandKit marketing routes.
 * Keeps hero, section intro, and index sections aligned on the same predicates.
 */
export function getBrandKitRoute(pathname: string) {
  const isTypographyPage = pathname === "/typography"
  const isIconsPage = pathname === "/icons"
  const isPhotoPage = pathname === "/photo"
  const isLogoOnly = pathname === "/logo"
  const isColorPage = pathname === "/color"
  const isHome = pathname === "/"
  const isBrandChapter =
    isLogoOnly || isTypographyPage || isIconsPage || isPhotoPage

  return {
    pathname,
    isHome,
    isColorPage,
    isTypographyPage,
    isIconsPage,
    isPhotoPage,
    isLogoOnly,
    isBrandChapter,
    isLogoGradient: isLogoOnly,
    isTypographyGradient: isTypographyPage,
  }
}

export type BrandKitRoute = ReturnType<typeof getBrandKitRoute>
