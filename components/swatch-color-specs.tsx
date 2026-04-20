import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { formatColorSpecStrings } from "@/lib/color-format"

export function SwatchColorSpecs({
  hex,
  className,
  style,
  size = "default",
}: {
  hex: string
  className?: string
  style?: CSSProperties
  /** `compact` for dense tiles */
  size?: "default" | "compact"
}) {
  const spec = formatColorSpecStrings(hex)
  const textSize =
    size === "compact"
      ? "text-[7px] leading-tight md:text-[8px]"
      : "text-[8px] leading-snug md:text-[9px]"

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 font-mono tabular-nums tracking-[-0.02em]",
        textSize,
        className,
      )}
      style={style}
    >
      <div className="flex gap-2">
        <span className="w-8 shrink-0 opacity-70 md:w-9">HEX</span>
        <span>{spec.hex}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-8 shrink-0 opacity-70 md:w-9">RGB</span>
        <span>{spec.rgb}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-8 shrink-0 opacity-70 md:w-9">CMYK</span>
        <span>{spec.cmyk}</span>
      </div>
    </div>
  )
}
