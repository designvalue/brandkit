"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { primaryShades } from "@/lib/colors"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"

const shadeScrollEnter = {
  durationMs: 640,
  direction: "up" as const,
  threshold: 0,
  enterScale: 0.96,
  enterBlurPx: 5,
}

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#050505" : "#F5F1E6"
}

function getRgbValues(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

function getRgbLabel(hex: string): string {
  const { r, g, b } = getRgbValues(hex)
  return `${r}, ${g}, ${b}`
}

function getCmykLabel(hex: string): string {
  const { r, g, b } = getRgbValues(hex)
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const key = 1 - Math.max(red, green, blue)

  if (key === 1) {
    return "0%, 0%, 0%, 100%"
  }

  const cyan = Math.round(((1 - red - key) / (1 - key)) * 100)
  const magenta = Math.round(((1 - green - key) / (1 - key)) * 100)
  const yellow = Math.round(((1 - blue - key) / (1 - key)) * 100)
  const black = Math.round(key * 100)

  return `${cyan}%, ${magenta}%, ${yellow}%, ${black}%`
}

export function PrimaryShades() {
  const hero = primaryShades[0]
  const shadeRows = primaryShades.slice(1)
  const heroLabel = hero.code.replace("00", "")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyColorValues = async (label: string, hex: string) => {
    const payload = [`${label}`, `HEX: ${hex.toUpperCase()}`, `RGB: ${getRgbLabel(hex)}`, `CMYK: ${getCmykLabel(hex)}`].join("\n")

    try {
      await navigator.clipboard.writeText(payload)
      setCopiedColor(label)
      window.setTimeout(() => {
        setCopiedColor((current) => (current === label ? null : current))
      }, 1300)
    } catch {
      setCopiedColor(null)
    }
  }

  return (
    <section
      id="shades"
      className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel className="border-b border-border pb-4 text-[9px] leading-[1.2] tracking-[0.1em]">
          COLOR / PRIMARY SHADES
        </SectionLabel>
        <SectionHeading
          title="Primary Shades"
          description="Our primary shades are lighter and darker tonal steps of the core colors, used to create hierarchy, depth, and flexibility."
        />

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex min-h-[520px] md:min-h-[620px]">
            <RevealOnScroll
              {...shadeScrollEnter}
              delayMs={0}
              rootMargin="0px 0px -6% 0px"
              className="min-w-0 flex-[2.6] block"
            >
              <button
                type="button"
                className="group relative h-full w-full cursor-pointer px-5 py-4 text-left transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50 active:scale-[0.995] md:px-8 md:py-6"
                style={{ backgroundColor: hero.hex }}
                onClick={() => copyColorValues(hero.code, hero.hex)}
                title="Click to copy HEX, RGB, and CMYK"
              >
              <span
                className="absolute left-5 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.08em] md:left-8 md:top-6"
                style={{ color: getTextColor(hero.hex) }}
              >
                Primary Blue Shades
              </span>

              <div className="absolute inset-y-0 left-5 flex items-center md:left-8">
                <span
                  className="font-mono text-[56px] leading-none sm:text-[72px] md:text-[110px] lg:text-[140px] xl:text-[160px]"
                  style={{ color: getTextColor(hero.hex) }}
                >
                  {heroLabel}
                </span>
              </div>

              <span
                className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.06em] md:left-8"
                style={{ color: getTextColor(hero.hex) }}
              >
                {hero.hex.toUpperCase()}
              </span>

              <span
                className="pointer-events-none absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/15 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ color: getTextColor(hero.hex) }}
                aria-hidden
              >
                <Copy className="h-3.5 w-3.5" strokeWidth={2} />
              </span>

              </button>
            </RevealOnScroll>

            {shadeRows.map((shade, index) => (
              <RevealOnScroll
                key={shade.code}
                {...shadeScrollEnter}
                delayMs={(index + 1) * 52}
                rootMargin="0px 0px -6% 0px"
                className="min-w-0 flex-1 block"
              >
                <button
                  type="button"
                  className="group relative h-full w-full min-w-0 cursor-pointer text-left transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50 active:scale-[0.995]"
                  style={{ backgroundColor: shade.hex }}
                  onClick={() => copyColorValues(shade.code, shade.hex)}
                  title="Click to copy HEX, RGB, and CMYK"
                >
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.06em]"
                  style={{ color: getTextColor(shade.hex) }}
                >
                  {shade.code}
                </span>
                <span
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.06em]"
                  style={{ color: getTextColor(shade.hex) }}
                >
                  {shade.hex.toUpperCase()}
                </span>

                <span
                  className="pointer-events-none absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/15 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ color: getTextColor(shade.hex) }}
                  aria-hidden
                >
                  <Copy className="h-3 w-3" strokeWidth={2} />
                </span>

                </button>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
