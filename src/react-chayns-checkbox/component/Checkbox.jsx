/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import stopPropagationListener from '../../utils/stopPropagationListener';
import ToggleButton from '../views/ToggleButton';

const CHECKBOX_LABEL_STYLE = { display: 'inline' };

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

    renderCheckbox() {
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
            className,
            stopPropagation
        } = this.props;

        let modifiedLabelStyle = labelStyle;
        if ((!label && !dangerouslySetLabel && !children)) {
            modifiedLabelStyle = {
                ...labelStyle,
                ...CHECKBOX_LABEL_STYLE
            };
        }

        return (
            <div className="cc__checkbox">
                <input
                    key="input"
                    type="checkbox"
                    className={classnames('checkbox', className)}
                    ref={(ref) => {
                        this._node = ref;
                    }}
                    onClick={stopPropagation ? stopPropagationListener : null}
                    onChange={this.onChange}
                    id={this.id}
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    style={style}
                />
                <label
                    key="label"
                    style={modifiedLabelStyle}
                    className={labelClassName}
                    onClick={stopPropagation ? stopPropagationListener : null}
                    htmlFor={this.id}
                    dangerouslySetInnerHTML={dangerouslySetLabel}
                >
                    {!dangerouslySetLabel ? (children || label || '') : null}
                </label>
            </div>
        );
    }

    renderToggleButton() {
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
            className,
            stopPropagation
        } = this.props;

        return (
            <ToggleButton
                id={this.id}
                ref={(ref) => { this._node = ref; }}
                onChange={this.onChange}
                style={style}
                disabled={disabled}
                label={label}
                checked={checked}
                className={className}
                defaultChecked={defaultChecked}
                dangerouslySetLabel={dangerouslySetLabel}
                labelStyle={labelStyle}
                labelClassName={labelClassName}
                stopPropagation={stopPropagation}
            >
                {children}
            </ToggleButton>
        );
    }

    render() {
        const {
            toggleButton,
        } = this.props;

        return toggleButton ? this.renderToggleButton() : this.renderCheckbox();
    }
}
