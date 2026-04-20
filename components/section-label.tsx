import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  className,
  braces = true,
  tone = "default",
}: {
  children: string
  className?: string
  /** When false, only the label text is shown (no `{ }` wrapper). */
  braces?: boolean
  /** `onPrimary`: light text for labels on `bg-primary` sections. */
  tone?: "default" | "onPrimary"
}) {
  const onPrimary = tone === "onPrimary"
  return (
    <div
      className={cn(
        "mb-6 flex items-center gap-2 text-label-sm font-mono tracking-widest",
        onPrimary ? "text-primary-foreground/75" : "text-muted-foreground",
        className,
      )}
    >
      {braces ? (
        <>
          <span
            className={cn(
              onPrimary
                ? "text-primary-foreground opacity-45"
                : "text-muted-foreground opacity-60",
            )}
          >
            {"{"}
          </span>
          <span className={cn(onPrimary && "text-primary-foreground")}>{children}</span>
          <span
            className={cn(
              onPrimary
                ? "text-primary-foreground opacity-45"
                : "text-muted-foreground opacity-60",
            )}
          >
            {"}"}
          </span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </div>
  )
}
