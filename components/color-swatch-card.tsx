"use client"

import { useCallback } from "react"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import type { ColorSwatch } from "@/lib/colors"
import { copySwatchToClipboard } from "@/lib/color-format"
import { cn } from "@/lib/utils"
import { SwatchColorSpecs } from "@/components/swatch-color-specs"

export function getSwatchContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#050505" : "#F5F1E6"
}

export function ColorSwatchCard({ swatch }: { swatch: ColorSwatch }) {
  const textColor = getSwatchContrastColor(swatch.hex)

  const handleCopy = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        await copySwatchToClipboard(swatch)
        toast.success(`Copied ${swatch.name}`, {
          description: "HEX, RGB, and CMYK are on your clipboard.",
        })
      } catch {
        toast.error("Could not copy", { description: "Try again or copy manually." })
      }
    },
    [swatch],
  )

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy HEX, RGB, and CMYK"
      className={cn(
        "group relative w-full cursor-pointer rounded-2xl overflow-hidden bg-card border border-border text-left",
        "transition-[transform,box-shadow] hover:scale-[1.02] hover:ring-2 hover:ring-primary/25",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.99]",
      )}
    >
      <div
        className="aspect-[4/3] relative flex items-end p-5"
        style={{ backgroundColor: swatch.hex }}
      >
        <span
          className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/15 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
          style={{ color: textColor }}
          aria-hidden
        >
          <Copy className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <span
          className="text-label-sm font-mono opacity-70"
          style={{ color: textColor }}
        >
          {swatch.code}
        </span>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4">
        <span className="text-sm font-medium uppercase tracking-wide text-foreground">
          {swatch.name}
        </span>
        <SwatchColorSpecs hex={swatch.hex} className="text-muted-foreground" />
      </div>
    </button>
  )
}
