export default function getRgb255String(rgb, transparency = false) {
    return `rgb${transparency ? 'a' : ''}(${rgb.r}, ${rgb.g}, ${rgb.b}${
        transparency
            ? `, ${rgb.a.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
              })}`
            : ''
    })`;
}
