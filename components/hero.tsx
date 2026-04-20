"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useBrandKitRoute } from "@/hooks/use-brand-kit-route"
import { HeroBrandStack } from "@/components/hero-brand-stack"

/** Extra conic stops between the main angles so hues blend instead of hard wedges. */
function smoothConicAngles(a: number) {
  const s1 = 14.4 + a
  const s2 = 90 + a
  const s3 = 206.919 + a
  const s4 = 277.2 + a
  return {
    s1: s1.toFixed(1),
    s12: ((14.4 + 90) / 2 + a).toFixed(1),
    s2: s2.toFixed(1),
    s23: ((90 + 206.919) / 2 + a).toFixed(1),
    s3: s3.toFixed(1),
    s34: ((206.919 + 277.2) / 2 + a).toFixed(1),
    s4: s4.toFixed(1),
    s41: ((277.2 + 14.4 + 360) / 2 + a).toFixed(1),
  }
}

export function Hero() {
  const {
    isTypographyPage,
    isIconsPage,
    isPhotoPage,
    isBrandChapter,
    isColorPage,
    isLogoGradient,
    isTypographyGradient,
    isLogoOnly,
  } = useBrandKitRoute()
  const gradientRef = useRef<HTMLDivElement>(null)
  const photoHeroRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: 0.5, y: 0.2 })
  const current = useRef({ x: 0.5, y: 0.2, angle: 0 })
  const targetAngle = useRef(0)
  const scrollCurrent = useRef(0)
  const scrollTarget = useRef(0)
  const rafId = useRef<number>(0)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    const mSmooth = 0.012
    current.current.x = lerp(current.current.x, mousePos.current.x, mSmooth)
    current.current.y = lerp(current.current.y, mousePos.current.y, mSmooth)
    current.current.angle = lerp(current.current.angle, targetAngle.current, mSmooth)

    const cx = (current.current.x * 80 + 10).toFixed(1)
    const cy = (current.current.y * 70 + 10).toFixed(1)
    const a = current.current.angle
    const t = smoothConicAngles(a)
    const { s1, s12, s2, s23, s3, s34, s4, s41 } = t

    if (gradientRef.current) {
      if (isLogoGradient) {
        gradientRef.current.style.background = `radial-gradient(ellipse 120% 82% at 50% 100%, rgba(255,252,255,0.44) 0%, rgba(230,224,250,0.22) 30%, transparent 62%), radial-gradient(ellipse 88% 58% at 22% 100%, rgba(76,29,149,0.52) 0%, rgba(30,10,48,0.22) 52%, transparent 72%), conic-gradient(at ${cx}% ${cy}%, rgba(237,233,254,0) ${s1}deg, rgba(220,208,238,0.5) ${s12}deg, rgb(198,184,228) ${s2}deg, rgb(160,120,220) ${s23}deg, rgb(109,40,217) ${s3}deg, rgb(45,20,90) ${s34}deg, rgb(0,0,0) ${s4}deg, rgba(25,12,45,0.55) ${s41}deg)`
      } else if (isColorPage) {
        gradientRef.current.style.background = `linear-gradient(180deg, rgba(0,0,0,0.48) 0%, transparent 42%), linear-gradient(90deg, rgba(6,10,28,0.28) 0%, transparent 36%, transparent 64%, rgba(22,10,8,0.24) 100%), radial-gradient(ellipse 112% 80% at 50% 66%, rgba(165,195,255,0.52) 0%, rgba(55,90,255,0.34) 20%, rgba(43,69,255,0.12) 38%, transparent 56%), radial-gradient(ellipse 92% 66% at 12% 90%, rgba(14,28,78,0.78) 0%, rgba(4,4,14,0.28) 50%, transparent 74%), radial-gradient(ellipse 94% 70% at 90% 88%, rgba(255,112,98,0.5) 0%, rgba(255,155,118,0.2) 40%, transparent 64%), conic-gradient(at ${cx}% ${cy}%, rgba(5,5,16,0) ${s1}deg, rgb(44,56,118) ${s12}deg, rgb(18,30,82) ${s2}deg, rgb(42,68,178) ${s23}deg, rgb(58,95,255) ${s3}deg, rgb(145,78,85) ${s34}deg, rgb(218,78,62) ${s4}deg, rgb(38,16,22) ${s41}deg)`
      } else if (isTypographyGradient) {
        gradientRef.current.style.background = `radial-gradient(ellipse 130% 95% at 5% 10%, rgba(0,0,0,0.88) 0%, transparent 48%), radial-gradient(ellipse 72% 58% at 36% 44%, rgba(160,140,255,0.72) 0%, rgba(99,85,220,0.42) 32%, transparent 64%), radial-gradient(ellipse 100% 85% at 20% 86%, rgba(230,215,248,0.48) 0%, rgba(175,155,220,0.22) 42%, transparent 72%), radial-gradient(ellipse 110% 95% at 94% 58%, rgba(32,28,88,0.88) 0%, rgba(48,42,130,0.52) 38%, transparent 62%), radial-gradient(ellipse 88% 75% at 82% 90%, rgba(22,32,95,0.72) 0%, transparent 58%), conic-gradient(at ${cx}% ${cy}%, rgba(12,10,28,0) ${s1}deg, rgba(40,32,72,0.55) ${s12}deg, rgb(72,58,130) ${s2}deg, rgb(140,125,255) ${s23}deg, rgb(55,48,145) ${s3}deg, rgb(28,32,95) ${s34}deg, rgb(6,8,22) ${s4}deg, rgba(18,14,42,0.5) ${s41}deg)`
      } else if (isIconsPage) {
        gradientRef.current.style.background = `linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 32%, transparent 54%), radial-gradient(ellipse 100% 88% at 26% 82%, rgba(176,230,230,0.58) 0%, rgba(140,205,205,0.28) 40%, transparent 70%), radial-gradient(ellipse 105% 90% at 82% 78%, rgba(157,142,209,0.52) 0%, rgba(125,110,185,0.26) 44%, transparent 72%), radial-gradient(ellipse 75% 62% at 40% 56%, rgba(160,200,205,0.35) 0%, rgba(145,165,200,0.15) 45%, transparent 62%), conic-gradient(at ${cx}% ${cy}%, rgba(0,0,0,0) ${s1}deg, rgba(20,28,32,0.5) ${s12}deg, rgb(48,68,70) ${s2}deg, rgb(150,210,208) ${s23}deg, rgb(120,175,185) ${s3}deg, rgb(145,125,195) ${s34}deg, rgb(55,48,88) ${s4}deg, rgba(8,10,16,0.48) ${s41}deg)`
      } else if (isPhotoPage) {
        gradientRef.current.style.background = `radial-gradient(ellipse 105% 90% at 16% 48%, rgba(209,120,245,0.72) 0%, rgba(140,50,160,0.28) 44%, transparent 70%), radial-gradient(ellipse 100% 88% at 52% 54%, rgba(46,91,247,0.58) 0%, rgba(30,60,180,0.22) 38%, transparent 62%), radial-gradient(ellipse 108% 92% at 90% 52%, rgba(235,133,107,0.62) 0%, rgba(190,90,70,0.24) 42%, transparent 68%), radial-gradient(ellipse 85% 65% at 50% 98%, rgba(255,255,255,0.38) 0%, rgba(120,160,255,0.14) 32%, transparent 50%), conic-gradient(at ${cx}% ${cy}%, rgba(6,2,10,0) ${s1}deg, rgb(110,40,125) ${s12}deg, rgb(85,35,105) ${s2}deg, rgb(46,91,247) ${s23}deg, rgb(60,100,220) ${s3}deg, rgb(205,115,95) ${s34}deg, rgb(235,133,107) ${s4}deg, rgba(35,10,18,0.52) ${s41}deg)`
      } else {
        gradientRef.current.style.background = `conic-gradient(at ${cx}% ${cy}%, rgba(0,25,255,0) ${s1}deg, rgb(130,145,205) ${s12}deg, rgb(207,176,176) ${s2}deg, rgb(100,95,200) ${s23}deg, rgb(0,25,255) ${s3}deg, rgb(22,26,70) ${s34}deg, rgb(0,0,0) ${s4}deg, rgba(0,22,90,0.35) ${s41}deg)`
      }
    }

    scrollCurrent.current = lerp(scrollCurrent.current, scrollTarget.current, 0.06)
    if (Math.abs(scrollCurrent.current - scrollTarget.current) < 0.0005) {
      scrollCurrent.current = scrollTarget.current
    }

    const p = scrollCurrent.current
    const scale = 1 - p * 0.35
    const radius = p * 40
    const opacity = 1 - p * 0.95

    if (innerRef.current) {
      innerRef.current.style.transform = `scale3d(${scale},${scale},1)`
      innerRef.current.style.borderRadius = `${radius}px`
      innerRef.current.style.opacity = `${opacity}`
    }
    if (gradientRef.current) {
      gradientRef.current.style.borderRadius = `${radius}px`
    }
    if (photoHeroRef.current) {
      photoHeroRef.current.style.borderRadius = `${radius}px`
    }

    rafId.current = requestAnimationFrame(animate)
  }, [isLogoGradient, isColorPage, isTypographyGradient, isIconsPage, isPhotoPage])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [animate])

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const raw = -rect.top / (rect.height * 0.6)
      scrollTarget.current = Math.min(Math.max(raw, 0), 1)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    mousePos.current = { x: nx, y: ny }
    targetAngle.current = (nx - 0.5) * 18 + (ny - 0.5) * 10
  }, [])

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: 0.5, y: 0.2 }
    targetAngle.current = 0
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen scroll-mt-20"
      style={{ zIndex: 20 }}
    >
      <div
        ref={innerRef}
        className="sticky top-0 isolate flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-10 overflow-hidden origin-center will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {isPhotoPage ? (
          <div
            ref={photoHeroRef}
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          >
            <Image
              src="/brand/photo-hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_26%]"
              quality={92}
            />
            <div className="absolute inset-0 bg-black/40" aria-hidden />
          </div>
        ) : null}

        <div
          ref={gradientRef}
          className={cn(
            "pointer-events-none absolute inset-0 z-[2] will-change-[background]",
            isPhotoPage
              ? "scale-110 blur-2xl mix-blend-screen opacity-[0.93]"
              : "scale-[1.12] blur-3xl",
          )}
          style={{
            background: isLogoGradient
              ? "radial-gradient(ellipse 120% 82% at 50% 100%, rgba(255,252,255,0.44) 0%, rgba(230,224,250,0.22) 30%, transparent 62%), radial-gradient(ellipse 88% 58% at 22% 100%, rgba(76,29,149,0.52) 0%, rgba(30,10,48,0.22) 52%, transparent 72%), conic-gradient(at 50% 24%, rgba(237,233,254,0) 14.4deg, rgba(220,208,238,0.5) 52.2deg, rgb(198,184,228) 90deg, rgb(160,120,220) 148.5deg, rgb(109,40,217) 206.919deg, rgb(45,20,90) 242.1deg, rgb(0,0,0) 277.2deg, rgba(25,12,45,0.55) 325.8deg)"
              : isColorPage
                ? "linear-gradient(180deg, rgba(0,0,0,0.48) 0%, transparent 42%), linear-gradient(90deg, rgba(6,10,28,0.28) 0%, transparent 36%, transparent 64%, rgba(22,10,8,0.24) 100%), radial-gradient(ellipse 112% 80% at 50% 66%, rgba(165,195,255,0.52) 0%, rgba(55,90,255,0.34) 20%, rgba(43,69,255,0.12) 38%, transparent 56%), radial-gradient(ellipse 92% 66% at 12% 90%, rgba(14,28,78,0.78) 0%, rgba(4,4,14,0.28) 50%, transparent 74%), radial-gradient(ellipse 94% 70% at 90% 88%, rgba(255,112,98,0.5) 0%, rgba(255,155,118,0.2) 40%, transparent 64%), conic-gradient(at 50% 24%, rgba(5,5,16,0) 14.4deg, rgb(44,56,118) 52.2deg, rgb(18,30,82) 90deg, rgb(42,68,178) 148.5deg, rgb(58,95,255) 206.919deg, rgb(145,78,85) 242.1deg, rgb(218,78,62) 277.2deg, rgb(38,16,22) 325.8deg)"
                : isTypographyGradient
                  ? "radial-gradient(ellipse 130% 95% at 5% 10%, rgba(0,0,0,0.88) 0%, transparent 48%), radial-gradient(ellipse 72% 58% at 36% 44%, rgba(160,140,255,0.72) 0%, rgba(99,85,220,0.42) 32%, transparent 64%), radial-gradient(ellipse 100% 85% at 20% 86%, rgba(230,215,248,0.48) 0%, rgba(175,155,220,0.22) 42%, transparent 72%), radial-gradient(ellipse 110% 95% at 94% 58%, rgba(32,28,88,0.88) 0%, rgba(48,42,130,0.52) 38%, transparent 62%), radial-gradient(ellipse 88% 75% at 82% 90%, rgba(22,32,95,0.72) 0%, transparent 58%), conic-gradient(at 50% 24%, rgba(12,10,28,0) 14.4deg, rgba(40,32,72,0.55) 52.2deg, rgb(72,58,130) 90deg, rgb(140,125,255) 148.5deg, rgb(55,48,145) 206.919deg, rgb(28,32,95) 242.1deg, rgb(6,8,22) 277.2deg, rgba(18,14,42,0.5) 325.8deg)"
                  : isIconsPage
                    ? "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 32%, transparent 54%), radial-gradient(ellipse 100% 88% at 26% 82%, rgba(176,230,230,0.58) 0%, rgba(140,205,205,0.28) 40%, transparent 70%), radial-gradient(ellipse 105% 90% at 82% 78%, rgba(157,142,209,0.52) 0%, rgba(125,110,185,0.26) 44%, transparent 72%), radial-gradient(ellipse 75% 62% at 40% 56%, rgba(160,200,205,0.35) 0%, rgba(145,165,200,0.15) 45%, transparent 62%), conic-gradient(at 50% 24%, rgba(0,0,0,0) 14.4deg, rgba(20,28,32,0.5) 52.2deg, rgb(48,68,70) 90deg, rgb(150,210,208) 148.5deg, rgb(120,175,185) 206.919deg, rgb(145,125,195) 242.1deg, rgb(55,48,88) 277.2deg, rgba(8,10,16,0.48) 325.8deg)"
                    : isPhotoPage
                      ? "radial-gradient(ellipse 105% 90% at 16% 48%, rgba(209,120,245,0.72) 0%, rgba(140,50,160,0.28) 44%, transparent 70%), radial-gradient(ellipse 100% 88% at 52% 54%, rgba(46,91,247,0.58) 0%, rgba(30,60,180,0.22) 38%, transparent 62%), radial-gradient(ellipse 108% 92% at 90% 52%, rgba(235,133,107,0.62) 0%, rgba(190,90,70,0.24) 42%, transparent 68%), radial-gradient(ellipse 85% 65% at 50% 98%, rgba(255,255,255,0.38) 0%, rgba(120,160,255,0.14) 32%, transparent 50%), conic-gradient(at 50% 24%, rgba(6,2,10,0) 14.4deg, rgb(110,40,125) 52.2deg, rgb(85,35,105) 90deg, rgb(46,91,247) 148.5deg, rgb(60,100,220) 206.919deg, rgb(205,115,95) 242.1deg, rgb(235,133,107) 277.2deg, rgba(35,10,18,0.52) 325.8deg)"
                      : "conic-gradient(at 50% 24%, rgba(0,25,255,0) 14.4deg, rgb(130,145,205) 52.2deg, rgb(207,176,176) 90deg, rgb(100,95,200) 148.5deg, rgb(0,25,255) 206.919deg, rgb(22,26,70) 242.1deg, rgb(0,0,0) 277.2deg, rgba(0,22,90,0.35) 325.8deg)",
          }}
        />

        <motion.span
          className="relative z-10 text-white mb-10 md:mb-14 uppercase text-center"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: "90%",
          }}
        >
          {"{ BrandKit by Design Value }"}
        </motion.span>

        <HeroBrandStack
          title={
            isTypographyPage
              ? "Type"
              : isIconsPage
                ? "Icons"
                : isPhotoPage
                  ? "Photo"
                  : isLogoOnly
                    ? "Logo"
                    : isColorPage
                      ? "Color"
                      : "BrandKit"
          }
          subtitle="Brand Framework"
          tagline={
            isLogoOnly
              ? "Our Brand Logo Is The\nCornerstone Of Our Identity"
              : isIconsPage
                ? "Our Brand Icons Are The\nBrand's Visual Shorthand"
                : isTypographyPage
                  ? "Our Typography Is The\nStructure For Our Brand Voice"
                  : isPhotoPage
                    ? "Our Brand Photography Is The\nVisual Extension Of Our Identity"
                    : isColorPage
                      ? "Primary Palette, Spectrum &\nCombinations In One Place"
                      : "The Foundation\nof Your Brand Design"
          }
        />
      </div>
    </section>
  )
}
