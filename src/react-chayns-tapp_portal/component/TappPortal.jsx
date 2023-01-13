import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const TappPortal = ({ children, parent }) => {
    let parentToUse =
        typeof document !== 'undefined'
            ? document.getElementsByClassName('tapp')[0]
            : null;

    if (parent) {
        parentToUse = parent;
    }

    if (!parentToUse) return null;

    return createPortal(children, parentToUse);
};

TappPortal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},
};

TappPortal.defaultProps = {
    children: null,
    parent: null,
};

TappPortal.displayName = 'TappPortal';

export default TappPortal;
