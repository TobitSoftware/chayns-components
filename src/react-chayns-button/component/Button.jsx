import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        chooseButton: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        buttonRef: PropTypes.func,
        icon: PropTypes.string,
        secondary: PropTypes.bool
    };

    static defaultProps = {
        buttonRef: null,
        style: null,
        className: null,
        onClick: null,
        disabled: false,
        chooseButton: false,
        icon: null,
        secondary: false
    };

    handleClick = (event) => {
        const { onClick, disabled } = this.props;

        if (onClick && !disabled) {
            onClick(event);
        }
    };

    render() {
        const {
            chooseButton,
            disabled,
            children,
            className,
            style,
            buttonRef,
            icon,
            secondary,
            ...other
        } = this.props;

        const classNames = classnames(icon, {
            button: !chooseButton,
            choosebutton: chooseButton,
            'button--disabled': disabled,
            'button--secondary': secondary,
            [className]: className
        });

        return (
            <button
                type="button"
                className={classNames}
                onClick={this.handleClick}
                style={style}
                disabled={disabled}
                ref={buttonRef}
                {...other}
            >
                {children}
            </button>
        );
    }
}
