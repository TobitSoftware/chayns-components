const IMMEDIATE = 0;

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.setImmediate ||
    function (c) {
        return setTimeout(c, IMMEDIATE);
    };

export default requestAnimationFrame;
