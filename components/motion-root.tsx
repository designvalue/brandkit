"use client"

import { MotionConfig } from "motion/react"

/**
 * Global Motion settings — `reducedMotion="user"` respects the OS
 * “reduce motion” preference (see https://motion.dev/docs/react-installation).
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
