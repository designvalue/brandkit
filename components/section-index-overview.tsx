import { OverviewLineReveal } from "@/components/overview-line-reveal"

type SectionIndexOverviewProps = {
  body: string
}

const paragraphStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.5rem, 3.5vw, 48px)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  lineHeight: "1.22em",
  textAlign: "left" as const,
}

export function SectionIndexOverview({ body }: SectionIndexOverviewProps) {
  return (
    <div className="flex-1 flex items-start px-0 md:px-8 lg:px-12">
      <OverviewLineReveal
        text={body}
        paragraphStyle={paragraphStyle}
        className="min-w-0 w-full"
      />
    </div>
  )
}
