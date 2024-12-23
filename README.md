# Yoruverse official Palette
Hey there! This is the official Yoruverse palette. You can copy, modify and use it for your own projects, don't need to credit us, but we would appreciate it if you do.

## Installation
You can download the palette from the npm registry by running the following command:
```bash
npm install @yoruverse-js/palette
```

## Usage
You can import the palette in your project by using the following code:
```typescript
import { Palette } from '@yoruverse-js/palette'

// You can use our colors or create your own
const palette = new Palette()
// or new Palette({...})

const version = palette.version
const keys = palette.keys
const colors = palette.colors({ format: 'hex' }) // or 'rgb'. Default is 'hex'

// There are also some helper functions
palette.isHexColor(...)
palette.isRgbColor(...)
palette.hexToRgb(...)
palette.rgbToHex(...)
palette.rgbToString(...)
```

#### CSS's variables
You can also use the palette in your CSS files by importing the [css/variables](./css/variables.css) file

## Contributors
<a href="https://github.com/jotis1" target="_blank">
    <img src="https://github.com/jotis1.png" width="30" height="30" alt="Jotis1" style="border-radius: 15px"  />
</a>
<a href="https://github.com/8l4ckr0s3" target="_blank">
    <img src="https://github.com/8l4ckr0s3.png" width="30" height="30" alt="Jotis1" style="border-radius: 15px"  />
</a>

## License
This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.