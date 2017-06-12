import React, { Component } from 'react';
import PropTypes from 'prop-types';

let currentId = 0;
const PREFIX = 'CC_RB_';

export default class RadioButton extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        children: PropTypes.any,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        tooltip: PropTypes.string
    };

    constructor() {
        super();

        this._id = PREFIX + currentId++;
    }

    /**
     * Handles check event and passes the checked state to the handler.
     * @param event
     */
    handleChange = (event) => {
        const {disabled, onChange, value} = this.props;
        if (!disabled && onChange) {
            onChange(value || event.target.value);
        }
    };

    /**
     * Renders a radio button.
     * @returns {XML}
     */
    render() {
        const {checked, id, children, disabled, name, className} = this.props;

        return (
            <div className={className}>
                <input
                    id={id || this._id}
                    type="radio"
                    className="radio"
                    checked={checked}
                    onChange={this.handleChange}
                    name={name}
                    disabled={disabled} />
                <label htmlFor={id || this._id}>
                    {children}
                </label>
            </div>
        );
    }

}