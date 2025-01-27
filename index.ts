import type { AccentValue, AccentName, Shades, HexColor, RgbColor, Colors } from "./types";
import { writeFileSync } from 'fs';
export class Palette {

    public static readonly version = '0.2.2'

    public static isHexColor(color: unknown): color is HexColor {
        const regex = /^([0-9A-Fa-f]{3}){1,2}$/
        return typeof color === 'string'
            && regex.test(color)
    }

    public static isRgbColor(color: unknown): color is RgbColor {
        return Array.isArray(color)
            && color.length === 3
            && color.every((c) => typeof c === 'number' && c >= 0 && c <= 255)
    }

    public static hexToRgb(hex: unknown): RgbColor {
        if (!Palette.isHexColor(hex)) {
            throw new Error('Invalid hex color.')
        }

        return hex.length === 3 ?
            hex.match(/./g)!.map((c) => parseInt(c + c, 16)) as RgbColor :
            hex.match(/.{2}/g)!.map((c) => parseInt(c, 16)) as RgbColor
    }

    public static rgbToHex(rgb: unknown): HexColor {
        if (!Palette.isRgbColor(rgb)) {
            throw new Error('Invalid RGB color.')
        }

        return rgb.map((c) => c.toString(16).padStart(2, '0')).join('')
    }

    public static createAccent(colors: HexColor[] | RgbColor[]): AccentValue {
        if (colors.length !== 12) {
            throw new Error('You must provide 12 colors.')
        }

        const shades: Shades[] = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

        return colors.reduce((acc, color, index) => {
            const shade = shades[index]
            acc[shade] = {
                hex: Palette.isHexColor(color) ? `#${color}` : `#${Palette.rgbToHex(color)}`,
                rgb: Palette.isRgbColor(color) ? color : Palette.hexToRgb(color),
            }
            return acc
        }, {} as AccentValue)
    }

    public static colors: Colors = {
        'gray-light': Palette.createAccent(['fdfdfd', 'fafafa', 'f5f5f5', 'e9eaeb', 'd5d7da', 'a4a7ae', '717680', '535862', '414651', '252b37', '181d27', '0a0d12']),
        'gray-dark': Palette.createAccent(['fafafa', 'f7f7f7', 'f0f0f1', 'ececed', 'cecfd2', '94979c', '85888e', '61656c', '373a41', '22262f', '13161b', '0c0e12']),
        'brand': Palette.createAccent(['fcfaff', 'f9f5ff', 'f4ebff', 'e9d7fe', 'd6bbfb', 'b692f6', '9e77ed', '7f56d9', '6941c6', '53389e', '42307d', '2c1c5f']),
        'error': Palette.createAccent(['fffafa', 'fef3f2', 'fee4e2', 'fecdca', 'fda29b', 'f97066', 'f04438', 'd92d20', 'b42318', '912018', '7a271a', '55160c']),
        'warning': Palette.createAccent(['fffcf5', 'fffaeb', 'fef0c7', 'fedf89', 'fec84b', 'fdb022', 'f79009', 'dc6803', 'b54708', '93370d', '7a2e0e', '4e1d09']),
        'success': Palette.createAccent(['f6fef9', 'ecfdf3', 'cdfae6', 'abefc6', '75e0a7', '47cd89', '17b26a', '079455', '067647', '085d3a', '074d31', '053321']),
    }

    public static createThemeCssFile() {
        const css = '@theme {\n'
        const variables = Object.entries(Palette.colors).map(([name, accent]) => {
            const shades = Object.entries(accent).map(([shade, { hex }]) => `  --color-${name}-${shade}: ${hex};`)
            return shades.join('\n')
        }).join('\n\n')

        writeFileSync('tailwind/v4/theme.css', css + variables + '\n}')
    }

}

export type {
    HexColor,
    RgbColor,
    AccentName,
    AccentValue,
    Shades,
    Colors
}

Palette.createThemeCssFile()