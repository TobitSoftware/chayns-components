import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Checkbox extends React.Component {
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
        dangerouslySetLabel: PropTypes.object
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
        dangerouslySetLabel: null
    };

    constructor() {
        super();
        this.id = Math.random();
    }

    componentDidMount() {
        const { tooltip } = this.props;

        if(tooltip) {
            this._container.setAttribute('tooltip', tooltip);
        }
    }

    onChange = () => {
        const { onChange, disabled } = this.props;

        if (!disabled && onChange) {
            onChange(this._node.checked);
        }
    };

    render() {
        const {
            className,
            style,
            disabled,
            children,
            label,
            checked,
            defaultChecked,
            dangerouslySetLabel,
        } = this.props;
        const classNames = classnames({
            [className]: className
        });

        const checkbox = () => {
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
                        onChange={this.onChange}
                        id={this.id}
                        disabled={disabled}
                        checked={checked}
                        defaultChecked={defaultChecked}
                    />
                    <label
                        htmlFor={this.id}
                        dangerouslySetInnerHTML={dangerouslySetLabel}
                    >
                        {!dangerouslySetLabel ? (children || label || '') : null}
                    </label>
                </div>
            );
        };

        const toggleButton = () => {
            return (
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
                        disabled={disabled}
                        id={this.id}
                    />
                    <label
                        htmlFor={this.id}
                        style={label ? { marginRight: '10px' } : null}
                    />
                    {children || label || ''}
                </div>
            );
        };

        return this.props.toggleButton ? toggleButton() : checkbox();
    }
}
