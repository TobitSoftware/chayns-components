import '../../polyfills/is-finite';

export function isInteger(value) {
    return typeof value === 'number' &&
        Number.isFinite(value) &&
        Math.floor(value) === value;
}

export function stringEndsWith(subjectString, searchString, position) {
    let pos = position;
    if (typeof pos !== 'number' || !Number.isFinite(pos) || Math.floor(pos) !== pos || pos > subjectString.length) {
        pos = subjectString.length;
    }
    pos -= searchString.length;

    const lastIndex = subjectString.indexOf(searchString, pos);
    return lastIndex !== -1 && lastIndex === pos;
}
