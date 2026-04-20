import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"
import { SecondaryPaletteShowcase } from "./secondary-palette-showcase"

export function SecondaryPalette() {
  return (
    <section
      id="secondary-palette"
      className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel className="border-b border-border pb-4 text-[9px] leading-[1.2] tracking-[0.1em]">
          COLOR / SECONDARY PALETTE
        </SectionLabel>
        <SectionHeading
          title="Secondary Palette"
          description="Supporting colors used sparingly to complement the primary palette. These add vibrancy and variety to our brand expressions."
        />

        <SecondaryPaletteShowcase />
      </div>
    </section>
  )
}
