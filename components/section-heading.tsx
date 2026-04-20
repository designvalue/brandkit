import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  count,
  description,
  tone = "default",
}: {
  title: string
  count?: number
  description?: string
  /** `onPrimary`: headings on `bg-primary` sections. */
  tone?: "default" | "onPrimary"
}) {
  const onPrimary = tone === "onPrimary"
  return (
    <div className="mb-12">
      <h2
        className={cn(
          "text-4xl font-medium tracking-tight md:text-5xl",
          onPrimary ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
        {count !== undefined && (
          <span
            className={cn(
              "ml-3 text-2xl font-normal md:text-3xl",
              onPrimary ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            ({count})
          </span>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed md:text-lg",
            onPrimary ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
