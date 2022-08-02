/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'clsx';

let currentId = 0;
const PREFIX = 'CC_RB_';

/**
 * A radio button that allows to select one of multiple options.
 */
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
            <div className={classNames('cc__radio-button', className)} style={style}>
                <input
                    {...props}
                    id={id || this.id}
                    type="radio"
                    className="radio"
                    checked={checked}
                    onChange={this.handleChange}
                    name={name}
                    disabled={disabled}
                    onClick={
                        stopPropagation
                            ? (event) => event.stopPropagation()
                            : null
                    }
                />
                <label
                    htmlFor={id || this.id}
                    onClick={
                        stopPropagation
                            ? (event) => event.stopPropagation()
                            : null
                    }
                >
                    {children}
                </label>
            </div>
        );
    }
}

RadioButton.propTypes = {
    /**
     * The HTML id of the `<input>`-element.
     */
    id: PropTypes.string,

    /**
     * Multiple radio buttons with the same name belong to one group. Only one
     * radio button in a group can be active at a time.
     */
    name: PropTypes.string,

    /**
     * Wether the radio button is currently active.
     */
    checked: PropTypes.bool,

    /**
     * A function that is called when the radio button gets checked. Receives
     * the `value`-prop as its first argument.
     */
    onChange: PropTypes.func,

    /**
     * Disables any user interaction and renders the radio button in a disabled
     * style.
     */
    disabled: PropTypes.bool,

    /**
     * A string or `ReactNode` that will be the label.
     */
    children: PropTypes.node,

    /**
     * A value that will be sent to the `onChange`-callback as its first
     * argument.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),

    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * A React style object that will be applied to the container element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
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

RadioButton.displayName = 'RadioButton';
