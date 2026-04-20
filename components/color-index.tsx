"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  colorIndexItems,
  iconIndexItems,
  logoIndexItems,
  megaMenuSections,
  photoIndexItems,
  typeIndexItems,
} from "@/lib/colors"
import { useBrandKitRoute } from "@/hooks/use-brand-kit-route"
import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"
import { ColorIndexHomeMegaMenu } from "@/components/color-index-home-mega-menu"
import { ColorIndexAnchorRow } from "@/components/color-index-anchor-row"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

export function ColorIndex() {
  const {
    pathname,
    isTypographyPage,
    isIconsPage,
    isPhotoPage,
    isLogoOnly,
    isBrandChapter,
    isHome,
    isColorPage,
  } = useBrandKitRoute()
  const router = useRouter()

  const resolveHref = useCallback(
    (href: string) => {
      if (pathname === "/" && href.startsWith("#")) return `/color${href}`
      return href
    },
    [pathname],
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      if (href.startsWith("/")) {
        router.push(href)
        const hashIdx = href.indexOf("#")
        if (hashIdx !== -1) {
          const hash = href.slice(hashIdx)
          const scrollTo = () => {
            const el = document.querySelector(hash)
            if (el) {
              el.scrollIntoView({ behavior: "smooth" })
              window.history.replaceState(null, "", href)
            }
          }
          window.setTimeout(scrollTo, 120)
          window.setTimeout(scrollTo, 400)
        }
        return
      }
      if (href.startsWith("#")) {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
          window.history.pushState(null, "", href)
        }
      }
    },
    [router],
  )

  const items = isTypographyPage
    ? typeIndexItems
    : isIconsPage
      ? iconIndexItems
      : isPhotoPage
        ? photoIndexItems
        : isLogoOnly
          ? logoIndexItems
          : colorIndexItems

  const label = isTypographyPage
    ? "TYPE / INDEX"
    : isIconsPage
      ? "ICON / INDEX"
      : isPhotoPage
        ? "PHOTO / INDEX"
        : isLogoOnly
          ? "LOGO / INDEX"
          : "COLOR // INDEX"

  const title = isTypographyPage
    ? "Type Index"
    : isIconsPage
      ? "Icon Index"
      : isPhotoPage
        ? "Photo Index"
        : isLogoOnly
          ? "Logo Index"
          : "Color Index"

  const count = items.length
  const megaMenuEntryCount = megaMenuSections.reduce(
    (sum, group) => sum + group.items.length,
    0,
  )

  /** Primary blue block is home (`/`) only — `/color` matches Logo Index styling. */
  const colorIndexOnPrimary = !isBrandChapter && !isColorPage

  return (
    <section
      id="color-index"
      className={cn(
        "scroll-mt-20 px-6 md:px-10",
        isHome
          ? "pt-14 pb-20 md:pt-20 md:pb-28"
          : "py-20 md:py-28",
        colorIndexOnPrimary && "bg-primary text-primary-foreground",
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <RevealOnScroll
          durationMs={640}
          rootMargin="0px 0px -4% 0px"
          threshold={0.08}
        >
          {!isHome && (
            <SectionLabel
              tone={colorIndexOnPrimary ? "onPrimary" : "default"}
              className={
                isBrandChapter || isColorPage
                  ? "pb-4 text-[9px] leading-[1.2] tracking-[0.1em]"
                  : undefined
              }
            >
              {label}
            </SectionLabel>
          )}
          {isHome ? (
            <div className="mb-16 flex items-end justify-between gap-6 md:mb-20">
              <h2
                className="text-4xl font-medium tracking-tight text-primary-foreground md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Index
              </h2>
              <span className="text-2xl font-normal text-primary-foreground/70 md:text-3xl">
                ({megaMenuEntryCount})
              </span>
            </div>
          ) : (
            <SectionHeading
              title={title}
              count={count}
              tone={colorIndexOnPrimary ? "onPrimary" : "default"}
            />
          )}
        </RevealOnScroll>

        <div
          className={cn(
            isHome ? "mt-0" : "mt-10",
            !isHome &&
              (isBrandChapter || isColorPage) &&
              "[&>a:last-child]:border-b-0",
          )}
        >
          {isHome ? (
            <ColorIndexHomeMegaMenu
              sections={megaMenuSections}
              onNavigate={handleClick}
            />
          ) : (
            items.map((item, i) => {
              const href = resolveHref(item.href)

              return (
                <RevealOnScroll
                  key={item.num}
                  delayMs={i * 26}
                  durationMs={620}
                  threshold={0}
                  rootMargin="0px 0px -2% 0px"
                  className="block w-full"
                >
                  <ColorIndexAnchorRow
                    href={href}
                    num={item.num}
                    name={item.name}
                    colorIndexOnPrimary={colorIndexOnPrimary}
                    onNavigate={handleClick}
                  />
                </RevealOnScroll>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
