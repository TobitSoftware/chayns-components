import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class ControlButton extends PureComponent {
    static propTypes = {
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
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
                className={classNames(className, { disabled })}
                style={color ? { color } : null}
            >
                <Icon icon={icon}/>
            </div>
        );
    }
}
