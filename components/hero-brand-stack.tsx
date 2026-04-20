"use client"

import { motion, useReducedMotion } from "motion/react"

type HeroBrandStackProps = {
  title: string
  subtitle: string
  tagline: string
}

const itemEase = [0.22, 1, 0.36, 1] as const

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: itemEase },
  },
}

export function HeroBrandStack({
  title,
  subtitle,
  tagline,
}: HeroBrandStackProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 w-full max-w-[960px] mx-auto"
      initial={reduce ? false : "hidden"}
      animate={reduce ? "show" : undefined}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.45, margin: "0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.06 },
        },
      }}
    >
      <motion.h1
        variants={item}
        className="text-foreground text-center w-full"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4.5rem, 17vw, 240px)",
          fontWeight: 600,
          letterSpacing: "-0.052em",
          lineHeight: "80%",
        }}
      >
        {title}
      </motion.h1>

      <motion.h2
        variants={item}
        className="mt-12 md:mt-16 text-foreground text-center uppercase w-full"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "21px",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: "120%",
        }}
      >
        {subtitle}
      </motion.h2>

      <motion.p
        variants={item}
        className="mt-5 md:mt-7 text-label font-mono text-white text-center leading-relaxed whitespace-pre-line w-full flex justify-center"
      >
        {tagline}
      </motion.p>
    </motion.div>
  )
}
