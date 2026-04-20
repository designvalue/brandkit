import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SectionIndex } from "@/components/section-index"
import { ColorIndex } from "@/components/color-index"
import { PrimaryPalette } from "@/components/primary-palette"
import { ExtraPaletteSections } from "@/components/extra-palette-sections"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"

/** Full BrandKit landing sections — shared by `/`, `/color`, `/logo`, `/photo`, `/typography`, and `/icons`. */
export function BrandKitPageBody() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <SectionIndex />
      <ColorIndex />
      <PrimaryPalette />
      <ExtraPaletteSections />
      <Footer />
    </>
  )
}
