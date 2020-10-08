const requestAnimationFrame =
    typeof window !== 'undefined' &&
    (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((cb) => window.setTimeout(cb, 0)));
export default requestAnimationFrame;
