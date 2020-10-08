const IMMEDIATE = 0;

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.setImmediate ||
    // eslint-disable-next-line func-names
    function (c) {
        return setTimeout(c, IMMEDIATE);
    };

export default requestAnimationFrame;
