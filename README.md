# Yoruverse Official Palette

Welcome! This is the official Yoruverse palette. You can copy, modify, and use it for your own projects without needing to credit us, but we'd greatly appreciate it if you do. ❤️

## Installation
To install the palette, run the following command from the npm registry:

```bash
npm install @yoruverse-js/palette
```

## Usage

### Choosing Your Palette

> **Tip**: We recommend using the predefined palette, as it's already tested. If you want to add or modify colors, you can always do so using the `setColor` method.  

#### Blank Palette
To start with an empty palette:

```ts
import { Palette } from '@yoruverse-js/palette';

const palette = new Palette();
```

#### Predefined Palette
To use our predefined palette:

```ts
import { palette } from '@yoruverse-js/palette';
```

### Adding or Editing Colors
You can nest colors to any depth, but the value must be either a valid hex or RGB color. For stricter typing, you can import the `HexColor` and `RGBColor` types from `@yoruverse-js/palette`.

```ts
palette.setColor({
    base: {
        white: '#fff',
        black: '#000',
        transparent: [255, 255, 255, 0]
    },
    blue: '#...'
});
```

### Removing Colors
To remove a color and all its nested children:

```ts
palette.removeColor('base');
```

### Getting a Specific Color
To retrieve a color (including all its children):

```ts
palette.getColor('base');
```

### Getting All Colors
You can retrieve all colors in either a flattened or prettified (nested) format:

```ts
// Multiple depth object
const vault = palette.colors.vault() // --> With both values (hex and rgb)
const vaultHex = palette.colors.vaultHex() // --> Transform all to hex values
const vaultRGB = palette.colors.vaultRGB() // --> Transform all to rgb values

// Single depth object
const vaultFlat = palette.colors.vaultFlat() // --> With both values (hex and rgb)
const vaultFlatRGB = palette.colors.vaultFlatRGB() // --> Transform all to rgb values
const vaultFlatRGB = palette.colors.vaultFlatRGB() // --> Transform all to rgb values
```

## Utilities

### Color Transformers
Transform one color format to another:

```ts
import { hexToRGB, rgbToHex, rgbToString } from '@yoruverse-js/palette';
```

### Validators
Validate whether a color is a properly formatted hex or RGB value:

```ts
import { isHexColor, isRGBColor } from '@yoruverse-js/palette';
```

## Contributors
<a href="https://github.com/jotis1" target="_blank">
    <img src="https://github.com/jotis1.png" width="30" height="30" alt="Jotis1" style="border-radius: 15px" />
</a>
<a href="https://github.com/8l4ckr0s3" target="_blank">
    <img src="https://github.com/8l4ckr0s3.png" width="30" height="30" alt="8l4ckr0s3" style="border-radius: 15px" />
</a>

## License
This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.

