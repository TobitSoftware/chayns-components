import {
    hexToHsv,
    hexToRgb255,
    hsvToRgb255,
    hsvToHex,
    getRgb255String,
    rgb255ToHsv,
    rgb255ToHex,
} from '@chayns/colors';

const hsvToRgbString = (hsv) => {
    return getRgb255String(hsvToRgb255(hsv));
};

export {
    hexToHsv as hexStringToHsv,
    hexToRgb255 as hexStringToRgb,
    hsvToRgb255 as hsvToRgb,
    hsvToHex as hsvToHexString,
    hsvToRgbString,
    rgb255ToHsv as rgbToHsv,
    rgb255ToHex as rgbToHexString,
    getRgb255String as rgbToRgbString,
};
