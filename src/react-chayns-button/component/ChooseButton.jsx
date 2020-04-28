import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ChooseButton = ({ children, ...props }) => (
    <Button
        chooseButton
        {...props}
    >
        {children}
    </Button>
);

ChooseButton.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

ChooseButton.defaultProps = {
    style: null,
    className: null,
    onClick: null,
    disabled: false,
    icon: null,
};

ChooseButton.displayName = 'ChooseButton';

export default ChooseButton;
