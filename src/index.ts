import { version } from '../config/info';
import { hexToRGB, isHexColor, isRGBColor, rgbToHex } from '../utils/functions';

export type HexColor = `#${string}`
export type RGBColor<T = number> = [T, T, T] | [T, T, T, T]

type Colors = {
    [key: string]: HexColor | RGBColor | Colors
}

type HexAndRGB = {
    hex: HexColor,
    rgb: RGBColor
}

type Vault<T> = {
    [key: string]: T | Vault<T>
}

export type FlatteredVault<T> = {
    [key: string]: T
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

    get colors() {
        const vault = (obj: Colors) => {
            return Object.keys(obj).reduce((acc, key: string) => {
                const value = obj[key];

                if (typeof value === 'string' && isHexColor(value)) {
                    acc[key] = {
                        hex: value,
                        rgb: hexToRGB(value)
                    };
                } else if (Array.isArray(value) && isRGBColor(value)) {
                    acc[key] = {
                        hex: rgbToHex(value),
                        rgb: value
                    };
                } else if (typeof value === 'object' && value !== null) {
                    acc[key] = vault(value as Colors);
                }

                return acc;
            }, {} as Vault<HexAndRGB>);
        };
        const vaultHex = (obj: Colors) => {
            return Object.keys(obj).reduce((acc, key: string) => {
                const value = obj[key];

                if (typeof value === 'string' && isHexColor(value)) {
                    acc[key] = value;
                } else if (Array.isArray(value) && isRGBColor(value)) {
                    acc[key] = rgbToHex(value);
                } else if (typeof value === 'object' && value !== null) {
                    acc[key] = vaultHex(value as Colors);
                }

                return acc;
            }, {} as Vault<HexColor>);
        };
        const vaultRGB = (obj: Colors) => {
            return Object.keys(obj).reduce((acc, key: string) => {
                const value = obj[key];

                if (typeof value === 'string' && isHexColor(value)) {
                    acc[key] = hexToRGB(value);
                } else if (Array.isArray(value) && isRGBColor(value)) {
                    acc[key] = value;
                } else if (typeof value === 'object' && value !== null) {
                    acc[key] = vaultRGB(value as Colors);
                }

                return acc;
            }, {} as Vault<RGBColor>);
        };
        const vaultFlat = (obj: Colors) => {
            const flattenedColors = this.#flattenObject(obj);
            return Object.keys(flattenedColors).reduce((acc, key) => {
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
            }, {} as FlatteredVault<HexAndRGB>);
        };
        const vaultFlatHex = (obj: Colors) => {
            const flattenedColors = this.#flattenObject(obj);
            return Object.keys(flattenedColors).reduce((acc, key) => {
                const color = flattenedColors[key];
                if (isHexColor(color)) {
                    acc[key] = color;
                } else if (isRGBColor(color)) {
                    acc[key] = rgbToHex(color);
                }

                return acc;
            }, {} as FlatteredVault<HexColor>);
        };
        const vaultFlatRGB = (obj: Colors) => {
            const flattenedColors = this.#flattenObject(obj);
            return Object.keys(flattenedColors).reduce((acc, key) => {
                const color = flattenedColors[key];
                if (isRGBColor(color)) {
                    acc[key] = color;
                } else if (isHexColor(color)) {
                    acc[key] = hexToRGB(color);
                }

                return acc;
            }, {} as FlatteredVault<RGBColor>);
        };

        return {
            vault: () => vault(this.#colors),
            vaultHex: () => vaultHex(this.#colors),
            vaultRGB: () => vaultRGB(this.#colors),
            vaultFlat: () => vaultFlat(this.#colors),
            vaultFlatHex: () => vaultFlatHex(this.#colors),
            vaultFlatRGB: () => vaultFlatRGB(this.#colors)
        };

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