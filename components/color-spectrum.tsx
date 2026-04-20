"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { spectrum } from "@/lib/colors"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"

const spectrumScrollEnter = {
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

export function ColorSpectrum() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  let shadeRevealIndex = 0

  const copyColorValues = async (label: string, hex: string) => {
    const payload = [
      `${label}`,
      `HEX: ${hex.toUpperCase()}`,
      `RGB: ${getRgbLabel(hex)}`,
      `CMYK: ${getCmykLabel(hex)}`,
    ].join("\n")

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
      id="color-spectrum"
      className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel className="border-b border-border pb-4 text-[9px] leading-[1.2] tracking-[0.1em]">
          COLOR / SPECTRUM
        </SectionLabel>
        <SectionHeading
          title="Spectrum"
          description="Our full color spectrum is an extended set of secondary and accent hues used sparingly for charts & highlights."
        />

        <div className="rounded-[22px] bg-black p-2.5 md:p-3 lg:rounded-3xl">
          <div className="flex flex-col gap-3 md:gap-3.5">
            {spectrum.map((family) => (
              <div key={family.name} className="grid grid-cols-2 gap-2.5 sm:grid-cols-5 md:grid-cols-10 md:gap-3">
                {family.shades.map((shade) => {
                  const textColor = getTextColor(shade.hex)
                  const stagger = shadeRevealIndex++
                  return (
                    <RevealOnScroll
                      key={`${family.name}-${shade.label}`}
                      {...spectrumScrollEnter}
                      delayMs={stagger * 36}
                      rootMargin="0px 0px -5% 0px"
                      className="min-w-0 block"
                    >
                      <div className="min-w-0">
                        <button
                          type="button"
                          className="group relative h-[clamp(2.5rem,6vw,3.25rem)] w-full cursor-pointer overflow-hidden rounded-[4px] transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50 active:scale-[0.99]"
                          style={{ backgroundColor: shade.hex }}
                          onClick={() =>
                            copyColorValues(`${family.name} ${shade.label}`, shade.hex)
                          }
                          title="Click to copy HEX, RGB, and CMYK"
                        >
                          <span
                            className="pointer-events-none absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/15 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                            style={{ color: textColor }}
                            aria-hidden
                          >
                            <Copy className="h-2.5 w-2.5" strokeWidth={2} />
                          </span>
                        </button>

                        <div className="mt-1.5 space-y-0.5 px-0.5 font-mono text-[8px] leading-tight md:text-[9px]">
                          <div className="uppercase tracking-[0.08em] text-white/90">
                            {family.name} {shade.label}
                          </div>
                          <div className="tracking-[0.05em] text-white/70">
                            {shade.hex.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {copiedColor ? `${copiedColor} copied with HEX, RGB, and CMYK values.` : ""}
        </p>
      </div>
    </section>
  )
}
