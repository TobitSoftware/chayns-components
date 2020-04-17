/* eslint-disable react/forbid-prop-types */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';

const Button = forwardRef((props, ref) => {
    const {
        chooseButton,
        disabled,
        children,
        className,
        icon,
        secondary,
        stopPropagation,
        onClick,
        type,
        ...other
    } = props;

    const handleClick = (event) => {
        if (onClick && !disabled) onClick(event);
        if (stopPropagation) event.stopPropagation();
    };

    return (
        // eslint-disable-next-line react/button-has-type
        <button
            type={type}
            className={classNames(className, {
                button: !chooseButton,
                choosebutton: chooseButton,
                'button--disabled': disabled,
                'button--secondary': secondary,
                'button--icon': icon && !chooseButton,
                'choosebutton--icon': icon && chooseButton,
            })}
            onClick={handleClick}
            disabled={disabled}
            ref={ref}
            {...other}
        >
            {icon && (
                <span
                    className={classNames({
                        button__icon: !chooseButton,
                        choosebutton__icon: chooseButton,
                    })}
                >
                    <Icon icon={icon}/>
                </span>
            )}
            {children}
        </button>
    );
});

Button.propTypes = {
    children: PropTypes.node.isRequired,
    chooseButton: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    buttonRef: PropTypes.func,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    secondary: PropTypes.bool,
    stopPropagation: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
    buttonRef: null,
    className: null,
    onClick: null,
    disabled: false,
    chooseButton: false,
    icon: null,
    secondary: false,
    stopPropagation: false,
    type: 'button',
};

Button.displayName = 'Button';
