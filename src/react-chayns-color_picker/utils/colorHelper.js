function componentToHex(c) {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

export function toHex(color, addAlpha = false) {
    return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}${addAlpha && typeof color.a === 'number' ? componentToHex(color.a) : ''}`;
}
