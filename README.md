# Yoruverse official Palette
Hey there! This is the official Yoruverse palette. You can copy, modify and use it for your own projects, don't need to credit us, but we would appreciate it if you do.

## Installation
You can download the palette from the npm registry by running the following 
command:
```bash
npm install @yoruverse-js/palette
```

## Usage

### Choosing your palette
> [!TIP]
> We recommend using the predefined palette since it's already tested. If you want to add or modify colors you will always be able to by using the `setColor` method.  
In order to use a blank palette:
```ts
import { Palette } from '@yoruverse-js/palette';

const palette = new Palette();
```
And in order to use our palette:
```ts
import { palette } from '@yoruverse-js/palette';
```
### Adding or editting colors
```ts
// You can choose any depth but the value should be either hex or rgb color
palette.setColor({
    base: {
        white: '#fff',
        black: '#000',
        transparent: [255, 255, 255, 0]
    },
    blue: '#...'
});
```
### Remove colors
```ts
palette.removeColor('base');
```
### Get color
```ts
palette.getColor('base');
```

## Utilities
### Transformers
```ts
import { hexToRGB, hexToRGB, rgbToString } from '@yoruverse-js/palette';
```
### Validators
```ts
import { isHexColor, isRGBColor } from '@yoruverse-js/palette';
```

## Contributors
<a href="https://github.com/jotis1" target="_blank">
    <img src="https://github.com/jotis1.png" width="30" height="30" alt="Jotis1" style="border-radius: 15px"  />
</a>
<a href="https://github.com/8l4ckr0s3" target="_blank">
    <img src="https://github.com/8l4ckr0s3.png" width="30" height="30" alt="Jotis1" style="border-radius: 15px"  />
</a>

## License
This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.