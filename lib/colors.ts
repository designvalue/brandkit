export interface ColorSwatch {
  name: string
  code: string
  hex: string
}

export interface GradientDef {
  name: string
  from: { label: string; hex: string }
  to: { label: string; hex: string }
}

export interface CombinationDef {
  bg: { name: string; hex: string }
  fg: { name: string; hex: string }
}

export interface SpectrumFamily {
  name: string
  shades: { label: string; hex: string }[]
}

// -- Primary Palette --
export const primaryColors: ColorSwatch[] = [
  { name: "Deep Blue", code: "P-001", hex: "#001BFF" },
  { name: "Black", code: "P-002", hex: "#050505" },
  { name: "Off White", code: "P-003", hex: "#F5F1E6" },
  { name: "Orange", code: "P-004", hex: "#FF8063" },
  { name: "Teal", code: "P-005", hex: "#BBFFFF" },
]

// -- Secondary Palette --
export const secondaryColors: ColorSwatch[] = [
  { name: "Yellow", code: "S-001", hex: "#FDC187" },
  { name: "Red", code: "S-002", hex: "#F66485" },
  { name: "Purple", code: "S-003", hex: "#8250FF" },
]

// -- Gradients --
export const gradients: GradientDef[] = [
  {
    name: "Gradient 01",
    from: { label: "Pink", hex: "#F50FE5" },
    to: { label: "Blue", hex: "#0518FF" },
  },
  {
    name: "Gradient 02",
    from: { label: "Teal", hex: "#BAFAF2" },
    to: { label: "Purple", hex: "#845BFE" },
  },
  {
    name: "Gradient 03",
    from: { label: "Cream", hex: "#FBCEBB" },
    to: { label: "Pink", hex: "#F51FC5" },
  },
]

// -- Primary Blue Shades --
export const primaryShades: ColorSwatch[] = [
  { name: "Blue", code: "P-001", hex: "#001BFF" },
  { name: "Blue 200", code: "P-002", hex: "#2E44FF" },
  { name: "Blue 300", code: "P-003", hex: "#5468FF" },
  { name: "Blue 400", code: "P-004", hex: "#7A8CFF" },
  { name: "Blue 500", code: "P-005", hex: "#99A8FF" },
  { name: "Blue 600", code: "P-006", hex: "#B3BFFF" },
  { name: "Blue 700", code: "P-007", hex: "#CCD4FF" },
  { name: "Blue 800", code: "P-008", hex: "#E0E5FF" },
  { name: "Blue 900", code: "P-009", hex: "#F0F2FF" },
]

// -- Greyscale --
export const greyscale: ColorSwatch[] = [
  { name: "Grey 100", code: "GR-001", hex: "#96A4A5" },
  { name: "Grey 200", code: "GR-002", hex: "#A1AEB0" },
  { name: "Grey 300", code: "GR-003", hex: "#ACB8BA" },
  { name: "Grey 400", code: "GR-004", hex: "#B7C2C4" },
  { name: "Grey 500", code: "GR-005", hex: "#C1CBCD" },
  { name: "Grey 600", code: "GR-006", hex: "#C9D1D4" },
  { name: "Grey 700", code: "GR-007", hex: "#D0D8DB" },
  { name: "Grey 800", code: "GR-008", hex: "#D5DEE1" },
  { name: "Grey 900", code: "GR-009", hex: "#DAE5ED" },
]

// -- Full Spectrum --
export const spectrum: SpectrumFamily[] = [
  {
    name: "Primary",
    shades: [
      { label: "50", hex: "#F0F2FF" },
      { label: "100", hex: "#E0E5FF" },
      { label: "200", hex: "#CCD4FF" },
      { label: "300", hex: "#B3BFFF" },
      { label: "400", hex: "#99A8FF" },
      { label: "500", hex: "#7A8CFF" },
      { label: "600", hex: "#5468FF" },
      { label: "700", hex: "#2E44FF" },
      { label: "800", hex: "#0019FF" },
      { label: "900", hex: "#0014CC" },
    ],
  },
  {
    name: "Orange",
    shades: [
      { label: "50", hex: "#FFF3F0" },
      { label: "100", hex: "#FFE4DE" },
      { label: "200", hex: "#FFD0C5" },
      { label: "300", hex: "#FFBCAC" },
      { label: "400", hex: "#FFA893" },
      { label: "500", hex: "#FF9A82" },
      { label: "600", hex: "#FF8C71" },
      { label: "700", hex: "#FF8063" },
      { label: "800", hex: "#E56B4F" },
      { label: "900", hex: "#CC5A3F" },
    ],
  },
  {
    name: "Teal",
    shades: [
      { label: "50", hex: "#F2FFFC" },
      { label: "100", hex: "#E0FFF8" },
      { label: "200", hex: "#CCFFF5" },
      { label: "300", hex: "#BBFFF2" },
      { label: "400", hex: "#99FFE9" },
      { label: "500", hex: "#77FFDF" },
      { label: "600", hex: "#55FFD5" },
      { label: "700", hex: "#33FFCB" },
      { label: "800", hex: "#11FFC1" },
      { label: "900", hex: "#00E6AB" },
    ],
  },
  {
    name: "Indigo",
    shades: [
      { label: "50", hex: "#F0EDFF" },
      { label: "100", hex: "#DED8FF" },
      { label: "200", hex: "#C8BFFF" },
      { label: "300", hex: "#B0A3FF" },
      { label: "400", hex: "#9B8AFF" },
      { label: "500", hex: "#8670FF" },
      { label: "600", hex: "#7258FF" },
      { label: "700", hex: "#5E40FF" },
      { label: "800", hex: "#4A28FF" },
      { label: "900", hex: "#3A1FCC" },
    ],
  },
  {
    name: "Blue",
    shades: [
      { label: "50", hex: "#EBF5FF" },
      { label: "100", hex: "#D6EAFF" },
      { label: "200", hex: "#ADD5FF" },
      { label: "300", hex: "#84C0FF" },
      { label: "400", hex: "#5BABFF" },
      { label: "500", hex: "#3296FF" },
      { label: "600", hex: "#0981FF" },
      { label: "700", hex: "#0068D6" },
      { label: "800", hex: "#0050AD" },
      { label: "900", hex: "#003A84" },
    ],
  },
  {
    name: "Red",
    shades: [
      { label: "50", hex: "#FFF0F3" },
      { label: "100", hex: "#FFD9E0" },
      { label: "200", hex: "#FFB3C1" },
      { label: "300", hex: "#FF8DA2" },
      { label: "400", hex: "#FF6783" },
      { label: "500", hex: "#F66485" },
      { label: "600", hex: "#E64D6F" },
      { label: "700", hex: "#D6365A" },
      { label: "800", hex: "#B91C45" },
      { label: "900", hex: "#9C0A35" },
    ],
  },
  {
    name: "Green",
    shades: [
      { label: "50", hex: "#EEFBF4" },
      { label: "100", hex: "#D4F5E2" },
      { label: "200", hex: "#A9EBCA" },
      { label: "300", hex: "#7EE1B2" },
      { label: "400", hex: "#53D79A" },
      { label: "500", hex: "#34C882" },
      { label: "600", hex: "#28A86C" },
      { label: "700", hex: "#1D8856" },
      { label: "800", hex: "#136840" },
      { label: "900", hex: "#0A4D2E" },
    ],
  },
]

// -- Combinations --
export const combinations: CombinationDef[] = [
  {
    bg: { name: "Cream", hex: "#F5F1E6" },
    fg: { name: "Blue", hex: "#051BD7" },
  },
  {
    bg: { name: "Black", hex: "#050505" },
    fg: { name: "Red", hex: "#F63D68" },
  },
  {
    bg: { name: "Purple", hex: "#6F42CF" },
    fg: { name: "Teal", hex: "#48EBEC" },
  },
]

// -- Color Index items (names + order match `megaMenuSections` Color group) --
export const colorIndexItems = [
  { num: 1, name: "Primary", href: "#primary-palette" },
  { num: 2, name: "Secondary", href: "#secondary-palette" },
  { num: 3, name: "Shades", href: "#shades" },
  { num: 4, name: "Spectrum", href: "#color-spectrum" },
  { num: 5, name: "Combination", href: "#combinations" },
]

/** Labels match `PrimaryPaletteSection` titles; sync Logo rows in `megaMenuSections`. */
export const logoIndexItems = [
  { num: 1, name: "Logo Mark", href: "#primary-palette" },
  { num: 2, name: "Construction", href: "#construction" },
  { num: 3, name: "Spacing & Placement", href: "#construction-copy" },
  { num: 4, name: "Colors", href: "#primary-palette-2" },
]

/** Sections rendered on `/photo` only; sync Photography rows in `megaMenuSections` (`navbar.tsx`). */
export const photoIndexItems = [
  { num: 1, name: "Principles", href: "#primary-palette" },
  { num: 2, name: "Portraits", href: "#construction" },
  { num: 3, name: "Motion", href: "#construction-2" },
  { num: 4, name: "Textures", href: "#construction-3" },
]

/** Labels mirror Type rows in `megaMenuSections` (`navbar.tsx`). */
export const typeIndexItems = [
  { num: 1, name: "Typeface", href: "#primary-palette" },
  { num: 2, name: "Type Scale", href: "#construction" },
  { num: 3, name: "Type In Use", href: "#construction-copy" },
]

/** Sections that exist on `/icons`; `navbar` mega-menu Icons rows are built from this list. */
export const iconIndexItems = [
  { num: 1, name: "Icon Library", href: "#primary-palette" },
]

/** Mega menu rows, home `#color-index`, footer, and navbar dropdown — single source. */
export const megaMenuSections = [
  {
    section: "Logo",
    items: [
      { num: "No001", name: "Logo Mark", href: "/logo" },
      { num: "No002", name: "Construction", href: "/logo#construction" },
      { num: "No003", name: "Spacing & Placement", href: "/logo#construction-copy" },
      { num: "No004", name: "Colors", href: "/logo#primary-palette-2" },
    ],
  },
  {
    section: "Color",
    items: [
      { num: "No001", name: "Primary", href: "/color#primary-palette" },
      { num: "No002", name: "Secondary", href: "/color#secondary-palette" },
      { num: "No003", name: "Shades", href: "/color#shades" },
      { num: "No004", name: "Spectrum", href: "/color#color-spectrum" },
      { num: "No005", name: "Combination", href: "/color#combinations" },
    ],
  },
  {
    section: "Type",
    items: [
      { num: "No001", name: "Typeface", href: "/typography#primary-palette" },
      { num: "No002", name: "Type Scale", href: "/typography#construction" },
      { num: "No003", name: "Type In Use", href: "/typography#construction-copy" },
    ],
  },
  {
    section: "Photography",
    items: photoIndexItems.map((item, index) => ({
      num: `No${String(index + 1).padStart(3, "0")}`,
      name: item.name,
      href: `/photo${item.href}`,
    })),
  },
  {
    section: "Icons",
    items: iconIndexItems.map((item, index) => ({
      num: `No${String(index + 1).padStart(3, "0")}`,
      name: item.name,
      href: `/icons${item.href}`,
    })),
  },
]

export type MegaMenuSection = (typeof megaMenuSections)[number]

/** Footer index grid reuses mega menu data. */
export const footerIndex = megaMenuSections
