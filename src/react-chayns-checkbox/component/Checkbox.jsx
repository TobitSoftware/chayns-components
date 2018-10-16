/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Checkbox extends Component {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        labelStyle: PropTypes.object,
        labelClassName: PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]),
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]),
        onChange: PropTypes.func,
        toggleButton: PropTypes.bool,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        dangerouslySetLabel: PropTypes.object
    };

    static defaultProps = {
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
        dangerouslySetLabel: null
    };

    constructor() {
        super();
        this.id = Math.random();
    }

    onChange = () => {
        const { onChange, disabled } = this.props;

        if (!disabled && onChange) {
            onChange(this._node.checked);
        }
    };

    renderCheckbox(classNames) {
        const {
            style,
            disabled,
            children,
            label,
            checked,
            defaultChecked,
            dangerouslySetLabel,
            labelStyle,
            labelClassName,
        } = this.props;

        return [
            <input
                key="input"
                type="checkbox"
                className={`checkbox${classNames}`}
                ref={(ref) => {
                    this._node = ref;
                }}
                onChange={this.onChange}
                id={this.id}
                disabled={disabled}
                checked={checked}
                defaultChecked={defaultChecked}
                style={style}
            />,
            <label
                key="label"
                style={labelStyle}
                className={labelClassName}
                htmlFor={this.id}
                dangerouslySetInnerHTML={dangerouslySetLabel}
            >
                {!dangerouslySetLabel ? (children || label || '') : null}
            </label>
        ];
    }

    renderToggleButton(classNames) {
        const {
            style,
            disabled,
            children,
            label,
            checked,
            defaultChecked,
            dangerouslySetLabel,
            labelStyle,
            labelClassName,
        } = this.props;

        return [
            <input
                key="input"
                type={`checkbox ${classNames}`}
                className="switch"
                ref={(ref) => {
                    this._node = ref;
                }}
                onChange={this.onChange}
                id={this.id}
                disabled={disabled}
                checked={checked}
                defaultChecked={defaultChecked}
                style={style}
            />,
            <label
                key="label"
                className={labelClassName}
                htmlFor={this.id}
                dangerouslySetInnerHTML={dangerouslySetLabel}
                style={label ? { ...labelStyle, ...{ marginRight: '10px' } } : labelStyle}
            />,
            !dangerouslySetLabel ? (children || label || '') : null
        ];
    }

    render() {
        const {
            className,
            toggleButton,
        } = this.props;
        const classNames = classnames({
            [className]: className
        });

        return toggleButton ? this.renderToggleButton(classNames) : this.renderCheckbox(classNames);
    }
}
