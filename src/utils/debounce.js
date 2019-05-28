/**
 * Returns a wrapper function that executes `func` after it was not called for the last `delay` milliseconds
 * @param {(...args: any[]) => void} func
 * @param {number} delay
 */
const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export default debounce;
