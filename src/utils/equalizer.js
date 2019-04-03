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
function equalize(elements, d, d2) {
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
 * Initializes equalizer
 */
// eslint-disable-next-line import/prefer-default-export
export function init(element) {
    const parents = Array.prototype.slice.call((element || document).querySelectorAll('[data-equalize]'));

    if (element && element.hasAttribute('data-equalize')) {
        parents.push(element);
    }

    for (let i = 0, l = parents.length; i < l; i += 1) {
        const parent = parents[i];
        const equalizeId = parent.getAttribute('data-equalize') || '';

        // equalize width
        let elements = parent.querySelectorAll(`[data-cc-equalize-width="${equalizeId}"]`);
        if (elements.length) {
            equalize(elements, dimension.WIDTH, dimension.MIN_WIDTH);
        }

        // equalize height
        elements = parent.querySelectorAll(`[data-cc-equalize-height="${equalizeId}"]`);
        if (elements.length) {
            equalize(elements, dimension.HEIGHT, dimension.MIN_HEIGHT);
        }

        // equalize both
        elements = parent.querySelectorAll(`[data-cc-equalize-both="${equalizeId}"]`);
        if (elements.length) {
            equalize(elements, dimension.WIDTH, dimension.MIN_WIDTH);
            equalize(elements, dimension.HEIGHT, dimension.MIN_HEIGHT);
        }
    }
}
