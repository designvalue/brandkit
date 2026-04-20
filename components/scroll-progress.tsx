"use client"

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

/** Thin top-of-viewport progress from scroll depth (0–1 of document). */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, {
    stiffness: reduce ? 500 : 140,
    damping: reduce ? 100 : 28,
    mass: 0.12,
  })
  const opacity = useTransform(scrollYProgress, [0, 0.02, 1], [0.35, 1, 1])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-transparent"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-primary/85 shadow-[0_0_12px_rgba(21,10,213,0.35)] dark:shadow-[0_0_14px_rgba(21,10,213,0.45)]"
        style={{
          scaleX: reduce ? scrollYProgress : smooth,
          opacity: reduce ? 1 : opacity,
        }}
      />
    </div>
  )
}
