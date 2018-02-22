import React from 'react';
import PropTypes from 'prop-types';

import ChooseButton from '../../react-chayns-button/component/ChooseButton';

const ControlButton = ({
    icon,
    onClick,
    className,
    disabled,
}) => {
    return(
        <ChooseButton
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            <i className={`fa ${icon}`} />
        </ChooseButton>
    );
};

ControlButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

ControlButton.defaultProps = {
    disabled: false,
};

export default ControlButton;
