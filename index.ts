import type { PaletteConfig, RGBColor, HexColor, Themes } from './types'
import { defaultConfig } from './config'

export class Palette {
    version = '0.0.2'
    themes: Themes

    constructor(config: PaletteConfig = defaultConfig) {
        this.validateConfig(config)
        this.themes = this.refactorThemes(config)
    }

    public rgbToHex(color: RGBColor): HexColor {
        return `#${color.map(c => c && c.toString(16).padStart(2, '0')).join('').toLowerCase()}`
    }

    public hexToRgb(color: HexColor): RGBColor {
        const hex = color.slice(1)
        return [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
            parseInt(hex.slice(6, 8), 16)
        ]
    }

    public validHex(color: any): color is HexColor {
        return /^#[0-9A-F]{6}([0-9A-F]{2})?$/i.test(color)
    }

    public validRGB(color: any): color is RGBColor {
        if (!Array.isArray(color)) return false
        return color.length >= 3 && color.length < 5 && color.every(c => c && c >= 0 && c <= 255)
    }

    public validateConfig(config: PaletteConfig) {
        const { grayLight, grayDark, brand, error, warning, success } = config
        if (!grayLight || !grayDark || !brand || !error || !warning || !success) {
            throw new Error('Missing required shades in config')
        }
        Object.values(config).forEach(shades => {
            if (!shades) {
                throw new Error('Missing required shades in config')
            }
            Object.values(shades).forEach(color => {
                if (!this.validRGB(color) && !this.validHex(color)) {
                    throw new Error(`Invalid color value: ${color}`)
                }
            })
        })
    }

    public refactorColor = (color: RGBColor | HexColor): RGBColor | HexColor => {
        if (this.validHex(color)) {
            return color.length === 9 ? this.hexToRgb(color) : color.toLowerCase() as HexColor
        }
        if (this.validRGB(color)) {
            return color.length === 4 ? this.rgbToHex(color) : color
        }
        throw new Error('Invalid color value')
    }

    public refactorThemes(config: PaletteConfig): Themes {
        return Object.entries(config).reduce((themes, [key, shades]) => {
            if (!shades) return themes
            themes[key] = Object.entries(shades).reduce((acc, [shade, color]) => {
                acc[shade] = this.refactorColor(color)
                return acc
            }, {} as any)
            return themes
        }, {} as Themes)
    }
}

const palette = new Palette()
console.log(palette.version)
console.log(palette.themes)