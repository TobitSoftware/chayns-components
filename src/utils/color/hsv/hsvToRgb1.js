export default function hsvToRgb1(hsv) {
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
