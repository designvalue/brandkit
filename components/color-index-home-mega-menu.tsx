"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MegaMenuSection } from "@/lib/colors"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

type ColorIndexHomeMegaMenuProps = {
  sections: MegaMenuSection[]
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export function ColorIndexHomeMegaMenu({
  sections,
  onNavigate,
}: ColorIndexHomeMegaMenuProps) {
  return (
    <div>
      {sections.map((group, gi) => (
        <RevealOnScroll
          key={group.section}
          delayMs={gi * 52}
          durationMs={640}
          threshold={0}
          rootMargin="0px 0px -4% 0px"
          className="block w-full"
        >
          <div className={cn(gi > 0 && "pt-8 md:pt-10")}>
            <div>
              {group.items.map((item, ii) => (
                <a
                  key={`${group.section}-${item.href}`}
                  href={item.href}
                  onClick={(e) => onNavigate(e, item.href)}
                  className="group -mx-4 grid grid-cols-[1fr_minmax(0,1fr)] items-center gap-x-4 px-5 py-1.5 md:gap-x-5 md:px-6 md:py-2"
                >
                  <span
                    className="min-w-0 text-2xl font-medium tracking-[-0.02em] text-primary-foreground md:text-3xl md:leading-[115%]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {ii === 0 ? (
                      group.section
                    ) : (
                      <span aria-hidden className="invisible block select-none">
                        {group.section}
                      </span>
                    )}
                  </span>
                  <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-primary-foreground/45 px-4 py-1 transition-[background-color,border-color] duration-200 md:gap-x-5 md:px-5 md:py-1.5 group-hover:border-neutral-950/25 group-hover:bg-white group-focus-visible:border-neutral-950/25 group-focus-visible:bg-white">
                    <span
                      className="text-[11px] font-normal tabular-nums tracking-[-0.02em] text-primary-foreground/70 transition-colors duration-200 group-hover:text-neutral-950 group-focus-visible:text-neutral-950"
                      style={{ fontFamily: "var(--font-dm-mono)" }}
                    >
                      ({gi + 1}.{ii + 1})
                    </span>
                    <span
                      className="min-w-0 truncate text-left text-lg font-medium tracking-[-0.02em] text-primary-foreground transition-colors duration-200 group-hover:text-neutral-950 group-focus-visible:text-neutral-950 md:text-[14px] md:leading-[140%]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.name}
                    </span>
                    <span className="flex shrink-0 items-center justify-self-end gap-2 text-label font-mono text-primary-foreground/70 transition-colors duration-200 group-hover:text-neutral-950 group-focus-visible:text-neutral-950">
                      <span className="hidden sm:inline">VIEW</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  )
}
