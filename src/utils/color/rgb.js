import rgb255ToRgb1 from './rgb/rgb255ToRgb1';
import rgb1ToHsv from './rgb/rgb1ToHsv';
import rgb255ToHex from './rgb/rgb255ToHex';
import getRgb255String from './rgb/getRgb255String';

export function rgbToHsv(rgb) {
    return rgb1ToHsv(rgb255ToRgb1(rgb));
}

export function rgbToHexString(rgb, transparency = false) {
    const lRgb = {
        ...rgb,
    };

    if (!transparency) {
        delete lRgb.a;
    }

    return rgb255ToHex(lRgb);
}

export function rgbToRgbString(rgb, transparency = false) {
    return getRgb255String(rgb, transparency);
}
