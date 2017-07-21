import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Button extends React.Component {
    static propTypes = {
        chooseButton: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        buttonRef: PropTypes.func
    };

    handleClick = (event) => {
        const {onClick, disabled} = this.props;

        if (onClick && !disabled) {
            onClick(event);
        }
    };

    render() {
        const {chooseButton, disabled, children, className, style, buttonRef, onClick, ...other} = this.props;

        let classNames = classnames({
            'button': !chooseButton,
            'choosebutton': chooseButton,
            'button--disabled': disabled,
            [className]: className
        });

        return (
            <button
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