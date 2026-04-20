"use client"

import { useCallback } from "react"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import type { ColorSwatch } from "@/lib/colors"
import { secondaryColors } from "@/lib/colors"
import { copySwatchToClipboard } from "@/lib/color-format"
import { getSwatchContrastColor } from "@/components/color-swatch-card"
import { SwatchColorSpecs } from "@/components/swatch-color-specs"

/** Landscape swatch: name (top), code (center-left), HEX / RGB / CMYK (bottom). */
function SecondarySwatch({
  swatch,
  className,
}: {
  swatch: ColorSwatch
  className?: string
}) {
  const fg = getSwatchContrastColor(swatch.hex)
  const title = swatch.name.toUpperCase()

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
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
        "group relative grid w-full min-h-0 cursor-pointer grid-rows-[auto_1fr_auto] overflow-hidden rounded-2xl p-4 text-left transition-[transform,box-shadow] md:rounded-[20px] md:p-5",
        /* Below md: short landscape. md+: stretch to primary bento row height (teal/orange). */
        "aspect-[3/2] w-full md:aspect-auto md:h-full",
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
        className="max-w-[90%] font-mono text-[9px] font-medium uppercase leading-snug tracking-[0.12em] sm:text-[10px] md:text-[11px]"
        style={{ color: fg }}
      >
        {title}
      </p>

      <div className="flex min-h-0 h-full items-center">
        <p
          className="font-mono text-[9px] tracking-[-0.02em] sm:text-[10px] md:text-[11px]"
          style={{ color: fg }}
        >
          {swatch.code}
        </p>
      </div>

      <SwatchColorSpecs hex={swatch.hex} size="default" style={{ color: fg }} />
    </button>
  )
}

const swatchScrollEnter = {
  durationMs: 640,
  direction: "up" as const,
  threshold: 0,
  enterScale: 0.96,
  enterBlurPx: 5,
}

export function SecondaryPaletteShowcase() {
  return (
    <div className="rounded-[22px] bg-black p-2.5 md:p-3 lg:rounded-3xl">
      <div className="grid min-h-0 grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-3 md:min-h-[min(52vw,520px)] lg:min-h-[min(48vw,580px)] lg:gap-3">
        {secondaryColors.map((swatch, index) => (
          <RevealOnScroll
            key={swatch.code}
            {...swatchScrollEnter}
            delayMs={index * 80}
            rootMargin="0px 0px -6% 0px"
            className="block min-h-0"
          >
            <SecondarySwatch swatch={swatch} className="h-full min-h-0" />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
