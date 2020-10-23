/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import { isNullOrWhiteSpace, isString } from '../../utils/is';

/**
 * A text input that can be validated and decorated with different designs.
 */
export default class Input extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            valid:
                (!props.regExp ||
                    !props.value ||
                    props.value.match(props.regExp)) &&
                !(props.value === '' && props.required),
            initial: true,
            right: false,
            value: props.value || props.defaultValue || '',
        };

        this.id = Math.random().toString();

        this.setRef = this.setRef.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callValidated = this.callValidated.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
    }

    componentDidUpdate({ regExp: oldRegExp, value: oldValue }) {
        const { regExp, onChange, value } = this.props;

        if (String(oldRegExp) !== String(regExp) && this.ref) {
            this.callValidated(this.ref.value, onChange);
        }
        if (value !== oldValue) {
            this.callValidated(value);
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
        this.setState({ value: e.target.value });
        this.callValidated(e.target.value, onChange, e);
    }

    onIconClick(e) {
        const { right, initial } = this.state;
        const { onIconClick, clearIcon, value, defaultValue } = this.props;
        if (
            clearIcon &&
            (right ||
                !isNullOrWhiteSpace(value) ||
                (initial && !isNullOrWhiteSpace(defaultValue)))
        ) {
            this.onChange({ target: { value: '' } });
            e.stopPropagation();
            this.ref.value = '';
        } else if (onIconClick) {
            onIconClick(e);
            e.stopPropagation();
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

        const valid =
            !(required && !value) && !(regExp && !value.match(regExp));

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
            icon: iconProp,
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
            clearIcon,
            required,
            invalidMessage,
            right: rightProp,
        } = this.props;
        const { valid, right, initial, value: stateValue } = this.state;

        const icon =
            clearIcon &&
            (right ||
                !isNullOrWhiteSpace(value) ||
                (initial && !isNullOrWhiteSpace(defaultValue)))
                ? 'fa fa-times'
                : iconProp;

        if (design === Input.BORDER_DESIGN) {
            return (
                <div
                    className={classNames('input--border-design', className, {
                        'input--label-right':
                            right ||
                            !isNullOrWhiteSpace(value) ||
                            (initial && !isNullOrWhiteSpace(defaultValue)),
                        'input--disabled': disabled,
                        'input--dynamic':
                            dynamic && dynamic !== Input.BOTTOM_DYNAMIC,
                        'input--bottom-dynamic':
                            dynamic === Input.BOTTOM_DYNAMIC,
                        'input--border-design--invalid': !valid || invalid,
                        'input--border-design--required': required,
                        'input--border_has-icon': icon,
                        'input--border_has-right': rightProp,
                    })}
                    onClick={() => {
                        this.ref.focus();
                    }}
                    style={style}
                >
                    {iconLeft && (
                        <Icon icon={iconLeft} className="input__icon-left" />
                    )}
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
                            onClick={
                                stopPropagation
                                    ? (event) => event.stopPropagation()
                                    : null
                            }
                            disabled={disabled}
                            {...customProps}
                        />
                        {placeholder && (
                            <label htmlFor={id || this.id}>
                                <div className="space">
                                    {isString(value) ? value : stateValue}
                                </div>
                                <div className="ellipsis">
                                    {(invalid || !valid) &&
                                    invalidMessage &&
                                    (value || stateValue || defaultValue)
                                        ? invalidMessage
                                        : placeholder}
                                </div>
                            </label>
                        )}
                    </div>
                    {rightProp}
                    {icon && (
                        <Button onClick={this.onIconClick}>
                            <Icon
                                icon={icon}
                                style={
                                    (onIconClick || clearIcon) && !disabled
                                        ? {
                                              pointerEvents: 'all',
                                          }
                                        : null
                                }
                                className="input__icon-right"
                            />
                        </Button>
                    )}
                </div>
            );
        }

        if (dynamic) {
            return (
                <div
                    className={classNames('input-group', className, {
                        labelRight:
                            right ||
                            !isNullOrWhiteSpace(value) ||
                            (initial && !isNullOrWhiteSpace(defaultValue)),
                        'input-group--disabled': disabled,
                    })}
                    ref={wrapperRef}
                >
                    <input
                        style={{
                            width: '100%',
                            paddingRight: icon ? '30px' : null,
                            ...style,
                        }}
                        ref={this.setRef}
                        className={classNames('input', className, {
                            'input--invalid': !valid || invalid,
                        })}
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
                        onClick={
                            stopPropagation
                                ? (event) => event.stopPropagation()
                                : null
                        }
                        disabled={disabled}
                        {...customProps}
                    />
                    {placeholder && (
                        <label
                            htmlFor={id || this.id}
                            className={classNames({
                                'input--invalid': !valid || invalid,
                                labelIcon: icon,
                            })}
                        >
                            <div className="space">
                                {isString(value) ? value : stateValue}
                            </div>
                            <div className="ellipsis">{placeholder}</div>
                        </label>
                    )}
                    {icon ? (
                        <Icon
                            icon={icon}
                            className="input-group__icon"
                            style={
                                icon
                                    ? {
                                          opacity: '.3',
                                          pointerEvents: 'all',
                                      }
                                    : { opacity: '0' }
                            }
                            onClick={this.onIconClick}
                        />
                    ) : null}
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
                onClick={
                    stopPropagation ? (event) => event.stopPropagation() : null
                }
                required
                disabled={disabled}
                {...customProps}
            />
        );
    }
}

Input.DEFAULT_DESIGN = 0;
Input.BORDER_DESIGN = 1;

Input.MOVING_DYNAMIC = true;
Input.NO_DYNAMIC = false;
Input.BOTTOM_DYNAMIC = 2;

Input.propTypes = {
    /**
     * A classname string that will be applied to the `<input>`-element
     */
    className: PropTypes.string,

    /**
     * A callback for the `keyup`-event on the input.
     */
    onKeyUp: PropTypes.func,

    /**
     * A callback for the `keyup`-event on the input.
     */
    onKeyDown: PropTypes.func,

    /**
     * A callback for when the users presses the Enter-key while the input
     * is focused.
     */
    onEnter: PropTypes.func,

    /**
     * Called when the inputs content was changed. If the `regExp`-prop is set,
     * this callback receives a second argument indicating wether the input is
     * valid or not.
     */
    onChange: PropTypes.func,

    /**
     * A callback for the `blur`-event on the input.
     */
    onBlur: PropTypes.func,

    /**
     * A callback for the `focus`-event on the input.
     */
    onFocus: PropTypes.func,

    /**
     * A regular expression that will check if the input is valid. If the input
     * is not valid, this component will show it to the user.
     */
    regExp: PropTypes.instanceOf(RegExp),

    /**
     * A React style object that is applied to the `<input>`-element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * An animated placeholder that is shown when the input is empty.
     */
    placeholder: PropTypes.string,

    /**
     * The current value of the input field.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The initial value of the input field. Has no effect when using the
     * `value`-prop.
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Wether the input should be marked as invalid.
     */
    invalid: PropTypes.bool,

    /**
     * The input type that is set on the `<input>`-element (e.g. `text`,
     * `password`, etc.)
     */
    type: PropTypes.string,

    /**
     * A funtion that receives the reference to the `<input>`-element.
     */
    inputRef: PropTypes.func,

    /**
     * An icon that will be shown on the right side of the input. Only applies
     * when `dynamic` is `true` or the border-design is active.
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * The `onClick`-callback for the `icon`.
     */
    onIconClick: PropTypes.func,

    /**
     * A function that will receive the reference to the wrapper element. This
     * only has an effect if `dynamic` is `true`.
     */
    wrapperRef: PropTypes.func,

    /**
     * When active the placeholder will not disappear on input but rather slide
     * to the right of the input field to act more like a label.
     */
    dynamic: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

    /**
     * Any additional props that will be forwarded to the `<input>`-element.
     */
    customProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    /**
     * A HTML id that will be applied to the `<input>`-element.
     */
    id: PropTypes.string,

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Wether to mark an empty input as invalid.
     */
    required: PropTypes.bool,

    /**
     * Disables any user interaction with the input and renders it with a
     * disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * Wether to show a clear icon on the right side of the input when it is not
     * empty.
     */
    clearIcon: PropTypes.bool,

    /**
     * The design of the input. Use either `Input.DEFAULT_DESIGN` or
     * `Input.BORDER_DESIGN`.
     */
    design: PropTypes.number,

    /**
     * An icon that will be shown on the left side of the input when the
     * border-design is active.
     */
    iconLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * A string or `ReactNode` that will be rendered on the right side of the
     * input when the border-design is active.
     */
    right: PropTypes.node,
    invalidMessage: PropTypes.string,
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
    clearIcon: false,
    design: Input.DEFAULT_DESIGN,
    iconLeft: null,
    right: null,
    invalidMessage: null,
};

Input.displayName = 'Input';
