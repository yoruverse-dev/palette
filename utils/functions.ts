import type { HexColor, RGBColor } from '../src';

export function isHexColor(color: unknown): color is HexColor {
    const regExp = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
    return typeof color === 'string' && regExp.test(color);
}

export function isRGBColor(color: unknown): color is RGBColor {
    return Array.isArray(color)
        && (color.length === 3 || color.length === 4)
        && color.every(c => c >= 0 && c <= 255);
}

export function hexToRGB(color: HexColor): RGBColor {
    if (!isHexColor(color)) throw new Error('Invalid hex color');

    const hex = color.slice(1);
    const length = hex.length;

    const isShort = length === 3;
    const res = hex.match(isShort ? /.{1}/g : /.{2}/g);

    return res!.map(hex => {
        const value = parseInt(hex, 16);
        if (isShort) return value * 17;
        return value;
    }) as RGBColor;
}

export function rgbToHex(color: RGBColor): HexColor {
    if (!isRGBColor(color)) throw new Error('Invalid RGB color');
    return `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`;
}

export function rgbToString(color: RGBColor): string {
    if (!isRGBColor(color)) throw new Error('Invalid RGB color');
    return color.length === 3 ? `rgb(${color.join(', ')})`
        : `rgba(${color.join(', ')})`;
}