# Color Utils

The ColorUtils are a set of functions, that could be used to convert between hex, hsv and rgb colors.
They could be imported using the following statement:
```jsx harmony
import * as ColorUtils from 'chayns-components/lib/utils/color';
```

The ColorUtils contains the following functions:

## HSV
The hsv-object has the following structure:
```
{
    h: Number (0 ... 360),
    s: Number (0 ... 1),
    v: Number (0 ... 1),
    [a: Number (0 ... 1)]
}
```
### hsvToRgb(hsv)
### hsvToHexString(hsv, transparency = false)
### hsvToRgbString(hsv, transparency = false)

## RGB
The rgb-object has the following structure:
```
{
    r: Number (0 ... 255),
    g: Number (0 ... 255),
    b: Number (0 ... 255),
    [a: Number (0 ... 1)]
}
```
### rgbToHsv(rgb)
### rgbToHexString(rgb, transparency = false)
### rgbToRgbString(rgb, transparency = false)

## HEX
### hexStringToRgb(hex)
### hexStringToHsv(hex)
### hexStringToRgbString(hex, transparency = false)
