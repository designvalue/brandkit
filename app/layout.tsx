/* BrandKit Pro Layout */
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono, DM_Mono } from "next/font/google"
import localFont from "next/font/local"
import { MotionRoot } from "@/components/motion-root"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { getRouteMetadata } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-url"
import "./globals.css"

/** Self-hosted (app/fonts) so the file is same-origin + preloaded by Next — avoids CDN swap jitter. */
const uncutSans = localFont({
  src: [
    {
      path: "./fonts/uncut-sans/uncut-sans-latin-300-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/uncut-sans/uncut-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/uncut-sans/uncut-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/uncut-sans/uncut-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/uncut-sans/uncut-sans-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-uncut-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: true,
})

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  ...getRouteMetadata("/"),
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "BrandKit by designvalue.co",
    template: "%s | BrandKit by designvalue.co",
  },
  icons: {
    icon: [
      {
        url: "/DV_logo.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/DV_logo.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/DV_logo.svg",
    apple: [{ url: "/DV_logo.svg", type: "image/svg+xml" }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${geistMono.variable} ${dmMono.variable} ${uncutSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionRoot>
            <SmoothScroll />
            {children}
            <Toaster richColors position="bottom-center" />
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  )
}
