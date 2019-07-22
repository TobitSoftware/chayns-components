import { HEX_REGEX } from './constants';
import { rgbToHsv, rgbToRgbString } from './rgb';

/* eslint-disable-next-line import/prefer-default-export */
export function hexStringToRgb(hex) {
    const components = hex.match(HEX_REGEX);
    const a = parseInt(components[1].substring(6, 8), 16) / 255;

    return {
        r: parseInt(components[1].substring(0, 2), 16),
        g: parseInt(components[1].substring(2, 4), 16),
        b: parseInt(components[1].substring(4, 6), 16),
        a: typeof a === 'number' && !isNaN(a) ? a : 1, /* eslint-disable-line no-restricted-globals */
    };
}

export function hexStringToHsv(hex) {
    return rgbToHsv(hexStringToRgb(hex));
}

export function hexStringToRgbString(hex, transparency = false) {
    return rgbToRgbString(hexStringToRgb(hex), transparency);
}
