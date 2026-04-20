"use client"

import { usePathname } from "next/navigation"
import { SecondaryPalette } from "@/components/secondary-palette"
import { Gradients } from "@/components/gradients"
import { PrimaryShades } from "@/components/primary-shades"
import { Greyscale } from "@/components/greyscale"
import { ColorSpectrum } from "@/components/color-spectrum"
import { Combinations } from "@/components/combinations"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

/** Deep color system sections — omitted on `/` (home) and on non-color vertical pages. */
export function ExtraPaletteSections() {
  const pathname = usePathname()
  if (
    pathname === "/" ||
    pathname === "/logo" ||
    pathname === "/typography" ||
    pathname === "/icons" ||
    pathname === "/photo"
  )
    return null

  const blocks = [
    { id: "secondary-palette", delay: 0, el: <SecondaryPalette key="secondary-palette" /> },
    { id: "gradients", delay: 48, el: <Gradients key="gradients" /> },
    { id: "primary-shades", delay: 96, el: <PrimaryShades key="primary-shades" /> },
    { id: "greyscale", delay: 144, el: <Greyscale key="greyscale" /> },
    { id: "color-spectrum", delay: 192, el: <ColorSpectrum key="color-spectrum" /> },
    { id: "combinations", delay: 240, el: <Combinations key="combinations" /> },
  ] as const

  return (
    <>
      {blocks.map(({ id, delay, el }) => (
        <RevealOnScroll
          key={id}
          delayMs={delay}
          durationMs={700}
          threshold={0}
          rootMargin="0px 0px -5% 0px"
          className="block w-full"
        >
          {el}
        </RevealOnScroll>
      ))}
    </>
  )
}
