"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { megaMenuSections } from "@/lib/colors"
import { cn } from "@/lib/utils"

const MotionLink = motion.create(Link)

const navTap = { scale: 0.96 }
const navHover = { backgroundColor: "rgba(255, 255, 255, 0.06)" }
const navSpring = { type: "spring" as const, stiffness: 520, damping: 34 }

const navLinks = [
  { name: "Logo", href: "/logo" },
  { name: "Color", href: "/color" },
  { name: "Type", href: "/typography" },
  { name: "Photo", href: "/photo" },
  { name: "Icons", href: "/icons" },
]

/** Same-page hash when already on that route; otherwise full path for router + scroll. */
function resolveMegaHref(pathname: string, href: string): string {
  const pairs: [string, string][] = [
    ["/logo", "/logo"],
    ["/color", "/color"],
    ["/typography", "/typography"],
    ["/photo", "/photo"],
    ["/icons", "/icons"],
  ]
  for (const [path, prefix] of pairs) {
    if (pathname === path && href.startsWith(`${prefix}#`)) {
      return href.slice(prefix.length)
    }
  }
  return href
}

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState("")
  const { theme, setTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    setActiveHash(window.location.hash)
    const onHashChange = () => setActiveHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      if (href.startsWith("/")) {
        router.push(href)
        const hashIdx = href.indexOf("#")
        if (hashIdx !== -1) {
          const hash = href.slice(hashIdx)
          const scrollTo = () => {
            const el = document.querySelector(hash)
            if (el) {
              el.scrollIntoView({ behavior: "smooth" })
              window.history.replaceState(null, "", href)
              setActiveHash(hash)
            }
          }
          window.setTimeout(scrollTo, 120)
          window.setTimeout(scrollTo, 400)
        }
        setMenuOpen(false)
        return
      }
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        window.history.pushState(null, "", href)
        setActiveHash(href)
      }
      setMenuOpen(false)
    },
    [router]
  )

  const handleMenuEnter = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setMenuOpen(true)
  }, [])

  const handleMenuLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setMenuOpen(false)
    }, 250)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div ref={menuRef} className="relative flex items-center gap-2">
        {/* Primary nav pill */}
        <nav className="flex items-center gap-0 rounded-full border border-nav-border bg-nav-bg backdrop-blur-xl px-1 py-1">
          {/* Logo */}
          <MotionLink
            href="/"
            className="flex items-center px-4 py-2 rounded-full"
            whileTap={navTap}
            whileHover={navHover}
            transition={navSpring}
          >
            <span className="text-[13px] font-medium tracking-[-0.01em] text-white whitespace-nowrap">
              BrandKit
            </span>
          </MotionLink>

          {/* Divider - hidden on mobile */}
          <div className="hidden md:block w-px h-4 bg-nav-divider mx-1" />

          {/* Navigation Links - hidden on mobile */}
          {navLinks.map((link) => {
            const isActive = link.href.startsWith("/")
              ? pathname === link.href
              : activeHash === link.href
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`hidden md:block text-[13px] tracking-[0.01em] font-normal px-3.5 py-2 rounded-full whitespace-nowrap ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
                whileTap={navTap}
                whileHover={navHover}
                transition={navSpring}
              >
                {link.name}
              </motion.a>
            )
          })}

          {/* Divider */}
          <div className="w-px h-4 bg-nav-divider mx-1" />

          {/* Theme toggle */}
          <motion.button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white mr-0.5"
            whileTap={{ scale: 0.9 }}
            whileHover={navHover}
            transition={navSpring}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-[14px] h-[14px]" />
            ) : (
              <Moon className="w-[14px] h-[14px]" />
            )}
          </motion.button>
        </nav>

        {/* Separate 3-dot menu button */}
        <motion.button
          type="button"
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-nav-border bg-nav-bg backdrop-blur-xl text-white/70 hover:text-white"
          whileTap={{ scale: 0.95 }}
          whileHover={navHover}
          transition={navSpring}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-current"
          >
            <circle cx="3" cy="8" r="1.5" fill="currentColor" />
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            <circle cx="13" cy="8" r="1.5" fill="currentColor" />
          </svg>
        </motion.button>

        {/* Mega dropdown - full header width */}
        <motion.div
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
          className={cn(
            "absolute top-full left-0 right-0 mt-2 max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-nav-border bg-nav-bg backdrop-blur-xl origin-top",
            !menuOpen && "pointer-events-none",
          )}
          initial={false}
          animate={
            menuOpen
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.97, y: -8 }
          }
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="px-5 py-2">
            {megaMenuSections.map((group, gi) => (
              <div key={group.section}>
                {gi > 0 && <div className="my-0.5 h-px bg-white/[0.08]" />}
                <div>
                  {group.items.map((item, ii) => {
                    const resolvedHref =
                      group.section === "Logo" &&
                      ii === 0 &&
                      (pathname === "/logo" ||
                        pathname === "/typography" ||
                        pathname === "/icons" ||
                        pathname === "/photo")
                        ? "#primary-palette"
                        : resolveMegaHref(pathname, item.href)
                    return (
                    <motion.a
                      key={item.num}
                      href={resolvedHref}
                      onClick={(e) => handleClick(e, resolvedHref)}
                      className="grid grid-cols-[1fr_auto_1fr] gap-4 py-2"
                      whileHover={{ opacity: 0.72, x: 2 }}
                      transition={{ duration: 0.18 }}
                    >
                      <span
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "14px",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                          lineHeight: "140%",
                          visibility: ii === 0 ? "visible" : "hidden",
                        }}
                      >
                        {group.section}
                      </span>

                      <span
                        className="text-white/50 text-center"
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "11px",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          lineHeight: "140%",
                        }}
                      >
                        ({gi + 1}.{ii + 1})
                      </span>

                      <span
                        className="text-white text-right"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "14px",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                          lineHeight: "140%",
                        }}
                      >
                        {item.name}
                      </span>
                    </motion.a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  )
}
