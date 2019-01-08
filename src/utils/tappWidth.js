/**
 * Gets the inner width of the tapp.
 * @returns {int} - returns the inner width of the tapp. If there is no tapp element, it will return null.
 */
export default function getTappWidth() {
    const element = document.querySelector('.tapp');
    if (!element) return null;
    const computedStyle = window.getComputedStyle(element);
    return parseInt(computedStyle.width, 10) - parseInt(computedStyle.paddingLeft, 10) - parseInt(computedStyle.paddingRight, 10);
}
