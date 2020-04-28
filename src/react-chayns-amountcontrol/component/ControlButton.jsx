/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class ControlButton extends PureComponent {
    render() {
        const {
            icon,
            onClick,
            className,
            disabled,
            color,
            stopPropagation,
        } = this.props;

        return (
            <div
                onClick={(e) => {
                    if (!disabled) onClick(e);
                    if (stopPropagation) e.stopPropagation();
                }}
                className={classNames(className, { disabled })}
            >
                <Icon icon={icon} style={color ? { color } : null}/>
            </div>
        );
    }
}
ControlButton.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    stopPropagation: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    color: PropTypes.string,
};

ControlButton.defaultProps = {
    disabled: false,
    color: null,
};
