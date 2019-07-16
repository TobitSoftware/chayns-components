function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

export function toHex(color) {
    return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}`;
}
