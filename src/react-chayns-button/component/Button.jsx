import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        chooseButton: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        buttonRef: PropTypes.func,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        secondary: PropTypes.bool,
        light: PropTypes.bool,
    };

    static defaultProps = {
        buttonRef: null,
        style: null,
        className: null,
        onClick: null,
        disabled: false,
        chooseButton: false,
        icon: null,
        secondary: false,
        light: false,
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
            light,
            ...other
        } = this.props;

        return (
            <button
                type="button"
                className={classNames({
                    button: !chooseButton,
                    choosebutton: chooseButton,
                    'button--disabled': disabled,
                    'button--secondary': secondary,
                    lightbutton: light,
                    [className]: className
                })}
                onClick={this.handleClick}
                style={style}
                disabled={disabled}
                ref={buttonRef}
                {...other}
            >
                {
                    icon
                        ? (
                            <span className={classNames({
                                button__icon: !chooseButton,
                                choosebutton__icon: chooseButton
                            })}
                            >
                                <Icon icon={icon}/>
                            </span>
                        )
                        : null
                }
                {children}
            </button>
        );
    }
}
