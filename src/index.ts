import { version } from '../config/info';
import { hexToRGB, isHexColor, isRGBColor, rgbToHex } from '../utils/functions';

export type HexColor = `#${string}`
export type RGBColor<T = number> = [T, T, T] | [T, T, T, T]

export type Colors = {
    [key: string]: HexColor | RGBColor | Colors
}

export interface ReadableColors {
    [key: string]: {
        hex: HexColor,
        rgb: RGBColor
    }
}

export class Palette {

    #colors: Colors = {};

    constructor(colors: Colors = {}) {
        this.#colors = colors;
    }

    getColor(key: string): HexColor | RGBColor | Colors | undefined {
        return this.#colors[key];
    }

    setColor(color: Colors) {
        this.#colors = { ...this.#colors, ...color };
    }

    removeColor(key: string) {
        delete this.#colors[key];
    }

    get keys() {
        return Object.keys(this.#colors);
    }

    get version() {
        return version;
    }

    get colors(): Readonly<ReadableColors> {
        const flattenedColors = this.#flattenObject(this.#colors);
        return Object.keys(flattenedColors).reduce((acc: ReadableColors, key) => {
            const color = flattenedColors[key];
            if (isHexColor(color)) {
                acc[key] = {
                    hex: color,
                    rgb: hexToRGB(color)
                };
            }

            if (isRGBColor(color)) {
                acc[key] = {
                    hex: rgbToHex(color),
                    rgb: color
                };
            }

            return acc;
        }, {});
    }

    #flattenObject(obj: unknown, parentKey: string = '', separator: string = '-'): Record<string, string> {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('Input must be a non-null object');
        }

        return Object.keys(obj).reduce((acc, key: string) => {
            const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
            const value = (obj as Record<string, unknown>)[key];

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.assign(acc, this.#flattenObject(value, newKey, separator));
            } else {
                acc[newKey] = String(value);
            }
            return acc;
        }, {} as Record<string, string>);
    }

}