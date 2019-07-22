export default function restrictInterval(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
