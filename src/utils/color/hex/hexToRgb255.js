import { HEX_REGEX } from '../constants';

export default function hexToRgb255(hex) {
    const components = hex.match(HEX_REGEX);
    const a = parseInt(components[1].substring(6, 8), 16) / 255;
    return {
        r: parseInt(components[1].substring(0, 2), 16),
        g: parseInt(components[1].substring(2, 4), 16),
        b: parseInt(components[1].substring(4, 6), 16),
        a: typeof a === 'number' && !isNaN(a) ? a : 1, /* eslint-disable-line no-restricted-globals */
    };
}
