export default function getHexString(hex, transparency = false) {
    if (transparency) {
        return hex;
    }
    return hex.substring(0, 7);
}
