import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ControlButton extends PureComponent {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        disabled: false,
    };

    render() {
        const {
            icon,
            onClick,
            className,
            disabled,
        } = this.props;

        return (
            <div
                onClick={onClick}
                className={`${className} fa ${icon}`}
                disabled={disabled}
            />
        );
    }
}
