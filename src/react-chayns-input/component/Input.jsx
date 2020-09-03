/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';
import { isNullOrWhiteSpace } from '../../utils/is';

export default class Input extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            valid: (!props.regExp || !props.value || props.value.match(props.regExp))
                && !(isNullOrWhiteSpace(props.value) && isNullOrWhiteSpace(props.defaultValue) && props.required),
            initial: true,
            right: false,
            placeholderWidth: 0,
        };

        this.id = Math.random()
            .toString();

        this.setRef = this.setRef.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callValidated = this.callValidated.bind(this);
    }

    componentDidMount() {
        this.setPlaceholderWidth();
    }

    componentDidUpdate({ regExp: oldRegExp, value: oldValue, placeholder: oldPlaceholder }) {
        const { regExp, onChange, value, placeholder } = this.props;

        if (String(oldRegExp) !== String(regExp) && this.ref) {
            this.callValidated(this.ref.value, onChange);
        }
        if (value !== oldValue) {
            this.callValidated(value);
        }
        if (placeholder !== oldPlaceholder) {
            this.setPlaceholderWidth();
        }
    }

    onKeyUp(e) {
        const { onKeyUp, onEnter } = this.props;
        if (onKeyUp) {
            onKeyUp(e);
        }
        if (e.keyCode === 13) {
            this.callValidated(e.target.value, onEnter, e);
        }
    }

    onBlur(e) {
        const { onBlur } = this.props;
        this.callValidated(e.target.value, onBlur, e);
    }

    onChange(e) {
        const { onChange } = this.props;
        this.callValidated(e.target.value, onChange, e);
    }

    setPlaceholderWidth() {
        const { placeholder } = this.props;
        if (placeholder && this.placeholderRef) {
            setTimeout(() => {
                this.setState({ placeholderWidth: this.placeholderRef.offsetWidth + 10 }); // 10px gap between placeholder and text
            }, 100);
        } else {
            this.setState({ placeholderWidth: 0 });
        }
    }

    setRef(ref) {
        const { inputRef } = this.props;

        if (inputRef) {
            inputRef(ref);
        }

        this.ref = ref;
    }

    callValidated(value, callback, event) {
        const { regExp, required } = this.props;

        const valid = !(required && !value) && !(regExp && !value.match(regExp));

        if (callback) {
            callback(value, valid, event);
        }

        this.setState({
            valid,
            initial: false,
            right: !isNullOrWhiteSpace(value),
        });
    }

    render() {
        const {
            className,
            defaultValue,
            value,
            style,
            placeholder,
            type,
            dynamic,
            icon,
            iconLeft,
            wrapperRef,
            invalid,
            onIconClick,
            onKeyDown,
            id,
            onFocus,
            stopPropagation,
            customProps,
            disabled,
            design,
        } = this.props;
        const { valid, right, initial, placeholderWidth } = this.state;

        if (design === Input.BORDER_DESIGN) {
            return (
                <div
                    className={classNames('input--border-design', className, {
                        'input--label-right': right || !isNullOrWhiteSpace(value) || (initial && !isNullOrWhiteSpace(defaultValue)),
                        'input--disabled': disabled,
                        'input--dynamic': dynamic,
                        'input--border-design--invalid': !valid || invalid,
                    })}
                    onClick={() => {
                        this.ref.focus();
                    }}
                    style={style}
                >
                    {iconLeft && <Icon icon={iconLeft} className="input__icon-left"/>}
                    <div className="input__input-wrapper">
                        <input
                            ref={this.setRef}
                            value={value}
                            defaultValue={defaultValue}
                            onKeyUp={this.onKeyUp}
                            onKeyDown={onKeyDown}
                            onBlur={this.onBlur}
                            onChange={this.onChange}
                            onFocus={onFocus}
                            type={type || 'text'}
                            id={id || this.id}
                            required
                            onClick={stopPropagation ? (event) => event.stopPropagation() : null}
                            disabled={disabled}
                            style={{
                                paddingRight: `${placeholderWidth}px`,
                            }}
                            {...customProps}
                        />
                        {placeholder
                        && (
                            <label
                                htmlFor={id || this.id}
                            >
                                <div
                                    className="ellipsis"
                                    ref={(ref) => {
                                        this.placeholderRef = ref;
                                    }}
                                >
                                    {placeholder}
                                </div>
                            </label>
                        )}
                    </div>
                    {icon && (
                        <Icon
                            icon={icon}
                            style={onIconClick && !disabled ? {
                                pointerEvents: 'all',
                            } : null}
                            className={'input__icon-right'}
                            onClick={onIconClick ? (e) => {
                                onIconClick(e);
                                e.stopPropagation();
                            } : null}
                        />
                    )}
                </div>
            );
        }

        if (dynamic) {
            return (
                <div
                    className={classNames('input-group', className, {
                        labelRight: right || !isNullOrWhiteSpace(value) || (initial && !isNullOrWhiteSpace(defaultValue)),
                        'input-group--disabled': disabled,
                    })}
                    ref={wrapperRef}
                >
                    <input
                        style={{
                            width: '100%',
                            paddingRight: (icon ? '30px' : `${placeholderWidth}px`),
                            ...style,
                        }}
                        ref={this.setRef}
                        className={classNames('input', className, { 'input--invalid': !valid || invalid })}
                        value={value}
                        defaultValue={defaultValue}
                        onKeyUp={this.onKeyUp}
                        onKeyDown={onKeyDown}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onFocus={onFocus}
                        type={type || 'text'}
                        id={id || this.id}
                        required
                        onClick={stopPropagation ? (event) => event.stopPropagation() : null}
                        disabled={disabled}
                        {...customProps}
                    />
                    <label
                        htmlFor={id || this.id}
                        className={classNames({
                            'input--invalid': (!valid || invalid),
                            labelIcon: icon,
                        })}
                    >
                        <span
                            ref={(ref) => {
                                this.placeholderRef = ref;
                            }}
                        >
                            {placeholder}
                        </span>
                    </label>
                    {
                        icon
                            ? (
                                <Icon
                                    icon={icon}
                                    className="input-group__icon"
                                    style={icon ? {
                                        opacity: '.3',
                                        pointerEvents: 'all',
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
                className={classNames('input', className, {
                    'input--invalid': !valid || invalid,
                    'input--disabled': disabled,
                })}
                style={{ ...{ width: '100%' }, ...style }}
                placeholder={placeholder}
                onKeyUp={this.onKeyUp}
                onKeyDown={onKeyDown}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={onFocus}
                value={value}
                defaultValue={defaultValue}
                type={type}
                ref={this.setRef}
                id={id || this.id}
                onClick={stopPropagation ? (event) => event.stopPropagation() : null}
                required
                disabled={disabled}
                {...customProps}
            />
        );
    }
}

Input.DEFAULT_DESIGN = 0;
Input.BORDER_DESIGN = 1;

Input.propTypes = {
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onEnter: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    regExp: PropTypes.instanceOf(RegExp),
    style: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    invalid: PropTypes.bool,
    type: PropTypes.string,
    inputRef: PropTypes.func,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onIconClick: PropTypes.func,
    wrapperRef: PropTypes.func,
    dynamic: PropTypes.bool,
    customProps: PropTypes.object,
    id: PropTypes.string,
    stopPropagation: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    design: PropTypes.number,
    iconLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Input.defaultProps = {
    className: '',
    onKeyUp: null,
    onKeyDown: null,
    onEnter: null,
    onChange: null,
    onBlur: null,
    onFocus: null,
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
    stopPropagation: false,
    required: false,
    disabled: false,
    design: Input.DEFAULT_DESIGN,
    iconLeft: null,
};

Input.displayName = 'Input';
