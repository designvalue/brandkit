import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ColorIndexAnchorRowProps = {
  href: string
  num: number
  name: string
  colorIndexOnPrimary: boolean
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export function ColorIndexAnchorRow({
  href,
  num,
  name,
  colorIndexOnPrimary,
  onNavigate,
}: ColorIndexAnchorRowProps) {
  return (
    <a
      href={href}
      onClick={(e) => onNavigate(e, href)}
      className={cn(
        "group -mx-4 flex min-h-[69px] items-center justify-between border-b px-4 py-5 transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.995]",
        colorIndexOnPrimary
          ? "border-primary-foreground/20 hover:bg-primary-foreground/10"
          : "border-border hover:bg-primary",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-6">
        <span
          className={cn(
            "text-label min-w-[48px] shrink-0 font-mono transition-colors duration-200",
            colorIndexOnPrimary
              ? "text-primary-foreground/70 group-hover:text-primary-foreground"
              : "text-muted-foreground group-hover:text-primary-foreground",
          )}
        >
          {"{"} {num} {"}"}
        </span>
        <span
          className={cn(
            "min-w-0 text-lg font-medium transition-colors duration-200 md:text-xl",
            colorIndexOnPrimary
              ? "text-primary-foreground group-hover:text-primary-foreground"
              : "text-foreground group-hover:text-primary-foreground",
          )}
        >
          {name}
        </span>
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center gap-2 text-label font-mono transition-colors duration-200",
          colorIndexOnPrimary
            ? "text-primary-foreground/70 group-hover:text-primary-foreground"
            : "text-muted-foreground group-hover:text-primary-foreground",
        )}
      >
        <span className="hidden sm:inline">VIEW</span>
        <ArrowUpRight
          className={cn(
            "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            colorIndexOnPrimary && "text-primary-foreground",
          )}
        />
      </div>
    </a>
  )
}
