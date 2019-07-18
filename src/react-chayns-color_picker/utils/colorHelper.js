/* eslint-disable no-restricted-globals */
function componentToHex(c) {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

export function rgb1ToHsv(rgb) {
    const {
        r, g, b, a,
    } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * (0 + ((g - b) / (max - min)));
    } else if (max === g) {
        h = 60 * (2 + ((b - r) / (max - min)));
    } else if (max === b) {
        h = 60 * (4 + ((r - g) / (max - min)));
    }
    if (h < 0) {
        h += 360;
    }
    let s;
    if (max === 0) {
        s = 0;
    } else {
        s = (max - min) / max;
    }
    const v = max;
    return {
        h, s, v, a: typeof a === 'number' && !isNaN(a) ? a : 1,
    };
}

export function hsvToRgb1(hsv) {
    const { s, v } = hsv;
    let { h } = hsv;
    h /= 360;
    let r;
    let g;
    let b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
    case 0:
        r = v;
        g = t;
        b = p;
        break;
    case 1:
        r = q;
        g = v;
        b = p;
        break;
    case 2:
        r = p;
        g = v;
        b = t;
        break;
    case 3:
        r = p;
        g = q;
        b = v;
        break;
    case 4:
        r = t;
        g = p;
        b = v;
        break;
    case 5:
        r = v;
        g = p;
        b = q;
        break;
    default:
        r = v;
        g = t;
        b = p;
        break;
    }
    return {
        r,
        g,
        b,
        a: typeof hsv.a === 'number' && !isNaN(hsv.a) ? hsv.a : 1,
    };
}

export function rgb255ToHex(rgb) {
    const r = Math.round(rgb.r);
    const g = Math.round(rgb.g);
    const b = Math.round(rgb.b);
    const a = Math.round(rgb.a);
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${typeof a === 'number' && !isNaN(a) ? componentToHex(a) : ''}`;
}

export function hexToRgb255(hex) {
    const components = hex.match(/(?:#)?((?:[0-9a-f]{2}){3,4})/i);
    const a = parseInt(components[1].substring(6, 8), 16);
    return {
        r: parseInt(components[1].substring(0, 2), 16),
        g: parseInt(components[1].substring(2, 4), 16),
        b: parseInt(components[1].substring(4, 6), 16),
        a: typeof a === 'number' && !isNaN(a) ? a : 255,
    };
}

export function rgb255ToRgb1(rgb) {
    return {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
        a: typeof rgb.a === 'number' && !isNaN(rgb.a) ? rgb.a / 255 : 1,
    };
}

export function rgb1ToRgb255(rgb) {
    return {
        r: Math.round(rgb.r * 255),
        g: Math.round(rgb.g * 255),
        b: Math.round(rgb.b * 255),
        a: typeof rgb.a === 'number' && !isNaN(rgb.a) ? Math.round(rgb.a * 255) : 255,
    };
}
