import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends React.Component {
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
        onBlur: PropTypes.func,
        responsive: PropTypes.bool,
        regExp: PropTypes.string,
        inputRef: PropTypes.func,
        type: PropTypes.string,
        invalid: PropTypes.bool,
    };

    static defaultProps = {
        style: {},
        responsive: false,
        className: null,
        value: undefined,
        defaultValue: undefined,
        placeholder: null,
        onKeyUp: null,
        onChange: null,
        onBlur: null,
        regExp: null,
        inputRef: null,
        type: 'text',
        invalid: false,
    };

    constructor(props) {
        super();

        const { defaultValue, value, regExp } = props;

        const testValue = value || defaultValue;

        this.state = {
            isValid: regExp && (testValue ? testValue.match(new RegExp(regExp)) : true)
        };
    }

    onBlur = () => this.handleEvent(this.props.onBlur, true);

    /**
     * @deprecated
     */
    onKeyUp = () => this.handleEvent(this.props.onKeyUp);

    onChange = () => this.handleEvent(this.props.onChange);

    handleEvent = (callback, doInvalidate = false) => {
        const isValid = this.validateInput(doInvalidate);

        if (callback) {
            if (isValid) {
                callback(this._node.value);
            } else {
                callback(null);
            }
        }
    };

    validateInput(doInvalidate = true) {
        const { regExp } = this.props;
        const isValid = !regExp || (regExp && this._node.value.match(new RegExp(regExp)));

        if (isValid || doInvalidate) {
            this.setState({
                isValid
            });
        }

        return isValid;
    }

    render() {
        const {
            type,
            value,
            defaultValue,
            placeholder,
            className,
            style,
            responsive,
            regExp,
            inputRef,
            onChange,
            onBlur,
            onKeyUp,
            invalid,
            ...other
        } = this.props;
        const { isValid } = this.state;

        const classNames = classnames({
            'input-group': responsive,
            input: !responsive,
            [className]: className
        });

        const inputStyles = (invalid || (regExp && !isValid)) ? {
            color: '#d23f31',
            fontWeight: '700'
        } : null;

        const responsiveInput = () => (
            <div
                className={classNames}
                style={style}
            >
                <input
                    style={inputStyles}
                    ref={(ref) => {
                        if(inputRef) inputRef(ref);
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
                    {...other}
                />
                <label>{placeholder}</label>
            </div>
        );

        const input = () => (
            <input
                className={classNames}
                ref={(ref) => {
                    if(inputRef) inputRef(ref);
                    this._node = ref;
                }}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                style={{
                    ...style,
                    ...inputStyles
                }}
                onKeyUp={this.onKeyUp}
                onChange={this.onChange}
                onBlur={this.onBlur}
                type={type || 'text'}
                required
                {...other}
            />
        );

        return (responsive ? responsiveInput() : input());
    }
}
