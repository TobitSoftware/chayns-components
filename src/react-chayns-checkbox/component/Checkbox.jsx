/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Checkbox extends PureComponent {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
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
        tooltip: PropTypes.string,
        dangerouslySetLabel: PropTypes.object,
        stopPropagation: PropTypes.bool
    };

    static defaultProps = {
        style: null,
        className: null,
        label: null,
        children: null,
        onChange: null,
        toggleButton: false,
        checked: undefined,
        defaultChecked: undefined,
        disabled: false,
        tooltip: null,
        dangerouslySetLabel: null,
        stopPropagation: false
    };

    constructor() {
        super();
        this.id = Math.random();
    }

    componentDidMount() {
        const { tooltip } = this.props;

        if(tooltip) {
            this._container.setAttribute('tooltip', tooltip);
            window.chayns.ui.tooltip.init(null, this._container.parentNode);
        }
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
            stopPropagation
        } = this.props;

        return(
            <div
                style={style}
                className={classNames}
                ref={(ref) => { this._container = ref; }}
            >
                <input
                    type="checkbox"
                    className="checkbox"
                    ref={(ref) => { this._node = ref; }}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
                    onChange={this.onChange}
                    id={this.id}
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                />
                <label
                    htmlFor={this.id}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
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
        } = this.props;

        return(
            <div
                style={style}
                className={classNames}
                ref={(ref) => { this._container = ref; }}
            >
                <input
                    type="checkbox"
                    className="switch"
                    ref={(ref) => { this._node = ref; }}
                    onChange={this.onChange}
                    id={this.id}
                    disabled={disabled}
                    checked={checked}
                    defaultChecked={defaultChecked}
                />
                <label
                    htmlFor={this.id}
                    style={label ? { marginRight: '10px' } : null}
                />
                {children || label || ''}
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
