import PropTypes from 'prop-types';

const SetupItem = ({ children }) => children;

SetupItem.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool
};

SetupItem.defaultProps = {
    children: null
};

export default SetupItem;
