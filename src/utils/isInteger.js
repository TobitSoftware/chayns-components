export default Number.isInteger ||
    function isInteger(value) {
        return (
            typeof value === 'number' &&
            isFinite(value) /* eslint-disable-line no-restricted-globals */ &&
            Math.floor(value) === value
        );
    };
