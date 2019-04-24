import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

let wasRendered = false;
let isDestroyed = false;

let lastParent = null;

const TappPortal = ({ children, parent }) => {
    let parentToUse = document.getElementsByClassName('tapp')[0] || document.body;

    if (!parent && wasRendered && parentToUse !== lastParent) {
        isDestroyed = true;
    }

    if (!parent && isDestroyed) {
        return null;
    }

    if (parent) {
        parentToUse = parent;
    }

    if (!wasRendered) {
        wasRendered = true;
    }

    lastParent = parentToUse;

    return createPortal(children, parentToUse);
};

TappPortal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    parent: PropTypes.instanceOf(Element),
};

export default TappPortal;
