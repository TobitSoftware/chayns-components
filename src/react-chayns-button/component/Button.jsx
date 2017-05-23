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
        style: PropTypes.object
    };

    handleClick = (event) => {
        const {onClick} = this.props;

        if (onClick) {
            onClick(event);
        }
    };

    render() {
        const {chooseButton, disabled, children, className, style} = this.props;

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
            >

                {children}
            </button>
        );
    }
}