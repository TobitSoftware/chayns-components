import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const TappPortal = ({ children, parent }) => createPortal(
    children,
    parent || document.getElementsByClassName('tapp')[0] || document.body
);

TappPortal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    parent: PropTypes.instanceOf(Element),
};

export default TappPortal;
