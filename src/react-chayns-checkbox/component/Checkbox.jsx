/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Checkbox extends PureComponent {
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
        dangerouslySetLabel: PropTypes.object,
        stopPropagation: PropTypes.bool
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
        dangerouslySetLabel: null,
        stopPropagation: false
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
            stopPropagation
        } = this.props;

        return (
            <div className="cc__checkbox">
                <input
                    key="input"
                    type="checkbox"
                    className={`checkbox ${classNames}`}
                    ref={(ref) => {
                        this._node = ref;
                    }}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
                    onChange={this.onChange}
                    id={this.id}
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    style={style}
                />
                <label
                    key="label"
                    style={{ ...labelStyle, ...(!label && !dangerouslySetLabel && !children ? { display: 'inline' } : null) }}
                    className={labelClassName}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
                    htmlFor={this.id}
                    dangerouslySetInnerHTML={dangerouslySetLabel}
                >
                    {!dangerouslySetLabel ? (children || label || '') : null}
                </label>
            </div>
        );
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
            stopPropagation
        } = this.props;

        return (
            <div className="cc__switch">
                <input
                    key="input"
                    type="checkbox"
                    className={`switch ${classNames}`}
                    ref={(ref) => {
                        this._node = ref;
                    }}
                    onChange={this.onChange}
                    id={this.id}
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    style={style}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
                />
                <label
                    key="label"
                    className={labelClassName}
                    htmlFor={this.id}
                    dangerouslySetInnerHTML={dangerouslySetLabel}
                    style={label ? { ...labelStyle, ...{ marginRight: '10px' } } : labelStyle}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
                />
                {!dangerouslySetLabel ? (children || label || '') : null}
            </div>
        );
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
