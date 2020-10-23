/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';

/**
 * Buttons initiate actions, can include a title or an icon and come with a set
 * of predefined styles.
 */
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
        <button
            /* eslint-disable-next-line react/button-has-type */
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
                    <Icon icon={icon} />
                </span>
            )}
            {children}
        </button>
    );
});

export default Button;

Button.propTypes = {
    /**
     * String or components that are rendered inside of the button.
     */
    children: PropTypes.node.isRequired,

    /**
     * Renders the button on the "ChooseButton"-style. Alternatively use the `ChooseButton`-component.
     */
    chooseButton: PropTypes.bool,

    /**
     * Renders the button as disabled and disables click events.
     */
    disabled: PropTypes.bool,

    /**
     * Will be called after the button has been clicked with the event as the first parameter.
     */
    onClick: PropTypes.func,

    /**
     * String of classnames that should be added to the button.
     */
    className: PropTypes.string,

    /**
     * An optional icon that is displayed on the left of the button. Supply a FontAwesome icon like this: "fa fa-plane"
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Render the button in a secondary style.
     */
    secondary: PropTypes.bool,

    /**
     * Stop the event propagation on click.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Set the type for the native button HTML element.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
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
