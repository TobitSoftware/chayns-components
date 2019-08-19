import { HEX_REGEX } from './constants';
import { rgbToHsv, rgbToRgbString } from './rgb';
import hexToRgb255 from './hex/hexToRgb255';

/* eslint-disable-next-line import/prefer-default-export */
export function hexStringToRgb(hex) {
    return hexToRgb255(hex);
}

export function hexStringToHsv(hex) {
    return rgbToHsv(hexStringToRgb(hex));
}

export function hexStringToRgbString(hex, transparency = false) {
    return rgbToRgbString(hexStringToRgb(hex), transparency);
}
