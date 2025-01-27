# Yoruverse Official Palette

Welcome! This is the official Yoruverse palette. You can copy, modify, and use it for your own projects without needing to credit us, but we'd greatly appreciate it if you do. ❤️

## Installation
To install the palette, run the following command from the npm registry:

```bash
npm install @yoruverse-js/palette
```

## Usage


```ts
import { Palette } from '@yoruverse-js/palette';

const colors = Palette.colors;
```

## Utilities

### Color Transformers
Transform one color format to another:

```ts
Palette.hexToRgb('#fff');
Palette.rgbToHex([255, 255, 255]);
```

### Validators
Validate whether a color is a properly formatted hex or RGB value:

```ts
Palette.isHexColor('#fff');
Palette.isRgbColor([255, 255, 255]);
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

