Number.isFinite = Number.isFinite || function (value) {
    // eslint-disable-next-line no-restricted-globals
    return typeof value === 'number' && isFinite(value);
};
