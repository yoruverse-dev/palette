import { Palette } from './lib'
export * from './types'

// we will create a css file with root variables

const palette = new Palette()

const keys = palette.keys
const colors = palette.colors({ format: 'hex' })

let str = `:root {`

for (const key of keys) {
    for (const shade in colors[key]) {
        str += `
    --${key}-${shade}: ${colors[key][shade]};`
    }
}

str += `
}`

Bun.write('css/variables.css', str)