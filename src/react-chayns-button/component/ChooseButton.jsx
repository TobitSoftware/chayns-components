import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

/**
 * Similar to the `Button` component, but the `chooseButton`-prop is enabled by
 * default.
 */
const ChooseButton = ({ children, ...props }) => (
    <Button chooseButton {...props}>
        {children}
    </Button>
);

ChooseButton.propTypes = {
    /**
     * String or components that are rendered inside of the ChooseButton.
     */
    children: PropTypes.node.isRequired,

    /**
     * Renders the ChooseButton as disabled and disables click events.
     */
    disabled: PropTypes.bool,

    /**
     * Will be called after the ChooseButton has been clicked with the event as
     * the first parameter.
     */
    onClick: PropTypes.func,

    /**
     * String of classnames that should be added to the button.
     */
    className: PropTypes.string,

    /**
     * An optional icon that is displayed on the left of the button. Supply a
     * FontAwesome icon like this: "fa fa-plane".
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Stop the event propagation on click.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Set the type for the native button HTML element.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

ChooseButton.defaultProps = {
    className: null,
    onClick: null,
    disabled: false,
    icon: null,
    stopPropagation: false,
    type: 'button',
};

ChooseButton.displayName = 'ChooseButton';

export default ChooseButton;
