/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class DynamicInput extends Component {
    static propTypes = {
        style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        className: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onKeyUp: PropTypes.func,
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
        onBlur: PropTypes.func,
        regExp: PropTypes.string,
        inputRef: PropTypes.func,
        type: PropTypes.string,
        invalid: PropTypes.bool,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onIconClick: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        className: null,
        value: undefined,
        defaultValue: undefined,
        placeholder: null,
        onKeyUp: null,
        onEnter: null,
        onChange: null,
        onBlur: null,
        regExp: null,
        inputRef: null,
        type: 'text',
        invalid: false,
        icon: null,
        onIconClick: null,
    };

    constructor(props) {
        super();

        const { value, regExp } = props;

        const testValue = value;

        this.state = {
            isValid: !regExp || !testValue || testValue.match(new RegExp(regExp)),
            showIcon: false,
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callIfValid = this.callIfValid.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
    }

    onKeyUp(e) {
        const { onKeyUp, onEnter } = this.props;
        if (onKeyUp) {
            onKeyUp(e);
        }
        if (e.keyCode === 13) {
            this.callIfValid(e.target.value, onEnter);
        }
    }

    onBlur(e) {
        const { onBlur } = this.props;
        this.callIfValid(e.target.value, onBlur);
    }

    onChange(e) {
        const { onChange } = this.props;
        this.callIfValid(e.target.value, onChange);
        this.setState({ showIcon: e.target.value.length > 0 });
    }

    onIconClick(e) {
        const { onIconClick } = this.props;
        const { showIcon } = this.state;
        if (onIconClick) {
            onIconClick(e);
        } else if (showIcon) {
            this._node.value = '';
            this.setState({ showIcon: false });
        }
    }

    callIfValid(value, callback) {
        const { regExp, invalid } = this.props;
        const isValid = !invalid && (!regExp || value.match(regExp));

        if (isValid && callback) {
            callback(value);
        }
        this.setState({ isValid });
    }

    render() {
        const {
            type,
            value,
            defaultValue,
            placeholder,
            className,
            style,
            regExp,
            inputRef,
            invalid,
            icon,
        } = this.props;
        const { isValid, showIcon } = this.state;

        const classNames = classnames('input-group', {
            [className]: className
        });

        const inputStyles = (invalid || (regExp && !isValid)) ? {
            color: '#d23f31',
            fontWeight: '700'
        } : null;

        return (
            <div
                className={classNames}
                style={style}
            >
                <input
                    style={inputStyles}
                    ref={(ref) => {
                        if (inputRef) inputRef(ref);
                        this._node = ref;
                    }}
                    value={value}
                    defaultValue={defaultValue}
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    className="input"
                    type={type || 'text'}
                    required
                />
                <label
                    style={{ opacity: !showIcon ? '1' : '0' }}
                    className={icon || showIcon ? 'labelIcon' : null}
                >
                    {placeholder}
                </label>
                <Icon
                    icon={icon || 'ts-wrong'}
                    className="input-group__icon"
                    style={showIcon || icon ? { opacity: '.3', pointerEvents: 'all' } : { opacity: '0' }}
                    onClick={this.onIconClick}
                />
            </div>
        );
    }
}
