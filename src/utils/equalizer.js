const dimension = {
    WIDTH: 'width',
    MIN_WIDTH: 'minWidth',
    HEIGHT: 'height',
    MIN_HEIGHT: 'minHeight',
};

/**
 * Equalizes the dimension of the specified elements.
 *
 * @param elements Elements to be equalized
 * @param d Dimension
 * @param [d2=d] Dimension that should be set
 */
function equalizeDimensions(elements, d, d2) {
    const { length } = elements;
    const dimensionToSet = d2 || d;
    let max = 0;

    if (length > 1) {
        let currentDim;

        for (let i = 0; i < length; i += 1) {
            currentDim = Math.ceil(elements[i].getBoundingClientRect()[d]);

            // find maximum dimension
            if (max < currentDim) {
                max = currentDim;
            }
        }

        if (max > 0) {
            // set all elements to max dimension
            for (let i = 0; i < length; i += 1) {
                const element = elements[i];
                element.style[dimensionToSet] = `${max}px`;
            }
        }
    }
}

/**
 * Equalizer
 * To equalize the height/width of different html elements, you have to give them the attributes "data-cc-equalize-width", "data-cc-equalize-height"
 * or "data-cc-equalize-both". The value of the attributes has to be an id which all of the elements that should be equalized have. Also, you have to
 * set this id to the attribute "data-cc-equalize" on a common parent element.
 *
 * @param {HTMLElement} element - optional root node of the elements that should be equalized
 */
export default function equalizer(element) {
    const parents = Array.prototype.slice.call((element || document).querySelectorAll('[data-cc-equalize], [data-equalize]'));

    if (element && (element.hasAttribute('data-cc-equalize') || element.hasAttribute('data-equalize'))) {
        parents.push(element);
    }

    for (let i = 0, l = parents.length; i < l; i += 1) {
        const parent = parents[i];
        const equalizeId = parent.getAttribute('data-cc-equalize') || parent.getAttribute('data-equalize') || '';

        // equalize width
        let elements = parent.querySelectorAll(`[data-cc-equalize-width="${equalizeId}"]`);
        if (elements.length) {
            equalizeDimensions(elements, dimension.WIDTH, dimension.MIN_WIDTH);
        }

        // equalize height
        elements = parent.querySelectorAll(`[data-cc-equalize-height="${equalizeId}"]`);
        if (elements.length) {
            equalizeDimensions(elements, dimension.HEIGHT, dimension.MIN_HEIGHT);
        }

        // equalize both
        elements = parent.querySelectorAll(`[data-cc-equalize-both="${equalizeId}"]`);
        if (elements.length) {
            equalizeDimensions(elements, dimension.WIDTH, dimension.MIN_WIDTH);
            equalizeDimensions(elements, dimension.HEIGHT, dimension.MIN_HEIGHT);
        }
    }
}
