import React from 'react';
import classnames from 'classnames';

export default class Button extends React.Component {
    static propTypes = {
        chooseButton: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        children: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        className: React.PropTypes.string,
        style: React.PropTypes.object
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