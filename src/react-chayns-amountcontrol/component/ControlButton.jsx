import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ControlButton extends PureComponent {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        color: null,
    };

    render() {
        const {
            icon,
            onClick,
            className,
            disabled,
            color,
        } = this.props;

        return (
            <div
                onClick={disabled ? null : onClick}
                className={classNames(`${className} fa ${icon}`, { disabled })}
                style={color ? { color } : null}
            />
        );
    }
}
