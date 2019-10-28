export function isString(value) {
    return typeof value === 'string';
}

export function isNumber(value) {
    // eslint-disable-next-line no-restricted-globals
    return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function isFunction(value) {
    return typeof value === 'function';
}

export function isNullOrWhiteSpace(value) {
    return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
}
