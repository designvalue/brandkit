"use client"

import Image from "next/image"
import { useCallback } from "react"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import type { ColorSwatch } from "@/lib/colors"
import { primaryColors } from "@/lib/colors"
import { copySwatchToClipboard } from "@/lib/color-format"
import { getSwatchContrastColor } from "@/components/color-swatch-card"
import { SwatchColorSpecs } from "@/components/swatch-color-specs"

function PaletteSwatch({
  swatch,
  className,
  compactSpecs,
}: {
  swatch: ColorSwatch
  className?: string
  compactSpecs?: boolean
}) {
  const fg = getSwatchContrastColor(swatch.hex)
  const title = swatch.name.toUpperCase()

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        await copySwatchToClipboard(swatch)
        toast.success(`Copied ${swatch.name}`, {
          description: "HEX, RGB, and CMYK are on your clipboard.",
        })
      } catch {
        toast.error("Could not copy", { description: "Try again or copy manually." })
      }
    },
    [swatch],
  )

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy HEX, RGB, and CMYK"
      className={cn(
        "group relative grid min-h-0 w-full cursor-pointer grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl p-4 text-left transition-[transform,box-shadow] md:rounded-[20px] md:p-5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50 active:scale-[0.995]",
        className,
      )}
      style={{ backgroundColor: swatch.hex }}
    >
      <span
        className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/15 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 md:right-4 md:top-4"
        style={{ color: fg }}
        aria-hidden
      >
        <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
      </span>

      <p
        className="max-w-[85%] font-mono text-[9px] font-medium uppercase leading-snug tracking-[0.12em] md:text-[10px] md:tracking-[0.14em]"
        style={{ color: fg }}
      >
        {title}
      </p>

      <div className="flex min-h-[2rem] items-center">
        <p
          className="font-mono text-[10px] tracking-[-0.02em] md:text-[11px]"
          style={{ color: fg }}
        >
          {swatch.code}
        </p>
      </div>

      <SwatchColorSpecs
        hex={swatch.hex}
        size={compactSpecs ? "compact" : "default"}
        style={{ color: fg }}
      />
    </button>
  )
}

/** Corner brackets + center reticle; pair with a parent `group` for hover scale. */
export function ViewfinderHud({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 origin-center transform-gpu transition-transform duration-[2800ms] [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[0.94]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-white/90 md:left-8 md:top-8 md:h-11 md:w-11"
        aria-hidden
      />
      <div
        className="absolute right-5 top-5 h-10 w-10 border-r-2 border-t-2 border-white/90 md:right-8 md:top-8 md:h-11 md:w-11"
        aria-hidden
      />
      <div
        className="absolute bottom-5 left-5 h-10 w-10 border-b-2 border-l-2 border-white/90 md:bottom-8 md:left-8 md:h-11 md:w-11"
        aria-hidden
      />
      <div
        className="absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-white/90 md:bottom-8 md:right-8 md:h-11 md:w-11"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div className="relative size-14 md:size-16">
          <div className="absolute left-0 top-0 size-4 border-l border-t border-white/85 md:size-[18px]" />
          <div className="absolute right-0 top-0 size-4 border-r border-t border-white/85 md:size-[18px]" />
          <div className="absolute bottom-0 left-0 size-4 border-b border-l border-white/85 md:size-[18px]" />
          <div className="absolute bottom-0 right-0 size-4 border-b border-r border-white/85 md:size-[18px]" />
          <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-white md:size-2.5" />
        </div>
      </div>
    </div>
  )
}

/** Camera-style frame: corner brackets + center reticle over the palette hero image. */
export function ViewfinderPaletteHero({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "group relative flex min-h-[min(72vw,520px)] overflow-hidden rounded-2xl shadow-[0_28px_90px_-28px_rgba(0,25,255,0.45)] sm:min-h-[580px] md:min-h-[min(56vw,680px)]",
        className,
      )}
      aria-label="Primary palette mood — viewfinder frame"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Scale only this layer (transform-only) — animating blur/filter on the img causes jitter. */}
        <div
          className="relative h-full w-full origin-center scale-[1.12] transform-gpu backface-hidden transition-transform duration-[3200ms] motion-reduce:transition-none [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] motion-reduce:group-hover:scale-[1.12] group-hover:scale-[1.26]"
        >
          <Image
            src="/brand/palette-viewfinder.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover object-center blur-[1.25px] contrast-[1.06] saturate-[1.08]"
            quality={90}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-orange-950/15 to-black/60 transition-opacity duration-[3200ms] [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] group-hover:opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-orange-500/[0.22] mix-blend-soft-light"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-cyan-400/[0.08] mix-blend-screen"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.28] mix-blend-overlay transition-opacity duration-[3200ms] [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] group-hover:opacity-[0.22]"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0 0.5px, transparent 0.5px 3px),
            repeating-radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0 0.5px, transparent 0.5px 2.5px)`,
        }}
        aria-hidden
      />

      <ViewfinderHud />
    </figure>
  )
}

/** Bento grid primary palette — reference layout: blue + black/off-white stack, tall orange & teal. */
export function PrimaryPaletteShowcase() {
  const [deepBlue, black, offWhite, orange, teal] = primaryColors

  const swatchEnter = {
    durationMs: 640,
    direction: "up" as const,
    threshold: 0,
    enterScale: 0.96,
    enterBlurPx: 5,
  }

  return (
    <>
      {/* Mobile: stacked + 2×2 lower band — per-swatch scroll enter */}
      <div className="block w-full md:hidden">
        <div className="flex flex-col gap-2.5">
          <RevealOnScroll
            {...swatchEnter}
            delayMs={0}
            rootMargin="0px 0px -5% 0px"
            className="block w-full"
          >
            <PaletteSwatch swatch={deepBlue} className="min-h-[188px]" />
          </RevealOnScroll>
          <div className="grid grid-cols-2 gap-2.5">
            <RevealOnScroll
              {...swatchEnter}
              delayMs={70}
              rootMargin="0px 0px -5% 0px"
              className="block min-h-0"
            >
              <PaletteSwatch swatch={black} className="min-h-[148px]" compactSpecs />
            </RevealOnScroll>
            <RevealOnScroll
              {...swatchEnter}
              delayMs={125}
              rootMargin="0px 0px -5% 0px"
              className="block min-h-0"
            >
              <PaletteSwatch swatch={offWhite} className="min-h-[148px]" compactSpecs />
            </RevealOnScroll>
          </div>
          <div className="grid min-h-[220px] grid-cols-2 gap-2.5">
            <RevealOnScroll
              {...swatchEnter}
              delayMs={180}
              rootMargin="0px 0px -5% 0px"
              className="block min-h-0"
            >
              <PaletteSwatch swatch={orange} className="min-h-[220px]" />
            </RevealOnScroll>
            <RevealOnScroll
              {...swatchEnter}
              delayMs={235}
              rootMargin="0px 0px -5% 0px"
              className="block min-h-0"
            >
              <PaletteSwatch swatch={teal} className="min-h-[220px]" />
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Desktop: asymmetrical grid on black field — per-swatch scroll enter */}
      <div className="hidden w-full md:block">
        <div className="rounded-[22px] bg-black p-2.5 md:p-3 lg:rounded-3xl">
          <div
            className="grid min-h-[min(52vw,520px)] grid-cols-4 grid-rows-2 gap-2.5 md:gap-3 lg:min-h-[min(48vw,580px)] lg:gap-3"
            style={{
              gridTemplateRows: "minmax(0, 1.15fr) minmax(0, 1fr)",
            }}
          >
            <RevealOnScroll
              {...swatchEnter}
              delayMs={0}
              rootMargin="0px 0px -7% 0px"
              className="col-span-2 col-start-1 row-start-1 block min-h-[min(28vw,240px)] min-h-0"
            >
              <PaletteSwatch swatch={deepBlue} className="h-full min-h-0" />
            </RevealOnScroll>
            <RevealOnScroll
              {...swatchEnter}
              delayMs={75}
              rootMargin="0px 0px -7% 0px"
              className="col-start-3 row-span-2 row-start-1 block h-full min-h-0"
            >
              <PaletteSwatch swatch={orange} className="h-full min-h-0" />
            </RevealOnScroll>
            <RevealOnScroll
              {...swatchEnter}
              delayMs={150}
              rootMargin="0px 0px -7% 0px"
              className="col-start-4 row-span-2 row-start-1 block h-full min-h-0"
            >
              <PaletteSwatch swatch={teal} className="h-full min-h-0" />
            </RevealOnScroll>
            <RevealOnScroll
              {...swatchEnter}
              delayMs={225}
              rootMargin="0px 0px -7% 0px"
              className="col-start-1 row-start-2 block min-h-[min(20vw,168px)] min-h-0"
            >
              <PaletteSwatch swatch={black} className="h-full min-h-0" compactSpecs />
            </RevealOnScroll>
            <RevealOnScroll
              {...swatchEnter}
              delayMs={300}
              rootMargin="0px 0px -7% 0px"
              className="col-start-2 row-start-2 block min-h-[min(20vw,168px)] min-h-0"
            >
              <PaletteSwatch swatch={offWhite} className="h-full min-h-0" compactSpecs />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  )
}
