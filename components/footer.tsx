"use client"

import { ArrowUpRight, Github } from "lucide-react"
import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { footerIndex } from "@/lib/colors"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

/** Public repo for this Brand Kit — set to your real GitHub URL. */
const BRAND_KIT_GITHUB_URL = "https://github.com/designvalue/brand-kit"

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  /** Home already has the full index in `ColorIndex`; skip duplicating it here. */
  const hideIndexBlock = pathname === "/"

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
            }
          }
          window.setTimeout(scrollTo, 120)
          window.setTimeout(scrollTo, 400)
        }
        return
      }
      if (href.startsWith("#")) {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
          window.history.pushState(null, "", href)
        }
      }
    },
    [router],
  )

  return (
    <footer
      className={cn(
        "px-6 md:px-10",
        hideIndexBlock ? "py-10 md:py-12" : "py-14 md:py-20",
      )}
    >
      <div className="max-w-[1400px] mx-auto">
        {!hideIndexBlock && (
          <RevealOnScroll durationMs={680} rootMargin="0px 0px -6% 0px">
            <SectionHeading title="Index" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 md:mb-16">
              {footerIndex.map((section, sectionIdx) => (
                <div key={section.section}>
                  <h3 className="text-label font-mono text-muted-foreground mb-5">
                    {section.section}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {section.items.map((item, itemIdx) => (
                      <a
                        key={`${section.section}-${item.href}`}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className="group flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                      >
                        <span className="text-label-sm font-mono text-muted-foreground/60 min-w-[2.75rem] tabular-nums">
                          ({sectionIdx + 1}.{itemIdx + 1})
                        </span>
                        <span className="flex-1">{item.name}</span>
                        <ArrowUpRight className="w-3 h-3 translate-x-0 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* Bottom bar: top border hidden on `/` only */}
        <RevealOnScroll
          delayMs={hideIndexBlock ? 0 : 80}
          durationMs={640}
          rootMargin="0px 0px -4% 0px"
          className={cn(
            "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 md:pt-10",
            !hideIndexBlock && "border-t border-border",
          )}
        >
          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <img
              src="/brand/footer-logo.png"
              alt=""
              width={36}
              height={36}
              aria-hidden={true}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground tracking-tight">
                BrandKit
              </span>
              <span className="text-[0.625rem] leading-[1.2] font-mono tracking-[0.08em] text-muted-foreground">
                by DESIGN VALUE
              </span>
            </div>
          </div>

          {/* Credits */}
          <span className="text-sm font-sans leading-snug text-muted-foreground">
            Crafted with ❤️{" "}
            <a
              href="https://designvalue.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground hover:decoration-foreground/50 transition-colors"
            >
              Design Value
            </a>
          </span>

          <span className="text-sm font-sans leading-snug text-muted-foreground inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>A fully open-source license</span>
            <span className="text-muted-foreground/40 select-none" aria-hidden>
              ·
            </span>
            <a
              href={BRAND_KIT_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground hover:decoration-foreground/50 transition-colors"
            >
              <Github className="size-[15px] shrink-0 opacity-90" aria-hidden />
              GitHub
            </a>
          </span>
        </RevealOnScroll>
      </div>
    </footer>
  )
}
