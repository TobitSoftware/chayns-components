import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class Button extends PureComponent {
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
        stopPropagation: PropTypes.bool,
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
        stopPropagation: false,
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const { onClick, disabled, stopPropagation } = this.props;

        if (onClick && !disabled) onClick(event);
        if (stopPropagation) event.stopPropagation();
    }

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
            stopPropagation, // exclude this prop from ...other
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
                    'button--icon': icon && !chooseButton,
                    'choosebutton--icon': icon && chooseButton,
                    [className]: className,
                })}
                onClick={this.handleClick}
                style={style}
                disabled={disabled}
                ref={buttonRef}
                {...other}
            >
                {icon ? (
                    <span
                        className={classNames({
                            button__icon: !chooseButton,
                            choosebutton__icon: chooseButton,
                        })}
                    >
                        <Icon icon={icon} />
                    </span>
                ) : null}
                {children}
            </button>
        );
    }
}
