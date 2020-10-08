import { isNumber } from '../../is';

export default function rgb1ToHsv(rgb) {
    const { r, g, b, a } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
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
        h,
        s,
        v,
        a: isNumber(a) ? a : 1 /* eslint-disable-line no-restricted-globals */,
    };
}
