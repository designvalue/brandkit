"use client"

import { motion, useReducedMotion } from "motion/react"
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"

function pickFontProps(cs: CSSStyleDeclaration): Record<string, string> {
  return {
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontStyle: cs.fontStyle,
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing,
    lineHeight: cs.lineHeight,
    fontFeatureSettings: cs.fontFeatureSettings,
    fontVariantLigatures: cs.fontVariantLigatures,
    textTransform: cs.textTransform,
    fontStretch: cs.fontStretch,
  }
}

/** Lay out word spans at a fixed width (off-DOM) and group by line box tops. */
function splitTextIntoLines(
  text: string,
  widthPx: number,
  font: Record<string, string>,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return []
  if (widthPx < 24) return [text.trim()]

  const host = document.createElement("div")
  host.style.cssText = [
    "position:fixed",
    "left:-32768px",
    "top:0",
    "visibility:hidden",
    "pointer-events:none",
    `width:${widthPx}px`,
    "white-space:normal",
    "overflow-wrap:anywhere",
    "word-break:normal",
    "margin:0",
    "padding:0",
    "border:0",
  ].join(";")
  Object.assign(host.style, font)

  const p = document.createElement("p")
  p.style.margin = "0"
  p.style.textAlign = "left"
  const spans: HTMLSpanElement[] = []
  for (let i = 0; i < words.length; i++) {
    const s = document.createElement("span")
    s.textContent = words[i] + (i < words.length - 1 ? " " : "")
    s.style.display = "inline"
    p.appendChild(s)
    spans.push(s)
  }
  host.appendChild(p)
  document.body.appendChild(host)

  try {
    const lineGroups: string[][] = []
    let cur: string[] = []
    let lastTop = Number.NEGATIVE_INFINITY
    for (let i = 0; i < spans.length; i++) {
      const top = spans[i].getBoundingClientRect().top
      if (cur.length === 0 || Math.abs(top - lastTop) <= 2) {
        cur.push(words[i])
      } else {
        lineGroups.push(cur)
        cur = [words[i]]
      }
      lastTop = top
    }
    if (cur.length) lineGroups.push(cur)
    return lineGroups.map((g) => g.join(" "))
  } finally {
    host.remove()
  }
}

const lineEase = [0.22, 1, 0.36, 1] as const

type OverviewLineRevealProps = {
  text: string
  paragraphStyle: CSSProperties
  className?: string
  staggerMs?: number
  lineDurationMs?: number
}

export function OverviewLineReveal({
  text,
  paragraphStyle,
  className,
  staggerMs = 88,
  lineDurationMs = 620,
}: OverviewLineRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fontProbeRef = useRef<HTMLParagraphElement>(null)
  const [lines, setLines] = useState<string[]>(() => [text])
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const probe = fontProbeRef.current
    if (!wrap || !probe) return

    const run = () => {
      const w = wrap.offsetWidth
      if (w < 32) return
      const font = pickFontProps(getComputedStyle(probe))
      const next = splitTextIntoLines(text, w, font)
      if (!next.length) return
      setLines((prev) =>
        prev.length === next.length && prev.every((l, i) => l === next[i])
          ? prev
          : next,
      )
    }

    run()
    const ro = new ResizeObserver(run)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [text])

  const staggerSec = staggerMs / 1000
  const durSec = lineDurationMs / 1000

  const lineVariants = {
    hidden: { opacity: 0, y: "1.05em" },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durSec,
        ease: lineEase,
      },
    },
  }

  return (
    <div ref={wrapRef} className={className}>
      <span className="sr-only">{text}</span>
      <p
        ref={fontProbeRef}
        className="pointer-events-none absolute left-0 top-0 m-0 w-full opacity-0"
        style={paragraphStyle}
        aria-hidden
      >
        &nbsp;
      </p>
      <motion.div
        // Remount when line wraps change so in-view stagger runs after the real line count exists.
        key={lines.join("\n")}
        className="relative flex flex-col"
        aria-hidden
        initial={reduce ? false : "hidden"}
        animate={reduce ? "show" : undefined}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: "some", margin: "0px 0px -5% 0px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerSec,
              delayChildren: reduce ? 0 : 0.04,
            },
          },
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.p
              variants={lineVariants}
              className="text-foreground m-0"
              style={{
                ...paragraphStyle,
                textAlign: "left",
              }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
