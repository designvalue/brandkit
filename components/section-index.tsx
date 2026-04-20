"use client"

import { useBrandKitRoute } from "@/hooks/use-brand-kit-route"
import { SectionIndexMeta } from "@/components/section-index-meta"
import { SectionIndexOverview } from "@/components/section-index-overview"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

const homeOverviewBody =
  "BrandKit is where your brand comes together—clear, consistent, and ready to scale. It brings everything into one place, so teams can move faster without losing direction. Open source at its core and built with React and Next.js, it’s designed to be flexible, transparent, and easy to evolve. Subtle motion and thoughtful interactions make the experience feel seamless, not complex. Simple to use, yet powerful enough to grow with your brand."

const logoOverviewBody =
  "Our logo is the quickest expression of who we are\u2014a single mark that holds our identity, trust, and intent. It should appear clear and consistent across every touchpoint, from small icons to large-scale displays. This section defines how to use it with precision, and how to avoid misuse, so the brand always feels strong, unified, and unmistakable."

const colorOverviewBody =
  "Color is one of the quickest signals of our brand, shaping perception before words do. Our palette is built to feel confident and modern\u2014bold enough to stand out, balanced enough to last. This section defines our core colors, supporting tones, and how to use them, so every touchpoint feels cohesive, clear, and unmistakably ours."

const typographyOverviewBody =
  "It shapes how we\u2019re perceived before a single word is understood\u2014setting tone, clarity, and trust. Our type system is designed for balance and expression, with clear hierarchy, generous spacing, and a rhythm that works across product, marketing, and content. This section defines our fonts and usage, so every line feels consistent, considered, and unmistakably ours."

const iconsOverviewBody =
  "It brings clarity and meaning in an instant\u2014small symbols that communicate without words. Our icons are built with precision and consistency, using simple forms, confident geometry, and a distinct character that\u2019s easy to recognize. This section defines how icons are crafted and used, so every touchpoint feels clear, cohesive, and unmistakably ours."

const photoOverviewBody =
  "It brings emotion, depth, and authenticity\u2014showing who we are beyond words. Our visual style is intentional and grounded, shaped by natural light, honest moments, and calm, confident compositions. This section defines the principles behind our imagery, so whether it\u2019s people, products, or places, everything feels connected and unmistakably ours."

const homeTagline = "A complete brand system."

const logoTagline = "The logo is our most recognizable asset."

const colorTagline =
  "Color, clarity, and contrast\u2014\ndistinct in every expression."

const typographyTagline = "Typography is the voice of the brand."
const iconsTagline = "Iconography is the brand’s visual shorthand."

const photoTagline = "Photography is where the brand feels human."

export function SectionIndex() {
  const {
    isTypographyPage,
    isIconsPage,
    isPhotoPage,
    isColorPage,
    isLogoOnly,
  } = useBrandKitRoute()

  const overviewBody = isPhotoPage
    ? photoOverviewBody
    : isIconsPage
      ? iconsOverviewBody
      : isTypographyPage
        ? typographyOverviewBody
        : isLogoOnly
          ? logoOverviewBody
          : isColorPage
            ? colorOverviewBody
            : homeOverviewBody

  const overviewLabel = isPhotoPage
    ? "PHOTO"
    : isTypographyPage
      ? "Typography"
      : isIconsPage
        ? "Icons"
        : isLogoOnly
          ? "Logo"
          : isColorPage
            ? "Color"
            : "Overview"

  const tagline = isPhotoPage
    ? photoTagline
    : isTypographyPage
      ? typographyTagline
      : isIconsPage
        ? iconsTagline
        : isLogoOnly
          ? logoTagline
          : isColorPage
            ? colorTagline
            : homeTagline

  return (
    <section
      className="relative px-6 md:px-10 py-16 md:py-24 bg-background"
      style={{ zIndex: 30 }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-10 md:gap-0">
        <RevealOnScroll
          delayMs={0}
          durationMs={720}
          threshold={0}
          rootMargin="0px 0px -4% 0px"
        >
          <SectionIndexMeta overviewLabel={overviewLabel} tagline={tagline} />
        </RevealOnScroll>
        <div className="min-w-0 flex-1">
          <SectionIndexOverview body={overviewBody} />
        </div>
      </div>
    </section>
  )
}
