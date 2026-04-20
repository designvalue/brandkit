import type { ColorSwatch } from "@/lib/colors"

/** Parse #RRGGBB into sRGB 0–255. */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  const h = m[1]
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

/** sRGB → CMYK (0–100), standard inverse of screen RGB for print reference. */
export function rgbToCmyk(
  r: number,
  g: number,
  b: number,
): { c: number; m: number; y: number; k: number } {
  const r1 = r / 255
  const g1 = g / 255
  const b1 = b / 255
  const k = 1 - Math.max(r1, g1, b1)
  if (k >= 1 - 1e-9) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }
  const d = 1 - k
  const c = ((1 - r1 - k) / d) * 100
  const m = ((1 - g1 - k) / d) * 100
  const y = ((1 - b1 - k) / d) * 100
  return { c, m, y, k: k * 100 }
}

export function formatColorSpecStrings(hex: string): {
  hex: string
  rgb: string
  cmyk: string
} {
  const { r, g, b } = hexToRgb(hex)
  const cm = rgbToCmyk(r, g, b)
  const norm = hex.trim().startsWith("#") ? hex.trim() : `#${hex.trim()}`
  return {
    hex: norm.toUpperCase(),
    rgb: `${r}, ${g}, ${b}`,
    cmyk: `${Math.round(cm.c)}, ${Math.round(cm.m)}, ${Math.round(cm.y)}, ${Math.round(cm.k)}`,
  }
}

/** Plain-text block for clipboard (name, code, HEX, RGB, CMYK). */
export function formatSwatchForClipboard(swatch: ColorSwatch): string {
  const spec = formatColorSpecStrings(swatch.hex)
  return [
    swatch.name,
    swatch.code,
    `HEX ${spec.hex}`,
    `RGB ${spec.rgb}`,
    `CMYK ${spec.cmyk}`,
  ].join("\n")
}

/** Call from event handlers only (requires secure context for clipboard). */
export async function copySwatchToClipboard(swatch: ColorSwatch): Promise<void> {
  await navigator.clipboard.writeText(formatSwatchForClipboard(swatch))
}
