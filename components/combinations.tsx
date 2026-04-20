"use client"

import { useState } from "react"
import { combinations } from "@/lib/colors"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"

const combinationsScrollEnter = {
  durationMs: 640,
  direction: "up" as const,
  threshold: 0,
  enterScale: 0.96,
  enterBlurPx: 5,
}

export function Combinations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="combinations"
      className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel className="border-b border-border pb-4 text-[9px] leading-[1.2] tracking-[0.1em]">
          COLOR / COMBINATIONS
        </SectionLabel>
        <SectionHeading
          title="Combinations"
          description="Our color combos are pre-approved pairings built for contrast and harmony—so backgrounds, text, and accents."
        />

        <div className="rounded-xl bg-black p-2.5 md:p-3 lg:rounded-2xl">
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-3">
            {combinations.map((combo, i) => {
              const isHovered = hoveredIndex === i
              const bgHex = isHovered ? combo.fg.hex : combo.bg.hex
              const fgHex = isHovered ? combo.bg.hex : combo.fg.hex
              const infoRows = isHovered
                ? [
                    { name: combo.fg.name, hex: combo.fg.hex },
                    { name: combo.bg.name, hex: combo.bg.hex },
                  ]
                : [
                    { name: combo.bg.name, hex: combo.bg.hex },
                    { name: combo.fg.name, hex: combo.fg.hex },
                  ]

              return (
                <RevealOnScroll
                  key={i}
                  {...combinationsScrollEnter}
                  delayMs={i * 52}
                  rootMargin="0px 0px -5% 0px"
                  className="min-w-0 block"
                >
                  <div
                    className="overflow-hidden rounded-sm bg-black"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="aspect-square w-full rounded-sm transition-colors duration-200"
                      style={{ backgroundColor: bgHex }}
                    >
                      <div className="flex h-full items-center justify-center">
                        <span
                          className="font-semibold leading-none text-[84px] md:text-[96px]"
                          style={{ color: fgHex }}
                        >
                          Aa
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 bg-black px-3 py-2.5 font-mono text-[9px] leading-tight tracking-[0.06em] text-white md:px-3.5">
                      {infoRows.map((row) => (
                        <div key={row.hex} className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 shrink-0 rounded-[3px]"
                            style={{ backgroundColor: row.hex }}
                          />
                          <span className="uppercase text-white/90">{row.name}</span>
                          <span className="text-white/60">{row.hex.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
