export type RGBColor = [number, number, number, number | undefined]
export type HexColor = `#${string}`
interface Shades {
    [key: number]: RGBColor | HexColor
}
export interface RequiredShades {
    grayLight: Shades
    grayDark: Shades
    brand: Shades
    error: Shades
    warning: Shades
    success: Shades
}
export type PaletteConfig = RequiredShades & Partial<Record<string, Shades>>
export type Themes = PaletteConfig