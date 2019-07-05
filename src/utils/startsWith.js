export default function startsWith(value, searchString) {
    return value.slice(0, searchString.length) === searchString;
}
