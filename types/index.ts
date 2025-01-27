export type HexColor = string
export type RgbColor = [number, number, number]
export type AccentName =
    | 'gray-light'
    | 'gray-dark'
    | 'brand'
    | 'error'
    | 'warning'
    | 'success'
export type Shades =
    | '25'
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950'
export type AccentValue = Record<Shades, { hex: HexColor; rgb: RgbColor }>
export type Colors = Record<AccentName, AccentValue>