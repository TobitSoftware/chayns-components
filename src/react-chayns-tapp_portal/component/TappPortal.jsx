import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

let lastParent = null;

const TappPortal = ({ children, parent }) => {
    let parentToUse = document.getElementsByClassName('tapp')[0] || document.body;

    const [wasRendered, setWasRendered] = useState(false);

    if (!parent && wasRendered && parentToUse !== lastParent) {
        // destroy old tapp portals in tapp DIVs to prevent duplicates after switching tapp
        return null;
    }

    if (parent) {
        parentToUse = parent;
    }

    if (!wasRendered) {
        setWasRendered(true);
    }

    if (lastParent !== parentToUse) {
        lastParent = parentToUse;
    }

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
