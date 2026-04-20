"use client"

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type ComponentPropsWithoutRef,
} from "motion/react"
import { useRef, type RefObject } from "react"
import { cn } from "@/lib/utils"

type Stagger = "none" | "follow"

type PaletteCardMotionDivProps = Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  "initial" | "animate" | "whileInView" | "viewport" | "transition"
> & {
  reduceMotion: boolean
  /** Right panel in dual layouts: reveal trails the left card slightly. */
  stagger?: Stagger
}

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

/** Linear 0–1 as `p` moves through [start, end]. */
function segmentLinear(p: number, start: number, end: number) {
  if (end <= start) return 0
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}

/** Very soft ease — slow ramp into full scale while staying scroll-linked. */
function easeScrollReveal(t: number) {
  return smoothstep(smoothstep(smoothstep(t)))
}

/** Slows scale growth vs scroll (exponent > 1: smaller for more of the band). */
function slowScaleProgress(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return Math.pow(x, 1.58)
}

const SCALE_FROM = 0.74

function usePaletteCardScrollStyle(
  reduceMotion: boolean,
  stagger: Stagger,
): {
  ref: RefObject<HTMLDivElement | null>
  scale: MotionValue<number>
  opacity: MotionValue<number>
  y: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0: top of card meets bottom of viewport (entering). 1: card center meets bottom of viewport (100%) → scale 100%.
    offset: ["start end", "center end"],
    trackContentSize: true,
  })

  const mapProgress = (p: number) => {
    if (stagger === "follow") {
      return segmentLinear(p, 0.1, 1)
    }
    return p
  }

  const scale = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 1
    const eased = easeScrollReveal(slowScaleProgress(mapProgress(p)))
    return SCALE_FROM + (1 - SCALE_FROM) * eased
  })

  const opacity = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 1
    const eased = easeScrollReveal(slowScaleProgress(mapProgress(p)))
    return 0.4 + 0.6 * eased
  })

  const y = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 0
    const eased = easeScrollReveal(slowScaleProgress(mapProgress(p)))
    return 56 * (1 - eased)
  })

  return { ref, scale, opacity, y }
}

export function PaletteCardMotionDiv({
  reduceMotion,
  stagger = "none",
  className,
  style,
  children,
  ...rest
}: PaletteCardMotionDivProps) {
  const { ref, scale, opacity, y } = usePaletteCardScrollStyle(
    reduceMotion,
    stagger,
  )

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        transformOrigin: "50% 92%",
        ...style,
        scale,
        opacity,
        y,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
