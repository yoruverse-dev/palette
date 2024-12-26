import { hexToRGB, rgbToHex, isHexColor, isRGBColor } from '../utils/functions';
import { describe, it, expect } from 'bun:test';

describe('utils', () => {
    it('should convert hex to RGB', () => {
        expect(hexToRGB('#ff0')).toEqual([255, 255, 0]);
        expect(hexToRGB('#ff00ff')).toEqual([255, 0, 255]);
        expect(hexToRGB('#ff00ff00')).toEqual([255, 0, 255, 0]);
        expect(() => hexToRGB('#invalid')).toThrow();
    });

    it('should convert RGB to hex', () => {
        expect(rgbToHex([255, 255, 0])).toEqual('#ffff00');
        expect(rgbToHex([255, 0, 255])).toEqual('#ff00ff');
        expect(rgbToHex([255, 0, 255, 0])).toEqual('#ff00ff00');
        expect(() => rgbToHex([300, -100, 0, 50])).toThrow();
    });

    it('should validate hex color', () => {
        expect(isHexColor('#ff0')).toBe(true);
        expect(isHexColor('#ff00ff')).toBe(true);
        expect(isHexColor('#ff00ff00')).toBe(true);
        expect(isHexColor('#invalid')).toBe(false);
    });

    it('should validate RGB color', () => {
        expect(isRGBColor([255, 255, 0])).toBe(true);
        expect(isRGBColor([255, 0, 255])).toBe(true);
        expect(isRGBColor([255, 0, 255, 0])).toBe(true);
        expect(isRGBColor([300, -100, 0, 50])).toBe(false);
    });
});