import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class Input extends Component {
    static propTypes = {
        className: PropTypes.string,
        onKeyUp: PropTypes.func,
        onEnter: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        regExp: PropTypes.instanceOf(RegExp),
        style: PropTypes.object,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        invalid: PropTypes.bool,
        type: PropTypes.string,
        inputRef: PropTypes.func,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onIconClick: PropTypes.func,
        noDeleteIcon: PropTypes.bool,
        wrapperRef: PropTypes.func,
        dynamic: PropTypes.bool,
        customProps: PropTypes.object,
    };

    static defaultProps = {
        className: '',
        onKeyUp: null,
        onEnter: null,
        onChange: null,
        onBlur: null,
        regExp: null,
        style: {},
        placeholder: '',
        value: undefined,
        defaultValue: undefined,
        invalid: false,
        type: 'text',
        inputRef: null,
        icon: null,
        onIconClick: null,
        noDeleteIcon: false,
        wrapperRef: null,
        dynamic: false,
        customProps: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            valid: !props.invalid && (!props.regExp || !props.value || props.value.match(props.regExp)),
            showIcon: !!props.defaultValue,
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callIfValid = this.callIfValid.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
    }

    onIconClick(e) {
        const { onIconClick, onChange } = this.props;
        const { showIcon } = this.state;

        if (onIconClick) {
            onIconClick(e);
        } else if (showIcon) {
            this._node.value = '';
            this.setState({ showIcon: false });
            if(onChange) {
                onChange('');
            }
        }
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

    callIfValid(value, callback) {
        const { regExp } = this.props;
        const valid = (!regExp || value.match(regExp));

        if (valid && callback) {
            callback(value);
        }
        this.setState({ valid });
    }

    render() {
        const {
            className, defaultValue, value, style, placeholder, type, inputRef, dynamic, icon, noDeleteIcon, wrapperRef, customProps, invalid
        } = this.props;
        const { valid, showIcon } = this.state;
        if (dynamic) {
            return (
                <div
                    className={`input-group ${className}`}
                    ref={wrapperRef}
                >
                    <input
                        style={style}
                        ref={(ref) => {
                            if (inputRef) inputRef(ref);
                            this._node = ref;
                        }}
                        className={classNames('input', className, { 'input--invalid': !valid || invalid })}
                        value={value}
                        defaultValue={defaultValue}
                        onKeyUp={this.onKeyUp}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        type={type || 'text'}
                        required
                        {...customProps}
                    />
                    <label
                        style={{ opacity: !showIcon ? '1' : '0' }}
                        className={classNames({ 'input--invalid': !valid || invalid, labelIcon: icon || showIcon })}
                    >
                        {placeholder}
                    </label>
                    <Icon
                        icon={(icon && (noDeleteIcon || !showIcon)) ? icon : 'ts-wrong'}
                        className="input-group__icon"
                        style={(showIcon && !noDeleteIcon) || icon ? {
                            opacity: '.3',
                            pointerEvents: 'all'
                        } : { opacity: '0' }}
                        onClick={this.onIconClick}
                    />
                </div>
            );
        }
        return (
            <input
                className={classNames('input', className, { 'input--invalid': !valid || invalid })}
                style={style}
                placeholder={placeholder}
                onKeyUp={this.onKeyUp}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={value}
                defaultValue={defaultValue}
                type={type}
                ref={inputRef}
                {...customProps}
            />
        );
    }
}
