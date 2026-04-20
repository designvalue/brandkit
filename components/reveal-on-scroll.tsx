"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef, type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

type RevealDirection = "up" | "down" | "left" | "right" | "none"

type RevealOnScrollProps = {
  children: React.ReactNode
  className?: string
  /** Extra delay after element intersects (staggered lists). */
  delayMs?: number
  durationMs?: number
  direction?: RevealDirection
  rootMargin?: string
  threshold?: number
  once?: boolean
  /** Start slightly smaller (e.g. 0.94); animates to 1. Omit or use ≥1 to disable. */
  enterScale?: number
  /** Start blurred (px); animates to sharp. 0 or omit to disable. */
  enterBlurPx?: number
} & Omit<ComponentPropsWithoutRef<typeof motion.div>, "children" | "initial" | "animate">

const yNudge = 22
const xNudge = 18

function initialFromDirection(direction: RevealDirection) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: yNudge }
    case "down":
      return { opacity: 0, y: -yNudge }
    case "left":
      return { opacity: 0, x: xNudge }
    case "right":
      return { opacity: 0, x: -xNudge }
    case "none":
      return { opacity: 0 }
  }
}

const easeReveal = [0.22, 1, 0.36, 1] as const

function mergeEnter(
  base: ReturnType<typeof initialFromDirection>,
  enterScale: number | undefined,
  enterBlurPx: number | undefined,
): Record<string, string | number> {
  const out: Record<string, string | number> = { ...base }
  if (enterScale != null && enterScale > 0 && enterScale < 1) {
    out.scale = enterScale
  }
  if (enterBlurPx != null && enterBlurPx > 0) {
    out.filter = `blur(${enterBlurPx}px)`
  }
  return out
}

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  durationMs = 700,
  direction = "up",
  rootMargin = "0px 0px -8% 0px",
  threshold = 0,
  once = true,
  enterScale,
  enterBlurPx,
  style,
  ...rest
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const isInView = useInView(ref, {
    once,
    margin: rootMargin,
    amount: threshold <= 0 ? "some" : threshold,
  })

  const visible = reduce || isInView
  const baseHidden = initialFromDirection(direction)
  const hasEnter =
    !reduce &&
    ((enterScale != null && enterScale > 0 && enterScale < 1) ||
      (enterBlurPx != null && enterBlurPx > 0))
  const hidden = hasEnter
    ? mergeEnter(baseHidden, enterScale, enterBlurPx)
    : baseHidden

  const visibleMotion = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(enterScale != null && enterScale > 0 && enterScale < 1 ? { scale: 1 } : {}),
    ...(enterBlurPx != null && enterBlurPx > 0 ? { filter: "blur(0px)" } : {}),
    transition: {
      duration: durationMs / 1000,
      delay: delayMs / 1000,
      ease: easeReveal,
    },
  }

  const motionStyle = {
    ...style,
    ...(enterScale != null && enterScale > 0 && enterScale < 1
      ? { transformOrigin: "50% 88%" as const }
      : {}),
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        hasEnter && "will-change-[transform,opacity,filter]",
        className,
      )}
      style={motionStyle}
      initial={reduce ? false : hidden}
      animate={
        visible
          ? visibleMotion
          : once
            ? hidden
            : {
                ...hidden,
                transition: {
                  duration: (durationMs * 0.35) / 1000,
                  ease: easeReveal,
                },
              }
      }
      {...rest}
    >
      {children}
    </motion.div>
  )
}
