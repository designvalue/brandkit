"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { gradients } from "@/lib/colors"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"

const gradientScrollEnter = {
  durationMs: 640,
  direction: "up" as const,
  threshold: 0,
  enterScale: 0.96,
  enterBlurPx: 5,
}

export function Gradients() {
  const [hoveredGradient, setHoveredGradient] = useState<string | null>(null)

  return (
    <section
      id="gradients"
      className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel className="border-b border-border pb-4 text-[9px] leading-[1.2] tracking-[0.1em]">
          COLOR / GRADIENTS
        </SectionLabel>
        <SectionHeading
          title="Gradients"
          description="Approved gradient combinations for dynamic brand expressions across digital and print media."
        />

        <div className="rounded-xl bg-black p-2.5 md:p-3 lg:rounded-2xl">
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-3">
            {gradients.map((grad, index) => {
              const isHovered = hoveredGradient === grad.name
              const stopsDefault = [
                { label: grad.from.label, hex: grad.from.hex },
                { label: grad.to.label, hex: grad.to.hex },
              ] as const
              const stopsReversed = [
                { label: grad.to.label, hex: grad.to.hex },
                { label: grad.from.label, hex: grad.from.hex },
              ] as const

              const labelEase = "cubic-bezier(0.33, 1, 0.68, 1)"
              const labelDuration = "320ms"
              const swatchEase = "cubic-bezier(0.33, 1, 0.68, 1)"
              const swatchDuration = "380ms"

              return (
                <RevealOnScroll
                  key={grad.name}
                  {...gradientScrollEnter}
                  delayMs={index * 80}
                  rootMargin="0px 0px -6% 0px"
                  className="block min-h-0"
                >
                  <div
                    className="overflow-hidden rounded-sm bg-black"
                    onMouseEnter={() => setHoveredGradient(grad.name)}
                    onMouseLeave={() => setHoveredGradient(null)}
                  >
                    {/* Opacity crossfade only (GPU-friendly) — avoid interpolating conic vs linear `background`. */}
                    <div className="relative aspect-square w-full isolate transform-gpu rounded-sm">
                      <div
                        className="absolute inset-0 rounded-sm"
                        style={{
                          background: `conic-gradient(from 0deg at 50% 50%, ${grad.to.hex} 0%, ${grad.from.hex} 100%)`,
                          opacity: isHovered ? 0 : 1,
                          transition: `opacity ${swatchDuration} ${swatchEase}`,
                        }}
                        aria-hidden={isHovered}
                      />
                      <div
                        className="absolute inset-0 rounded-sm"
                        style={{
                          background: `linear-gradient(180deg, ${grad.to.hex} 0%, ${grad.from.hex} 100%)`,
                          opacity: isHovered ? 1 : 0,
                          transition: `opacity ${swatchDuration} ${swatchEase}`,
                        }}
                        aria-hidden={!isHovered}
                      />
                    </div>

                    <div className="relative min-h-[48px] bg-black px-3 py-2.5 font-mono text-[9px] leading-tight tracking-[0.06em] text-white md:min-h-[52px] md:px-3.5">
                      <div
                        className={cn(
                          "space-y-1.5 transition-opacity",
                          isHovered
                            ? "pointer-events-none opacity-0"
                            : "opacity-100",
                        )}
                        style={{
                          transitionDuration: labelDuration,
                          transitionTimingFunction: labelEase,
                        }}
                        aria-hidden={isHovered}
                      >
                        {stopsDefault.map((stop) => (
                          <div
                            key={`${stop.label}-${stop.hex}-a`}
                            className="flex items-center gap-2"
                          >
                            <span
                              className="h-3 w-3 shrink-0 rounded-[3px]"
                              style={{ backgroundColor: stop.hex }}
                            />
                            <span className="uppercase text-white/90">{stop.label}</span>
                            <span className="text-white/60">{stop.hex.toUpperCase()}</span>
                          </div>
                        ))}
                      </div>
                      <div
                        className={cn(
                          "absolute inset-x-3 top-2.5 space-y-1.5 transition-opacity md:inset-x-3.5",
                          isHovered ? "opacity-100" : "pointer-events-none opacity-0",
                        )}
                        style={{
                          transitionDuration: labelDuration,
                          transitionTimingFunction: labelEase,
                        }}
                        aria-hidden={!isHovered}
                      >
                        {stopsReversed.map((stop) => (
                          <div
                            key={`${stop.label}-${stop.hex}-b`}
                            className="flex items-center gap-2"
                          >
                            <span
                              className="h-3 w-3 shrink-0 rounded-[3px]"
                              style={{ backgroundColor: stop.hex }}
                            />
                            <span className="uppercase text-white/90">{stop.label}</span>
                            <span className="text-white/60">{stop.hex.toUpperCase()}</span>
                          </div>
                        ))}
                      </div>
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
