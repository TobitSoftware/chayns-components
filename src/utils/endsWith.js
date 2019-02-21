export default function endsWith(value, searchString) {
    return value.slice(-searchString.length) === searchString;
}
