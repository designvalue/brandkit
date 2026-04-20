import { SectionLabel } from "@/components/section-label"

type SectionIndexMetaProps = {
  overviewLabel: string
  tagline: string
}

export function SectionIndexMeta({
  overviewLabel,
  tagline,
}: SectionIndexMetaProps) {
  return (
    <div className="md:w-[260px] lg:w-[300px] shrink-0 flex flex-col gap-3">
      <SectionLabel className="font-medium md:font-normal lg:font-light">
        {overviewLabel}
      </SectionLabel>
      <p className="text-foreground whitespace-nowrap">
        <span className="text-[15px] font-normal tracking-[-0.005em] md:font-light">
          BrandKit
        </span>
      </p>
      <p
        className="text-muted-foreground whitespace-pre-line font-medium md:font-normal lg:font-light"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "15px",
          letterSpacing: "-0.008em",
          lineHeight: "140%",
        }}
      >
        {tagline}
      </p>
    </div>
  )
}
