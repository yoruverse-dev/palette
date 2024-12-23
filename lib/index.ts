import type { PaletteColors, HexColor, RgbColor, Shades } from '../types'
import { paletteColors } from './config'

export class Palette {
    public colors: PaletteColors
    public keys: string[]
    public version = '0.0.3'

    constructor(colors: PaletteColors = paletteColors) {
        this.colors = this.#prettify(colors)
        this.keys = Object.keys(this.colors)
    }

    public isHexColor(color: unknown): color is HexColor {
        if (typeof color !== 'string') {
            return false
        }
        const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/
        return regex.test(color)
    }

    public hexToRgb(hex: HexColor): RgbColor {
        if (!this.isHexColor(hex)) {
            throw new Error('Invalid hex color')
        }
        const hasAlpha = hex.length === 9
        const hexValue = hex.replace('#', '')

        if (hexValue.length === 3) {
            const [r, g, b] = hexValue.split('').map((char) => parseInt(char + char, 16))
            return [r, g, b]
        }

        const [r, g, b, a] = hexValue.match(/.{1,2}/g)!.map((char) => parseInt(char, 16))
        return hasAlpha ? [r, g, b, a] : [r, g, b]
    }

    public isRbgColor(color: unknown): color is RgbColor {
        return Array.isArray(color)
            && color.length >= 3
            && color.length <= 4
            && color.every((value) => typeof value === 'number' && value >= 0 && value <= 255)
    }

    public rgbToHex(rgb: RgbColor): HexColor {
        if (!this.isRbgColor(rgb)) {
            throw new Error('Invalid RGB color')
        }

        const [r, g, b, a] = rgb
        const hasAlpha = a !== undefined
        const alpha = hasAlpha ? Math.round((a / 255) * 255).toString(16).padStart(2, '0') : ''
        return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}${alpha}`
    }

    #prettify(colors: PaletteColors) {
        const kebabCase = (str: string) => str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

        return Object.entries(colors).reduce((acc, [key, value]) => {
            value = value as Shades
            const prettifyColor = (color: HexColor | RgbColor) => {
                if (this.isHexColor(color)) {
                    return color.toLowerCase() as HexColor
                }
                return this.rgbToHex(color).toLowerCase() as HexColor
            }
            return {
                ...acc,
                [kebabCase(key)]: Object.entries(value).reduce((acc, [shade, color]) => {
                    return {
                        ...acc,
                        [kebabCase(shade)]: prettifyColor(color),
                    }
                }, {} as Shades),
            }
        }, {} as PaletteColors)
    }
}