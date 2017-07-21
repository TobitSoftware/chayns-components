import React from 'react';
import PropTypes from 'prop-types';

import {ChooseButton} from '../../index';

export default class ControlButton extends React.Component {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired,
        disabled: PropTypes.bool
    };

    render() {
        const {icon, onClick, className, disabled} = this.props;

        return(
            <ChooseButton
                onClick={onClick}
                className={className}
                disabled={disabled}
            >
                <i className={`fa ${icon}`} />
            </ChooseButton>
        );
    }
}