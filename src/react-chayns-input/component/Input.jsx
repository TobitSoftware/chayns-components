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
        wrapperRef: PropTypes.func,
        dynamic: PropTypes.bool,
        customProps: PropTypes.object,
        id: PropTypes.string,
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
        wrapperRef: null,
        dynamic: false,
        customProps: null,
        id: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            valid: !props.invalid && (!props.regExp || !props.value || props.value.match(props.regExp)),
        };

        this.id = Math.random().toString();

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callValidated = this.callValidated.bind(this);
    }

    componentWillReceiveProps({ value }) {
        if (value && value !== this.props.value) {
            this.callValidated(value);
        }
    }

    onKeyUp(e) {
        const { onKeyUp, onEnter } = this.props;
        if (onKeyUp) {
            onKeyUp(e);
        }
        if (e.keyCode === 13) {
            this.callValidated(e.target.value, onEnter);
        }
    }

    onBlur(e) {
        const { onBlur } = this.props;
        this.callValidated(e.target.value, onBlur);
    }

    onChange(e) {
        const { onChange } = this.props;
        this.callValidated(e.target.value, onChange);
    }

    callValidated(value, callback) {
        const { regExp } = this.props;
        const valid = !(regExp && !value.match(regExp));

        if (callback) {
            callback(value, valid);
        }
        this.setState({ valid });
    }

    render() {
        const {
            className,
            defaultValue,
            value,
            style,
            placeholder,
            type,
            inputRef,
            dynamic,
            icon,
            wrapperRef,
            customProps,
            invalid,
            onIconClick,
            id,
        } = this.props;
        const { valid } = this.state;

        if (dynamic) {
            return (
                <div
                    className={classNames('input-group', className, { labelRight: (this.ref && this.ref.value) || (!this.ref && (value || defaultValue)) })}
                    ref={wrapperRef}
                >
                    <input
                        style={{ ...style, ...(icon ? { paddingRight: '30px' } : null) }}
                        ref={(ref) => {
                            if (inputRef) {
                                inputRef(ref);
                            }
                            this.ref = ref;
                        }}
                        className={classNames('input', className, { 'input--invalid': !valid || invalid })}
                        value={value}
                        defaultValue={defaultValue}
                        onKeyUp={this.onKeyUp}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        type={type || 'text'}
                        id={id || this.id}
                        required
                        {...customProps}
                    />
                    <label
                        htmlFor={id || this.id}
                        className={classNames({
                            'input--invalid': !valid || invalid,
                            labelIcon: icon
                        })}
                    >
                        {placeholder}
                    </label>
                    {
                        icon
                            ? (
                                <Icon
                                    icon={icon}
                                    className="input-group__icon"
                                    style={icon ? {
                                        opacity: '.3',
                                        pointerEvents: 'all'
                                    } : { opacity: '0' }}
                                    onClick={onIconClick}
                                />
                            )
                            : null
                    }
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
                id={id || this.id}
                {...customProps}
            />
        );
    }
}
