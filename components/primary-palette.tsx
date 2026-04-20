"use client"

import Image from "next/image"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react"
import { useReducedMotion } from "motion/react"
import { usePathname } from "next/navigation"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BatteryHigh,
  Bell,
  Bluetooth,
  Calendar,
  Camera,
  ChatCenteredText,
  Check,
  Cloud,
  Compass,
  DotsThree,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Folder,
  Funnel,
  Gear,
  GlobeHemisphereWest,
  GridFour,
  Heart,
  House,
  Info,
  Lock,
  MagnifyingGlass,
  MapPin,
  Moon,
  Pause,
  Phone,
  Play,
  Question,
  ShoppingBag,
  ShoppingCart,
  Star,
  Sun,
  Trash,
  WifiHigh,
  X,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { PaletteCardMotionDiv } from "@/components/palette-card-motion-div"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { SectionLabel } from "./section-label"
import { SectionHeading } from "./section-heading"
import {
  PrimaryPaletteShowcase,
  ViewfinderHud,
  ViewfinderPaletteHero,
} from "./primary-palette-showcase"

const primaryPaletteDescription =
  "Our primary color palette forms the foundation of our visual identity. These colors should be used prominently across all brand materials."

const logoMarkDescription =
  "The logo is constructed from a simple geometric grid, with consistent angles & curves that mirror our design system."

const photoPrinciplesDescription =
  "We chase atmosphere over perfection: rich shadows, selective light, textured environments, and moments that carry quiet tension or emotion."

const photoPortraitsDescription =
  "Capture presence over polish\u2014natural expressions, intimate distance, and light that sculpts the face."

const photoMotionDescription =
  "Use blur and movement intentionally to add energy, atmosphere, and a sense of time passing."

const photoTexturesDescription =
  "Seek surfaces that feel tactile\u2014grain, fabric, skin, rain, dust\u2014details that make the scene feel real."

const logoConstructionDescription =
  "Clear spacing is built into the form, so the logo reads cleanly without relying on extra outlines or effects."

const logoSpacingPlacementDescription =
  "Every element resolves to the same set of measurements, so the logo stays precise across print and digital."

const logoColorsDescription =
  "The logo should appear in Primary White whenever possible for maximum contrast and clarity."

const typefaceDescription =
  "Uncut Sans is yet another slightly quirky sans serif, designed with absolutely no investigation or research into any other typefaces from any specific time period."

const typeScaleDescription =
  "Our typographic scale creates consistent hierarchy across every surface—product UI, marketing pages, docs, and decks."

const typeUseDescription =
  "Our type lockups are pre-built combinations of headline, subhead, and supporting text for consistent hierarchy."

const iconLibraryDescription =
  "Our primary icon set is built on a 1.5px stroke for a crisp, modern feel across UI and marketing. Icons are designed on a consistent grid with standardized radii."

const typeScaleSizes = [
  "clamp(2.7rem, 8vw, 96px)",
  "clamp(2.45rem, 7.2vw, 86px)",
  "clamp(2.2rem, 6.5vw, 76px)",
  "clamp(1.95rem, 5.9vw, 67px)",
  "clamp(1.75rem, 5.2vw, 58px)",
  "clamp(1.55rem, 4.6vw, 50px)",
  "clamp(1.4rem, 4.1vw, 43px)",
  "clamp(1.25rem, 3.7vw, 37px)",
  "clamp(1.1rem, 3.2vw, 32px)",
  "clamp(1rem, 2.8vw, 28px)",
  "clamp(0.92rem, 2.4vw, 24px)",
  "clamp(0.85rem, 2.1vw, 21px)",
]

const iconLibraryGradient =
  "linear-gradient(180deg, #1912d0 0%, #2a22d9 56%, #d88db8 100%)"

type PhosphorIconComponent = ComponentType<{ size?: number; weight?: "regular" | "bold" | "duotone" | "fill" | "light" | "thin"; className?: string }>

const iconLibraryPhosphorIcons: PhosphorIconComponent[] = [
  House,
  MagnifyingGlass,
  ChatCenteredText,
  Bell,
  Gear,
  Trash,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  EnvelopeSimple,
  Calendar,
  Camera,
  Cloud,
  Lock,
  Eye,
  EyeSlash,
  Folder,
  GlobeHemisphereWest,
  GridFour,
  Compass,
  Check,
  X,
  Heart,
  Star,
  Moon,
  Sun,
  Bluetooth,
  WifiHigh,
  BatteryHigh,
  ShoppingBag,
  ShoppingCart,
  Phone,
  MapPin,
  Funnel,
  Play,
  Pause,
  DotsThree,
  Info,
  Question,
]

const iconLibraryGridIcons = Array.from(
  { length: 120 },
  (_, index) => iconLibraryPhosphorIcons[index % iconLibraryPhosphorIcons.length],
)

const typeUseScheduleRows = [
  {
    left: { city: "Montreal", code: "A192", time: "11.50.00" },
    right: { city: "Tokyo", code: "B432", time: "10.12.00" },
  },
  {
    left: { city: "Toronto", code: "B547", time: "12.12.00" },
    right: { city: "Chicago", code: "Y783", time: "13.45.00" },
  },
  {
    left: { city: "Berlin", code: "S327", time: "19.01.00" },
    right: { city: "Hong Kong", code: "K540", time: "14.30.00" },
  },
  {
    left: { city: "Dublin", code: "L341", time: "20.10.00" },
    right: { city: "Bangkok", code: "U783", time: "17.20.00" },
  },
  {
    left: { city: "Lisbon", code: "A439", time: "22.00.00" },
    right: { city: "Prague", code: "H633", time: "19.23.00" },
  },
  {
    left: { city: "Rome", code: "N948", time: "23.13.00" },
    right: { city: "Hanoi", code: "J786", time: "19.46.00" },
  },
]

const constructionNotesTitle = "Construction Notes"

const constructionNotesBody =
  "The logo is constructed from a simple geometric grid, with consistent angles and curves that mirror our design system."

const photoConstructionNotesTitle = "Light Creates the Story"

const photoConstructionNotesBody =
  "We treat light as the main character. Prefer directional, imperfect light\u2014window light, street lamps, overcast glow, late-afternoon sun."

const photoConstructionNotesTitle2 = "Atmosphere Over Clarity"

const photoConstructionNotesBody2 =
  "Our images should feel textured and lived-in, not sterile. Embrace haze, rain, reflections, grain, motion blur, and environmental mess when it adds mood."

const photoConstructionNotesTitle3 = "Frame With Intention"

const photoConstructionNotesBody3 =
  "Composition should be deliberate and cinematic: strong depth separation, controlled chaos, and negative space that creates calm tension."

const spacingNotesTitle = "Spacing Notes"

const spacingNotesBody =
  "Always give the logo room to breathe—keep a clear space around it equal to 1× the height of the icon on all sides."

const constructionNotesBodyStroke =
  "Stroke weights and corner radii are standardized, ensuring the mark feels balanced."

/** Full-bleed viewfinder stack (texture, grades, HUD) — used by photo portraits surfaces and construction notes. */
function PhotoViewfinderFill({
  className,
  textureSrc = "/brand/palette-viewfinder.png",
  radiusClass = "rounded-2xl",
  sizes = "(max-width: 768px) 100vw, 1400px",
}: {
  className?: string
  textureSrc?: string
  radiusClass?: string
  sizes?: string
}) {
  return (
    <div
      className={cn(
        "group absolute inset-0 overflow-hidden",
        radiusClass,
        className,
      )}
      aria-hidden
    >
      <div className={cn("absolute inset-0 overflow-hidden", radiusClass)}>
        <div
          className="relative h-full min-h-full w-full origin-center scale-[1.12] transform-gpu backface-hidden transition-transform duration-[3200ms] motion-reduce:transition-none [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] motion-reduce:group-hover:scale-[1.12] group-hover:scale-[1.26]"
        >
          <Image
            src={textureSrc}
            alt=""
            fill
            sizes={sizes}
            className="object-cover object-center blur-[1.25px] contrast-[1.06] saturate-[1.08]"
            quality={90}
          />
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-orange-950/15 to-black/60 transition-opacity duration-[3200ms] [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] motion-reduce:transition-none group-hover:opacity-90",
          radiusClass,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-orange-500/[0.22] mix-blend-soft-light",
          radiusClass,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-cyan-400/[0.08] mix-blend-screen",
          radiusClass,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] opacity-[0.28] mix-blend-overlay transition-opacity duration-[3200ms] [transition-timing-function:cubic-bezier(0.2,0.82,0.22,1)] motion-reduce:transition-none motion-reduce:group-hover:opacity-[0.28] group-hover:opacity-[0.22]",
          radiusClass,
        )}
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0 0.5px, transparent 0.5px 3px),
            repeating-radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0 0.5px, transparent 0.5px 2.5px)`,
        }}
        aria-hidden
      />
      <ViewfinderHud className="z-[8]" />
    </div>
  )
}

function ConstructionNotesBand({
  className,
  title = constructionNotesTitle,
  body = constructionNotesBody,
  imageSrc = "/DV_logo.svg",
  imageWidth = 485,
  imageHeight = 160,
  imageClassName,
  showImage = true,
  viewfinderPanel = false,
  viewfinderTextureSrc = "/brand/palette-viewfinder.png",
}: {
  className?: string
  title?: string
  body?: string
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
  imageClassName?: string
  showImage?: boolean
  viewfinderPanel?: boolean
  /** Background photo for the viewfinder stack (typography uses a dedicated asset). */
  viewfinderTextureSrc?: string
}) {
  const reduceCardMotion = useReducedMotion()
  const imageEl =
    showImage ? (
      <img
        src={imageSrc}
        alt=""
        width={imageWidth}
        height={imageHeight}
        decoding="async"
        className={cn(
          "relative z-10 h-auto max-w-full object-contain select-none",
          imageClassName ?? "w-[min(70vw,320px)] md:w-[min(42vw,380px)]",
        )}
        aria-hidden
      />
    ) : null

  return (
    <div
      className={cn(
        "flex flex-col gap-10 md:flex-row md:items-stretch md:gap-0 lg:gap-12",
        className,
      )}
    >
      <div className="flex shrink-0 flex-col gap-3 md:w-[260px] lg:w-[300px]">
        <p className="flex items-baseline whitespace-nowrap text-foreground">
          <span className="text-[15px] font-medium tracking-[-0.005em] md:font-normal">
            {title}
          </span>
        </p>
        <p
          className="whitespace-pre-line font-medium text-muted-foreground md:font-normal lg:font-light"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            letterSpacing: "-0.008em",
            lineHeight: "140%",
          }}
        >
          {body}
        </p>
      </div>
      {viewfinderPanel ? (
        <PaletteCardMotionDiv
          reduceMotion={reduceCardMotion}
          className={cn(
            "relative flex min-h-[min(68vw,440px)] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-lg px-4 py-16 will-change-transform",
            "sm:min-h-[500px] sm:py-20 md:min-h-[min(52vw,600px)] md:rounded-xl md:py-24",
          )}
          aria-hidden={!showImage}
        >
          <PhotoViewfinderFill
            textureSrc={viewfinderTextureSrc}
            radiusClass="rounded-lg md:rounded-xl"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          {imageEl}
        </PaletteCardMotionDiv>
      ) : (
        <PaletteCardMotionDiv
          reduceMotion={reduceCardMotion}
          className={cn(
            "relative flex min-h-[min(68vw,440px)] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#4c1d95] from-[5%] via-[#c026d3] via-[48%] to-[#fb923c] to-[95%] px-4 py-16 will-change-transform",
            "sm:min-h-[500px] sm:py-20 md:min-h-[min(52vw,600px)] md:rounded-xl md:py-24",
          )}
        >
          {imageEl}
        </PaletteCardMotionDiv>
      )}
    </div>
  )
}

type ColorsDualPanelsVariant = "primary" | "secondary"

function ColorsDualPanels({
  className,
  isBelowFold,
  variant = "primary",
  showImages = true,
  tallPanels = false,
  photoViewfinder = false,
  photoViewfinderTextureLeft,
  photoViewfinderTextureRight,
}: {
  className?: string
  isBelowFold?: boolean
  variant?: ColorsDualPanelsVariant
  showImages?: boolean
  tallPanels?: boolean
  /** Photo page portraits / motion / textures dual panels only. */
  photoViewfinder?: boolean
  /** Optional left-panel texture when `photoViewfinder` (Portraits / Motion). */
  photoViewfinderTextureLeft?: string
  /** Optional right-panel texture when `photoViewfinder` (Portraits / Motion). */
  photoViewfinderTextureRight?: string
}) {
  const reduceCardMotion = useReducedMotion()
  const isSecondary = variant === "secondary"

  const panelMinHeights = tallPanels
    ? "min-h-[360px] sm:min-h-[460px] md:min-h-[580px] lg:min-h-[680px] xl:min-h-[760px]"
    : "min-h-[240px] md:min-h-[400px]"

  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5",
        tallPanels
          ? "min-h-[min(80vw,620px)] sm:min-h-[640px] md:min-h-[min(62vw,720px)] lg:min-h-[min(52vw,800px)]"
          : "min-h-[min(64vw,440px)] sm:min-h-[480px] md:min-h-[min(48vw,520px)]",
        className,
      )}
    >
      <PaletteCardMotionDiv
        reduceMotion={reduceCardMotion}
        stagger="none"
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 shadow-sm will-change-transform",
          panelMinHeights,
        )}
      >
        {photoViewfinder ? (
          <PhotoViewfinderFill
            sizes="(max-width: 768px) 100vw, 50vw"
            radiusClass="rounded-2xl"
            textureSrc={
              photoViewfinderTextureLeft ?? "/brand/palette-viewfinder.png"
            }
          />
        ) : (
          <>
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-b",
                isSecondary
                  ? "from-[#BAFAF2] from-[6%] via-[#9B7DFF] via-[52%] to-[#845BFE] to-[100%]"
                  : "from-[#0019ff] from-[5%] via-[#5c6dff] via-[52%] to-[#ebe4ff] to-[100%]",
              )}
              aria-hidden
            />
            {showImages && (
              <img
                src="/DV_logo.svg"
                alt={
                  isSecondary
                    ? "Logo mark on teal and purple gradient"
                    : "Logo mark on blue gradient"
                }
                width={485}
                height={160}
                decoding="async"
                fetchPriority={isBelowFold ? "low" : "high"}
                className="relative z-10 h-auto w-[min(70vw,280px)] max-w-[90%] object-contain select-none md:w-[min(42vw,320px)]"
              />
            )}
          </>
        )}
      </PaletteCardMotionDiv>
      <PaletteCardMotionDiv
        reduceMotion={reduceCardMotion}
        stagger="follow"
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 shadow-sm will-change-transform",
          panelMinHeights,
          !photoViewfinder && (isSecondary ? "bg-[#050505]" : "bg-[#FF8063]"),
        )}
      >
        {photoViewfinder ? (
          <PhotoViewfinderFill
            sizes="(max-width: 768px) 100vw, 50vw"
            radiusClass="rounded-2xl"
            textureSrc={
              photoViewfinderTextureRight ?? "/brand/palette-viewfinder.png"
            }
          />
        ) : (
          showImages && (
            <img
              src="/DV_logo.svg"
              alt={isSecondary ? "Logo mark on black" : "Logo mark on orange"}
              width={485}
              height={160}
              decoding="async"
              fetchPriority="low"
              className="relative z-10 h-auto w-[min(70vw,280px)] max-w-[90%] object-contain select-none md:w-[min(42vw,320px)]"
            />
          )
        )}
      </PaletteCardMotionDiv>
    </div>
  )
}

type LogoPageSection =
  | "mark"
  | "construction"
  | "construction-dup"
  | "construction-dup-2"
  | "spacing-placement"
  | "colors"

function PrimaryPaletteSection({
  sectionId,
  isLogoPage,
  isTypographyPage,
  isIconsPage,
  isPhotoPage,
  logoPageSection,
}: {
  sectionId: string
  isLogoPage: boolean
  isTypographyPage: boolean
  isIconsPage: boolean
  isPhotoPage: boolean
  logoPageSection: LogoPageSection | null
}) {
  const isSpacingPlacement = logoPageSection === "spacing-placement"
  const isColors = logoPageSection === "colors"
  const isConstructionLayout =
    logoPageSection === "construction" ||
    logoPageSection === "construction-dup" ||
    logoPageSection === "construction-dup-2" ||
    isSpacingPlacement
  const isTypographyTypefaceSection =
    isTypographyPage && logoPageSection === "mark"
  const isIconsLibrarySection = isIconsPage && logoPageSection === "mark"
  const isPhotoPrinciplesSection = isPhotoPage && logoPageSection === "mark"
  const isPhotoPortraitsSection =
    isPhotoPage &&
    (logoPageSection === "construction" ||
      logoPageSection === "construction-dup" ||
      logoPageSection === "construction-dup-2")
  const isPhotoMotionSection =
    isPhotoPage && logoPageSection === "construction-dup"
  const isPhotoTexturesSection =
    isPhotoPage && logoPageSection === "construction-dup-2"
  const isTypographyScaleSection =
    isTypographyPage && logoPageSection === "construction"
  const isTypographyUseSection =
    isTypographyPage && logoPageSection === "spacing-placement"
  const defaultTypographyGradient =
    "conic-gradient(at 50% 24%, rgba(0,25,255,0) 14.4deg, rgb(207,176,176) 90deg, rgb(0,25,255) 206.919deg, rgb(0,0,0) 277.2deg)"
  const [typographyGradient, setTypographyGradient] = useState(
    defaultTypographyGradient,
  )
  const [isTypographyPanelHovered, setIsTypographyPanelHovered] = useState(false)
  const hoverPointer = useRef({ x: 0.5, y: 0.2 })
  const hoverRaf = useRef<number | null>(null)
  const reduceHeroMotion = useReducedMotion()

  const applyTypographyGradient = useCallback((nx: number, ny: number, phase = 0) => {
    const cx = (nx * 16 + 42 + Math.sin(phase) * 1.4).toFixed(1)
    const cy = (ny * 12 + 44 + Math.cos(phase * 0.8) * 1).toFixed(1)
    const angle = (nx - 0.5) * 5 + (ny - 0.5) * 2 + Math.sin(phase) * 3
    const s1 = (14.4 + angle).toFixed(1)
    const s2 = (90 + angle).toFixed(1)
    const s3 = (206.919 + angle).toFixed(1)
    const s4 = (277.2 + angle).toFixed(1)

    setTypographyGradient(
      `conic-gradient(at ${cx}% ${cy}%, rgba(0,25,255,0) ${s1}deg, rgb(207,176,176) ${s2}deg, rgb(0,25,255) ${s3}deg, rgb(0,0,0) ${s4}deg)`,
    )
  }, [])

  useEffect(() => {
    if (!isTypographyPage || isConstructionLayout || !isTypographyPanelHovered) {
      if (hoverRaf.current) {
        cancelAnimationFrame(hoverRaf.current)
        hoverRaf.current = null
      }
      return
    }

    const tick = (time: number) => {
      const phase = time / 900
      const { x, y } = hoverPointer.current
      applyTypographyGradient(x, y, phase)
      hoverRaf.current = requestAnimationFrame(tick)
    }

    hoverRaf.current = requestAnimationFrame(tick)
    return () => {
      if (hoverRaf.current) {
        cancelAnimationFrame(hoverRaf.current)
        hoverRaf.current = null
      }
    }
  }, [
    applyTypographyGradient,
    isConstructionLayout,
    isTypographyPage,
    isTypographyPanelHovered,
  ])

  const handleTypographyPanelMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isTypographyPage || isConstructionLayout) return
      const rect = e.currentTarget.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width
      const ny = (e.clientY - rect.top) / rect.height
      hoverPointer.current = { x: nx, y: ny }
      applyTypographyGradient(nx, ny, 0)
    },
    [applyTypographyGradient, isTypographyPage, isConstructionLayout],
  )

  const handleTypographyPanelEnter = useCallback(() => {
    if (!isTypographyPage || isConstructionLayout) return
    setIsTypographyPanelHovered(true)
  }, [isTypographyPage, isConstructionLayout])

  const handleTypographyPanelLeave = useCallback(() => {
    if (!isTypographyPage || isConstructionLayout) return
    setIsTypographyPanelHovered(false)
    setTypographyGradient(defaultTypographyGradient)
  }, [defaultTypographyGradient, isTypographyPage, isConstructionLayout])

  const sectionLabel = !isLogoPage
    ? "COLOR / PRIMARY PALETTE"
    : isTypographyPage && logoPageSection === "mark"
      ? "TYPE / TYPEFACE"
    : isIconsPage && logoPageSection === "mark"
      ? "ICON / LIBRARY"
      : isPhotoPrinciplesSection
        ? "Photo / Principles"
    : isTypographyPage && logoPageSection === "construction"
      ? "TYPE / SCALE"
    : isTypographyPage && logoPageSection === "spacing-placement"
      ? "TYPE / USE"
    : isSpacingPlacement
      ? "LOGO / SPACING & PLACEMENT"
      : isPhotoTexturesSection
        ? "Photo / TEXTURES"
        : isPhotoMotionSection
          ? "Photo / MOTION"
          : isPhotoPortraitsSection
            ? "Photo / Portraits"
            : logoPageSection === "construction"
              ? "LOGO / CONSTRUCTION"
              : isColors
                ? "LOGO / COLORS"
                : "LOGO / MARK"

  const sectionTitle = !isLogoPage
    ? "Primary Palette"
    : isTypographyPage && logoPageSection === "mark"
      ? "Our Typeface"
    : isIconsPage && logoPageSection === "mark"
      ? "Icon Library"
      : isPhotoPrinciplesSection
        ? "Principles"
    : isTypographyPage && logoPageSection === "construction"
      ? "Type Scale"
    : isTypographyPage && logoPageSection === "spacing-placement"
      ? "Type Use"
    : isSpacingPlacement
      ? "Spacing & Placement"
      : isPhotoTexturesSection
        ? "Textures"
        : isPhotoMotionSection
          ? "Motion"
          : isPhotoPortraitsSection
            ? "Portraits"
            : logoPageSection === "construction"
              ? "Construction"
              : isColors
                ? "Colors"
                : "Logo Mark"

  const sectionDescription = !isLogoPage
    ? primaryPaletteDescription
    : isTypographyPage && logoPageSection === "mark"
      ? typefaceDescription
    : isIconsPage && logoPageSection === "mark"
      ? iconLibraryDescription
      : isPhotoPrinciplesSection
        ? photoPrinciplesDescription
    : isTypographyPage && logoPageSection === "construction"
      ? typeScaleDescription
    : isTypographyPage && logoPageSection === "spacing-placement"
      ? typeUseDescription
    : isSpacingPlacement
      ? logoSpacingPlacementDescription
      : isPhotoTexturesSection
        ? photoTexturesDescription
        : isPhotoMotionSection
          ? photoMotionDescription
          : isPhotoPortraitsSection
            ? photoPortraitsDescription
            : logoPageSection === "construction"
              ? logoConstructionDescription
              : isColors
                ? logoColorsDescription
                : logoMarkDescription

  return (
    <section
      id={sectionId}
      className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel className="border-b border-border pb-4 text-[9px] leading-[1.2] tracking-[0.1em]">
          {sectionLabel}
        </SectionLabel>
        <SectionHeading
          title={sectionTitle}
          description={sectionDescription}
        />

        {isLogoPage ? (
          <>
            {isColors ? (
              <>
                <ColorsDualPanels />
                {!isPhotoPage && (
                  <ColorsDualPanels
                    className="mt-6 md:mt-8"
                    isBelowFold
                    variant="secondary"
                  />
                )}
              </>
            ) : (
              <>
              {isPhotoPrinciplesSection ? (
                <PaletteCardMotionDiv
                  reduceMotion={reduceHeroMotion}
                  className="block w-full will-change-transform"
                >
                  <ViewfinderPaletteHero className="w-full" />
                </PaletteCardMotionDiv>
              ) : (
              <PaletteCardMotionDiv
                reduceMotion={reduceHeroMotion}
                className={cn(
                  "relative flex overflow-hidden rounded-2xl shadow-[0_28px_90px_-28px_rgba(0,25,255,0.45)] will-change-transform",
                  isTypographyScaleSection
                    ? "items-start justify-start px-8 py-8 md:px-12 md:py-10"
                    : "min-h-[min(72vw,520px)] items-center justify-center px-8 py-20 sm:min-h-[580px] sm:py-24 md:min-h-[min(56vw,680px)] md:px-12 md:py-28",
                )}
                onMouseEnter={handleTypographyPanelEnter}
                onMouseMove={handleTypographyPanelMove}
                onMouseLeave={handleTypographyPanelLeave}
              >
                {isPhotoPortraitsSection ? (
                  <PhotoViewfinderFill
                    radiusClass="rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 1400px"
                    textureSrc={
                      logoPageSection === "construction"
                        ? "/brand/photo-construction-hero-portrait.png"
                        : logoPageSection === "construction-dup"
                          ? "/brand/photo-construction-2-hero.png"
                          : logoPageSection === "construction-dup-2"
                            ? "/brand/photo-construction-3-hero.png"
                            : "/brand/palette-viewfinder.png"
                    }
                  />
                ) : (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      !isTypographyPage && "logo-mark-gradient-animated",
                    )}
                    style={
                      isTypographyPage
                        ? {
                            background: typographyGradient,
                            transition: "background 180ms ease-out",
                          }
                        : isIconsLibrarySection
                          ? {
                              background: iconLibraryGradient,
                            }
                          : undefined
                    }
                    aria-hidden
                  />
                )}
                {!isTypographyPage &&
                  !isIconsPage &&
                  !isPhotoPrinciplesSection &&
                  !isPhotoPortraitsSection && (
                    <img
                      src={
                        isConstructionLayout
                          ? "/dv_spacing.svg"
                          : "/DV_logo.svg"
                      }
                      alt={
                        isConstructionLayout
                          ? "Logo mark construction and spacing"
                          : "Logo mark"
                      }
                      width={isConstructionLayout ? 869 : 485}
                      height={isConstructionLayout ? 480 : 160}
                      decoding="async"
                      fetchPriority={isConstructionLayout ? "auto" : "high"}
                      className={cn(
                        "relative z-10 h-auto max-w-full object-contain select-none",
                        isConstructionLayout
                          ? "w-[min(92vw,720px)]"
                          : "w-[min(88vw,560px)]",
                      )}
                    />
                  )}
                {isTypographyTypefaceSection && (
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-between text-center">
                    <p
                      className="pt-3 text-foreground md:pt-4"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.9rem, 11.5vw, 150px)",
                        fontWeight: 600,
                        letterSpacing: "-0.052em",
                        lineHeight: "86%",
                      }}
                    >
                      Uncut
                      <br />
                      Sans&reg;
                    </p>

                    <div
                      className="mt-14 pb-3 text-left md:pb-4"
                      style={{
                        color: "#56E9E6",
                        textShadow: "0 0 18px rgba(86, 233, 230, 0.12)",
                      }}
                    >
                      <p
                        className="font-medium opacity-80"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(0.95rem, 2.2vw, 36px)",
                          letterSpacing: "-0.02em",
                          lineHeight: "1.02",
                        }}
                      >
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      </p>
                      <p
                        className="mt-1 font-medium opacity-90"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(0.95rem, 2.2vw, 36px)",
                          letterSpacing: "-0.02em",
                          lineHeight: "1.02",
                        }}
                      >
                        abcdefghijklmnopqrstuvwxyz
                      </p>
                      <p
                        className="mt-1 font-medium"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(0.95rem, 2.2vw, 36px)",
                          letterSpacing: "-0.02em",
                          lineHeight: "1.02",
                        }}
                      >
                        1234567890!@#$”%^&*,;/{}[]()?!
                      </p>
                    </div>
              </div>
            )}
                {isIconsLibrarySection && (
                  <div className="relative z-10 w-full">
                    <div className="grid grid-cols-8 gap-2.5 sm:grid-cols-10 md:grid-cols-12 md:gap-3">
                      {iconLibraryGridIcons.map((IconComponent, index) => (
                        <a
                          key={`icons-grid-${index}`}
                          href="https://phosphoricons.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Phosphor Icons (new tab)"
                          className="group flex aspect-square items-center justify-center rounded-[8px] border border-white/30 bg-white/5 transition-colors duration-150 hover:border-white hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <IconComponent
                            weight="regular"
                            className="size-[14px] shrink-0 text-[#f5f1e6] transition-colors duration-150 group-hover:text-zinc-900 min-[400px]:size-4 sm:size-[18px] md:size-5 lg:size-6 xl:size-7 2xl:size-8"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {isTypographyScaleSection && (
                  <div className="relative z-10 w-full">
                    <div className="divide-y divide-white/15 border-t border-white/15">
                      {typeScaleSizes.map((fontSize, index) => (
                        <RevealOnScroll
                          key={`type-scale-${index + 1}`}
                          delayMs={index * 78}
                          durationMs={680}
                          direction="up"
                          threshold={0}
                          rootMargin="0px 0px -6% 0px"
                          className="block"
                          enterScale={0.97}
                          enterBlurPx={5}
                        >
                          <div className="grid grid-cols-[128px_minmax(0,1fr)] items-start gap-4 py-2 md:grid-cols-[160px_minmax(0,1fr)] md:gap-6 md:py-2.5">
                            <div
                              className="text-[10px] leading-tight tracking-[-0.02em] text-white/60 md:text-[11px]"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              <div>
                                <span className="mr-1 inline-block min-w-[34px] text-white/40">
                                  Font:
                                </span>
                                <span className="text-white/80">Uncut Sans</span>
                              </div>
                              <div className="mt-0.5">
                                <span className="mr-1 inline-block min-w-[34px] text-white/40">
                                  Style:
                                </span>
                                <span className="text-white/80">Scale {index + 1}</span>
                              </div>
                            </div>

                            <p
                              className="text-right text-foreground"
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize,
                                fontWeight: 500,
                                letterSpacing: "-0.03em",
                                lineHeight: "0.92",
                              }}
                            >
                              Hell Neue
                            </p>
                          </div>
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                )}
                {isTypographyUseSection && (
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
                    <div
                      className="w-fit text-left text-foreground"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.04em",
                        lineHeight: "0.86",
                      }}
                    >
                      <p style={{ fontSize: "clamp(2.4rem, 9vw, 110px)", fontWeight: 600 }}>
                        Uncut Sans
                      </p>
                      <p style={{ fontSize: "clamp(2.4rem, 9vw, 110px)", fontWeight: 600 }}>
                        540
                      </p>
                    </div>

                    <div
                      className="mt-3 w-fit text-left md:mt-4"
                      style={{
                        color: "#56E9E6",
                        textShadow: "0 0 18px rgba(86, 233, 230, 0.12)",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2rem, 7.4vw, 90px)",
                        fontWeight: 600,
                        letterSpacing: "-0.04em",
                        lineHeight: "0.86",
                      }}
                    >
                      <p>NeueCraft&reg;</p>
                      <p>Updated</p>
                      <p>Design System</p>
                      <p>Brand</p>
                      <p>Standards</p>
                      <p>Manual</p>
                    </div>
                  </div>
                )}
              </PaletteCardMotionDiv>
              )}
              {logoPageSection === "mark" &&
                isPhotoPage &&
                !isTypographyPage &&
                !isIconsPage && (
                  <>
                    <ConstructionNotesBand
                      className="mt-16 md:mt-20"
                      viewfinderPanel
                      viewfinderTextureSrc="/brand/photo-notes-viewfinder-primary.png"
                      title={photoConstructionNotesTitle}
                      body={photoConstructionNotesBody}
                      showImage={false}
                    />
                    <ConstructionNotesBand
                      className="mt-10 md:mt-12"
                      viewfinderPanel
                      viewfinderTextureSrc="/brand/photo-notes-viewfinder-secondary.png"
                      title={photoConstructionNotesTitle2}
                      body={photoConstructionNotesBody2}
                      showImage={false}
                    />
                    <ConstructionNotesBand
                      className="mt-10 md:mt-12"
                      viewfinderPanel
                      viewfinderTextureSrc="/brand/photo-notes-viewfinder.png"
                      title={photoConstructionNotesTitle3}
                      body={photoConstructionNotesBody3}
                      showImage={false}
                    />
                  </>
                )}
                {isPhotoPortraitsSection && (
                  <ColorsDualPanels
                    className="mt-4 md:mt-5"
                    showImages={false}
                    tallPanels
                    photoViewfinder
                    photoViewfinderTextureLeft={
                      logoPageSection === "construction"
                        ? "/brand/photo-construction-dual-left.png"
                        : logoPageSection === "construction-dup"
                          ? "/brand/photo-construction-2-dual-left.png"
                          : logoPageSection === "construction-dup-2"
                            ? "/brand/photo-construction-3-dual-left.png"
                            : undefined
                    }
                    photoViewfinderTextureRight={
                      logoPageSection === "construction"
                        ? "/brand/photo-construction-dual-right.png"
                        : logoPageSection === "construction-dup"
                          ? "/brand/photo-construction-2-dual-right.png"
                          : logoPageSection === "construction-dup-2"
                            ? "/brand/photo-construction-3-dual-right.png"
                            : undefined
                    }
                  />
                )}
              </>
            )}

            {isTypographyUseSection && (
              <div className="mt-20 overflow-hidden rounded-2xl bg-black">
                <div className="divide-y divide-white/15 border-t border-white/15">
                  {typeUseScheduleRows.map((row, rowIndex) => (
                    <RevealOnScroll
                      key={`${row.left.city}-${row.right.city}`}
                      delayMs={rowIndex * 120}
                      durationMs={980}
                      direction="up"
                      threshold={0}
                      rootMargin="0px 0px -5% 0px"
                      className="block"
                      enterScale={0.94}
                      enterBlurPx={6}
                    >
                      <div className="grid grid-cols-2 gap-10 px-4 py-4.5 md:gap-12 md:px-6 md:py-5">
                        {[row.left, row.right].map((entry) => (
                          <div
                            key={`${entry.city}-${entry.code}`}
                            className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6 md:gap-8"
                          >
                            <div className="leading-tight">
                              <p
                                className="text-white"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontSize: "clamp(0.95rem, 1.5vw, 22px)",
                                  letterSpacing: "-0.02em",
                                  lineHeight: "1.05",
                                }}
                              >
                                {entry.city} ↗
                              </p>
                              <p
                                className="mt-0.5 text-white/90"
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontSize: "clamp(0.85rem, 1.25vw, 18px)",
                                  letterSpacing: "-0.02em",
                                  lineHeight: "1.05",
                                }}
                              >
                                {entry.code}
                              </p>
                            </div>
                            <p
                              className="text-right text-white"
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2rem, 4.2vw, 64px)",
                                letterSpacing: "-0.03em",
                                lineHeight: "0.9",
                              }}
                            >
                              {entry.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            )}

            {isTypographyUseSection && (
              <div className="mt-10 space-y-4">
                <RevealOnScroll
                  delayMs={0}
                  durationMs={780}
                  direction="up"
                  threshold={0}
                  rootMargin="0px 0px -6% 0px"
                  className="block"
                  enterScale={0.93}
                  enterBlurPx={8}
                >
                  <div className="min-h-[260px] overflow-hidden rounded-2xl bg-[#2016d8] px-5 py-10 md:min-h-[290px] md:px-8 md:py-12">
                    <p
                      className="text-center text-[#f5f1e6]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(0.78rem, 1vw, 14px)",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.1",
                      }}
                    >
                      Uncut Sans — Our Typeface In Use
                    </p>
                    <p
                      className="mx-auto mt-5 max-w-[92%] text-center text-[#e6eb77] md:mt-7"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.9rem, 5.8vw, 78px)",
                        fontWeight: 600,
                        letterSpacing: "-0.04em",
                        lineHeight: "1.05",
                      }}
                    >
                      Johann Sebastian Bach March 31, 1685
                    </p>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll
                  delayMs={70}
                  durationMs={780}
                  direction="up"
                  threshold={0}
                  rootMargin="0px 0px -6% 0px"
                  className="block"
                  enterScale={0.93}
                  enterBlurPx={8}
                >
                <div className="min-h-[660px] overflow-hidden rounded-2xl bg-white px-5 py-10 md:min-h-[720px] md:px-8 md:py-12">
                  <p
                    className="text-center text-[#050505]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.78rem, 1vw, 14px)",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.1",
                    }}
                  >
                    Uncut Sans — Our Typeface In Use
                  </p>
                  <p
                    className="mx-auto mt-5 max-w-[88%] text-center text-[#050505] md:mt-7"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem, 4.2vw, 58px)",
                      fontWeight: 600,
                      letterSpacing: "-0.038em",
                      lineHeight: "1.08",
                    }}
                  >
                    Typographic Is Our CORE Brand
                    <br />
                    Element — A Cornerstone Of Our Design.
                  </p>

                  <div className="mx-auto mt-8 grid max-w-[96%] grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-12">
                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.3",
                      }}
                    >
                      <p>
                        This brand is built for people who obsess over craft—who
                        believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends;
                        it chases coherence.
                      </p>
                      <p className="mt-5">
                        At its core, the brand is about clarity with
                        atmosphere. The design system is clean and Swiss in
                        spirit—precise spacing, simple geometry, icons that
                        feel engineered—but the photography introduces human
                        tension: shadows, texture, rain on glass, late light,
                        quiet moments that suggest a story just outside the
                        frame. That contrast is intentional. It’s what keeps the
                        brand from feeling sterile. Structure gives it authority;
                        mood gives it soul.
                      </p>
                    </div>
                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.3",
                      }}
                    >
                      <p>
                        The logo is treated like a signature, not a
                        sticker—used sparingly, placed with care, and protected
                        with generous breathing room. Colors are bold but
                        controlled: a primary palette that anchors recognition,
                        shades that build hierarchy, and a broader spectrum
                        reserved for rare accents, never noise. Typography is
                        the voice: direct, modern, readable at speed, and
                        elegant when it needs to be. Even the smallest UI icon
                        carries the same discipline—consistent stroke,
                        consistent rhythm, consistent intent.
                      </p>
                      <p className="mt-5">
                        What this brand ultimately promises is trust through
                        taste. It doesn’t shout for attention; it earns it.
                        Whether it appears on a landing page, a product
                        interface, a poster, or a spec sheet, it should feel
                        like one continuous language—calm, sharp, and
                        cinematic—designed to make everything it touches feel
                        more considered.
                      </p>
                    </div>
                  </div>
                </div>
                </RevealOnScroll>

                <RevealOnScroll
                  delayMs={140}
                  durationMs={780}
                  direction="up"
                  threshold={0}
                  rootMargin="0px 0px -6% 0px"
                  className="block"
                  enterScale={0.93}
                  enterBlurPx={8}
                >
                <div className="min-h-[280px] overflow-hidden rounded-2xl bg-[#050505] px-5 py-10 md:min-h-[320px] md:px-8 md:py-12">
                  <p
                    className="text-center text-white"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.78rem, 1vw, 14px)",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.1",
                    }}
                  >
                    Uncut Sans — Our Typeface In Use
                  </p>
                  <p
                    className="mx-auto mt-7 max-w-[92%] text-center text-white"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.45rem, 3.8vw, 52px)",
                      letterSpacing: "-0.038em",
                      lineHeight: "1.02",
                      fontWeight: 500,
                    }}
                  >
                    It speaks in restraint: confident typography, disciplined
                    grids, a tight color system, and visuals that lean cinematic
                    rather than glossy.
                  </p>
                </div>
                </RevealOnScroll>

                <RevealOnScroll
                  delayMs={210}
                  durationMs={780}
                  direction="up"
                  threshold={0}
                  rootMargin="0px 0px -6% 0px"
                  className="block"
                  enterScale={0.93}
                  enterBlurPx={8}
                >
                <div className="overflow-hidden rounded-2xl bg-white px-5 py-10 md:px-8 md:py-12">
                  <div className="mx-auto grid max-w-[96%] grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.12vw, 16px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends.
                      </p>
                      <p className="mt-5">
                        At its core, the brand is about clarity with atmosphere.
                        The design system is clean and Swiss in spirit—precise
                        spacing, simple geometry, icons that feel engineered—but
                        the photography introduces human tension: shadows,
                        texture, rain on glass, late light, quiet moments that
                        suggest a story just outside the frame.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.12vw, 16px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        That contrast is intentional. It’s what keeps the brand
                        from feeling sterile. Structure gives it authority; mood
                        gives it soul. The logo is treated like a signature, not
                        a sticker—used sparingly, placed with care, and
                        protected with generous breathing room. Colors are bold
                        but controlled: a primary palette that anchors
                        recognition, shades that build hierarchy, and a broader
                        spectrum reserved for rare accents, never noise.
                      </p>
                      <p className="mt-5">
                        Typography is the voice: direct, modern, readable at
                        speed, and elegant when it needs to be. Even the
                        smallest UI icon carries the same discipline—consistent
                        stroke, consistent rhythm, consistent intent. What this
                        brand ultimately promises is trust through taste.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.12vw, 16px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        It doesn’t shout for attention; it earns it. Whether it
                        appears on a landing page, a product interface, a
                        poster, or a spec sheet, it should feel like one
                        continuous language—calm, sharp, and cinematic—designed
                        to make everything it touches feel more considered.
                      </p>
                      <p className="mt-5">
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends.
                      </p>
                    </div>
                  </div>
                </div>
                </RevealOnScroll>

                <RevealOnScroll
                  delayMs={280}
                  durationMs={780}
                  direction="up"
                  threshold={0}
                  rootMargin="0px 0px -6% 0px"
                  className="block"
                  enterScale={0.93}
                  enterBlurPx={8}
                >
                <div className="overflow-hidden rounded-2xl bg-white px-5 py-10 md:px-8 md:py-12">
                  <div className="mx-auto grid max-w-[96%] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends;
                        it chases coherence.
                      </p>
                      <p className="mt-5">
                        At its core, the brand is about clarity with atmosphere.
                        The design system is clean and Swiss in spirit—precise
                        spacing, simple geometry, icons that feel engineered—but
                        the photography introduces human tension: shadows,
                        texture, rain on glass, late light, quiet moments that
                        suggest a story just outside the frame.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        That contrast is intentional. It’s what keeps the brand
                        from feeling sterile. Structure gives it authority; mood
                        gives it soul. The logo is treated like a signature, not
                        a sticker—used sparingly, placed with care, and
                        protected with generous breathing room. Colors are bold
                        but controlled: a primary palette that anchors
                        recognition, shades that build hierarchy, and a broader
                        spectrum for rare accents, never noise.
                      </p>
                      <p className="mt-5">
                        Typography is the voice: direct, modern, readable at
                        speed, and elegant when it needs to be. Even the
                        smallest UI icon carries the same discipline—consistent
                        stroke, consistent rhythm, consistent intent.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        What this brand ultimately promises is trust through
                        taste. It doesn’t shout for attention; it earns it.
                        Whether it appears on a landing page, a product
                        interface, a poster, or a spec sheet, it should feel
                        like one continuous language—calm, sharp, and
                        cinematic—designed to make everything it touches feel
                        more considered.
                      </p>
                      <p className="mt-5">
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.28",
                      }}
                    >
                      <p>
                        At its core, the brand is about clarity with atmosphere.
                        The design system is clean and Swiss in spirit—precise
                        spacing, simple geometry, icons that feel engineered—but
                        the photography introduces human tension: shadows,
                        texture, rain on glass, late light, quiet moments that
                        suggest a story just outside the frame.
                      </p>
                      <p className="mt-5">
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic.
                      </p>
                    </div>
                  </div>
                </div>
                </RevealOnScroll>

                <RevealOnScroll
                  delayMs={350}
                  durationMs={780}
                  direction="up"
                  threshold={0}
                  rootMargin="0px 0px -6% 0px"
                  className="block"
                  enterScale={0.93}
                  enterBlurPx={8}
                >
                <div className="overflow-hidden rounded-2xl bg-white px-5 py-10 md:px-8 md:py-12">
                  <div className="mx-auto grid max-w-[96%] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.3",
                      }}
                    >
                      <p>
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends;
                        it chases coherence.
                      </p>
                      <p className="mt-5">
                        At its core, the brand is about clarity with atmosphere.
                        The design system is clean and Swiss in spirit—precise
                        spacing, simple geometry, icons that feel engineered—but
                        the photography introduces human tension: shadows,
                        texture, rain on glass, late light, quiet moments that
                        suggest a story just outside the frame.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.3",
                      }}
                    >
                      <p>
                        That contrast is intentional. It’s what keeps the brand
                        from feeling sterile. Structure gives it authority; mood
                        gives it soul. The logo is treated like a signature, not
                        a sticker—used sparingly, placed with care, and
                        protected with generous breathing room. Colors are bold
                        but controlled: a primary palette that anchors
                        recognition, shades that build hierarchy, and a broader
                        spectrum for rare accents, never noise.
                      </p>
                      <p className="mt-5">
                        Typography is the voice: direct, modern, readable at
                        speed, and elegant when it needs to be. Even the
                        smallest UI icon carries the same discipline—consistent
                        stroke, consistent rhythm, consistent intent.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.3",
                      }}
                    >
                      <p>
                        What this brand ultimately promises is trust through
                        taste. It doesn’t shout for attention; it earns it.
                        Whether it appears on a landing page, a product
                        interface, a poster, or a spec sheet, it should feel
                        like one continuous language—calm, sharp, and
                        cinematic—designed to make everything it touches feel
                        more considered.
                      </p>
                      <p className="mt-5">
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic
                        rather than glossy. The identity doesn’t chase trends;
                        it chases coherence.
                      </p>
                    </div>

                    <div
                      className="text-[#050505]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.25vw, 18px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.3",
                      }}
                    >
                      <p>
                        At its core, the brand is about clarity with atmosphere.
                        The design system is clean and Swiss in spirit—precise
                        spacing, simple geometry, icons that feel engineered—but
                        the photography introduces human tension: shadows,
                        texture, rain on glass, late light, quiet moments that
                        suggest a story just outside the frame.
                      </p>
                      <p className="mt-5">
                        This brand is built for people who obsess over
                        craft—who believe the difference between “good” and
                        “unmistakable” lives in the details you can’t always
                        explain, but you can always feel. It speaks in
                        restraint: confident typography, disciplined grids, a
                        tight color system, and visuals that lean cinematic.
                      </p>
                    </div>
                  </div>
                </div>
                </RevealOnScroll>
              </div>
            )}

            {isConstructionLayout && !isTypographyPage && (
              <>
                {isSpacingPlacement && (
                  <ConstructionNotesBand
                    className="mt-16 md:mt-20"
                    title={spacingNotesTitle}
                    body={spacingNotesBody}
                    imageSrc="/dv_spacing.svg"
                    imageWidth={869}
                    imageHeight={480}
                    imageClassName="w-[min(92vw,720px)]"
                  />
                )}
                {logoPageSection === "construction" && !isPhotoPage && (
                  <>
                    <ConstructionNotesBand
                      className="mt-16 md:mt-20"
                      title={constructionNotesTitle}
                      body={constructionNotesBody}
                    />
                    <ConstructionNotesBand
                      className="mt-10 md:mt-12"
                      body={constructionNotesBodyStroke}
                      imageSrc="/dv_monogram_construction.svg"
                      imageWidth={797}
                      imageHeight={799}
                      imageClassName="w-[min(62vw,260px)] md:w-[min(34vw,300px)]"
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <PrimaryPaletteShowcase />
        )}
      </div>
    </section>
  )
}

export function PrimaryPalette() {
  const pathname = usePathname()
  if (pathname === "/") {
    return null
  }
  const isTypographyPage = pathname === "/typography"
  const isIconsPage = pathname === "/icons"
  const isPhotoPage = pathname === "/photo"
  const isLogoPage =
    pathname === "/logo" || isTypographyPage || isIconsPage || isPhotoPage

  const reveal = (id: string, delayMs: number, node: ReactNode) => (
    <RevealOnScroll
      key={id}
      delayMs={delayMs}
      durationMs={700}
      threshold={0}
      rootMargin="0px 0px -5% 0px"
      className="block w-full"
    >
      {node}
    </RevealOnScroll>
  )

  if (!isLogoPage) {
    return reveal(
      "primary-palette-only",
      0,
      <PrimaryPaletteSection
        sectionId="primary-palette"
        isLogoPage={false}
        isTypographyPage={false}
        isIconsPage={false}
        isPhotoPage={false}
        logoPageSection={null}
      />,
    )
  }

  let stagger = 0
  const nextDelay = () => {
    const d = stagger
    stagger += 48
    return d
  }

  return (
    <>
      {reveal(
        "logo-mark",
        nextDelay(),
        <PrimaryPaletteSection
          sectionId="primary-palette"
          isLogoPage
          isTypographyPage={isTypographyPage}
          isIconsPage={isIconsPage}
          isPhotoPage={isPhotoPage}
          logoPageSection="mark"
        />,
      )}
      {!isIconsPage &&
        reveal(
          "logo-construction",
          nextDelay(),
          <PrimaryPaletteSection
            sectionId="construction"
            isLogoPage
            isTypographyPage={isTypographyPage}
            isIconsPage={isIconsPage}
            isPhotoPage={isPhotoPage}
            logoPageSection="construction"
          />,
        )}
      {!isIconsPage &&
        isPhotoPage &&
        reveal(
          "photo-construction-2",
          nextDelay(),
          <PrimaryPaletteSection
            sectionId="construction-2"
            isLogoPage
            isTypographyPage={isTypographyPage}
            isIconsPage={isIconsPage}
            isPhotoPage={isPhotoPage}
            logoPageSection="construction-dup"
          />,
        )}
      {!isIconsPage &&
        isPhotoPage &&
        reveal(
          "photo-construction-3",
          nextDelay(),
          <PrimaryPaletteSection
            sectionId="construction-3"
            isLogoPage
            isTypographyPage={isTypographyPage}
            isIconsPage={isIconsPage}
            isPhotoPage={isPhotoPage}
            logoPageSection="construction-dup-2"
          />,
        )}
      {!isIconsPage &&
        !isPhotoPage &&
        reveal(
          "logo-spacing",
          nextDelay(),
          <PrimaryPaletteSection
            sectionId="construction-copy"
            isLogoPage
            isTypographyPage={isTypographyPage}
            isIconsPage={isIconsPage}
            isPhotoPage={isPhotoPage}
            logoPageSection="spacing-placement"
          />,
        )}
      {!isTypographyPage &&
        !isIconsPage &&
        !isPhotoPage &&
        reveal(
          "logo-colors",
          nextDelay(),
          <PrimaryPaletteSection
            sectionId="primary-palette-2"
            isLogoPage
            isTypographyPage={isTypographyPage}
            isIconsPage={isIconsPage}
            isPhotoPage={isPhotoPage}
            logoPageSection="colors"
          />,
        )}
    </>
  )
}
