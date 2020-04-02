/* eslint-disable jsx-a11y/label-has-associated-control,react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ToggleButton from '../views/ToggleButton';
import CheckboxView from '../views/Checkbox';

export default class Checkbox extends PureComponent {
    constructor(props) {
        super(props);
        this.id = props.id ? props.id : Math.random();
    }

    onChange = () => {
        const { onChange, disabled } = this.props;

        if (!disabled && onChange) {
            onChange(this.node.checked);
        }
    };

    renderCheckbox(props) {
        return (
            <CheckboxView
                {...props}
                id={this.id}
                ref={(ref) => {
                    this.node = ref;
                }}
                onChange={this.onChange}
            />
        );
    }

    renderToggleButton(props) {
        return (
            <ToggleButton
                {...props}
                id={this.id}
                ref={(ref) => {
                    this.node = ref;
                }}
                onChange={this.onChange}
            />
        );
    }

    render() {
        const {
            toggleButton,
            onChange,
            ...props
        } = this.props;

        if (toggleButton) {
            return this.renderToggleButton(props);
        }

        return this.renderCheckbox(props);
    }
}

Checkbox.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    labelStyle: PropTypes.object,
    labelClassName: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    onChange: PropTypes.func,
    toggleButton: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    dangerouslySetLabel: PropTypes.object,
    stopPropagation: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Checkbox.defaultProps = {
    style: null,
    className: null,
    label: null,
    labelClassName: null,
    labelStyle: null,
    children: null,
    onChange: null,
    toggleButton: false,
    checked: undefined,
    defaultChecked: undefined,
    disabled: false,
    dangerouslySetLabel: null,
    stopPropagation: false,
    id: null,
};

Checkbox.displayName = 'Checkbox';
