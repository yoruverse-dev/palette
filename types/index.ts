export type RequiredShades =
    | 'grayLight'
    | 'grayDark'
    | 'brand'
    | 'error'
    | 'success'
    | 'warning'
    | 'base'

export type HexColor = `#${string}`;
export type RgbColor = [number, number, number] | [number, number, number, number];

export type Shades<T extends string = string> = {
    [shade in T]: HexColor | RgbColor;
}

export interface PaletteColors extends Record<RequiredShades, Shades | RgbColor | HexColor> {
    [key: string]: Shades | RgbColor | HexColor;
}