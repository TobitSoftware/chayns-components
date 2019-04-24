import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const defaultParent = document.getElementsByClassName('tapp')[0] || document.body;
let destroyed = false;

const TappPortal = ({ children, parent }) => {
    const parentUsed = document.getElementsByClassName('tapp')[0] || document.body;

    if (!parent && parentUsed !== defaultParent) {
        destroyed = true;
    }

    if (!parent && destroyed) {
        return null;
    }

    return createPortal(
        children,
        parent || parentUsed,
    );
};

TappPortal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    parent: PropTypes.instanceOf(Element),
};

export default TappPortal;
