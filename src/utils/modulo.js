// because javaScript calculates modulo wrong
export default function mod(n, m) {
    return ((n % m) + m) % m;
}
