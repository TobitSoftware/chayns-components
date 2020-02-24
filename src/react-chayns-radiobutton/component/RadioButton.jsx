import React, { Component } from 'react';
import PropTypes from 'prop-types';

let currentId = 0;
const PREFIX = 'CC_RB_';

export default class RadioButton extends Component {
    constructor() {
        super();

        currentId += 1;
        this.id = PREFIX + currentId;
    }

    /**
     * Handles check event and passes the checked state to the handler.
     * @param event
     */
    handleChange = (event) => {
        const { disabled, onChange, value } = this.props;
        if (!disabled && onChange) {
            if (value !== undefined) {
                onChange(value);
            } else {
                onChange(event.target.value);
            }
        }
    };

    /**
     * Renders a radio button.
     * @returns {XML}
     */
    render() {
        const {
            checked,
            id,
            children,
            disabled,
            name,
            className,
            stopPropagation,
            style,
            ...props
        } = this.props;

        return (
            <div className={className} style={style}>
                <input
                    {...props}
                    id={id || this.id}
                    type="radio"
                    className="radio"
                    checked={checked}
                    onChange={this.handleChange}
                    name={name}
                    disabled={disabled}
                    onClick={stopPropagation ? (event) => event.stopPropagation() : null}
                />
                <label
                    htmlFor={id || this.id}
                    onClick={stopPropagation ? (event) => event.stopPropagation() : null}
                >
                    {children}
                </label>
            </div>
        );
    }
}

RadioButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    className: PropTypes.string,
    stopPropagation: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

RadioButton.defaultProps = {
    id: null,
    name: null,
    checked: undefined,
    onChange: null,
    disabled: false,
    children: null,
    value: undefined,
    className: null,
    stopPropagation: false,
    style: null,
};
