"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis smooth scrolling for wheel / trackpad / touch (see https://github.com/darkroomengineering/lenis).
 * Skipped when the user prefers reduced motion — native scrolling stays in control.
 */
export function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      allowNestedScroll: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: true,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.resize()
  }, [pathname])

  return null
}
