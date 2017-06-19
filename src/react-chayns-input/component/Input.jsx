import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        staticValue: PropTypes.oneOfType([
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
        regExp: PropTypes.string
    };

    static defaultProps = {
        style: {},
        responsive: false
    };

    constructor(props) {
        super();

        const { defaultValue, staticValue, regExp } = props;

        const value = staticValue || defaultValue;

        this.state = {
            isValid: regExp && (value ? value.match(new RegExp(regExp)) : true)
        };
    }

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

    handleEvent = (callback, doInvalidate = false) => {
        const { regExp } = this.props;

        const isValid = this.validateInput(doInvalidate);

        if (callback) {
            if (isValid) {
                callback(this._node.value);
            } else {
                callback(null);
            }
        }
    };

    onBlur = () => this.handleEvent(this.props.onBlur, true);

    /**
     * @deprecated
     */
    onKeyUp = () => this.handleEvent(this.props.onKeyUp);

    onInput = () => this.handleEvent(this.props.onChange);

    render() {
        const { staticValue, defaultValue, placeholder, className, style, responsive, regExp } = this.props;
        const { isValid } = this.state;

        const classNames = classnames({
            'input-group': responsive,
            'input': !responsive,
            [className]: className
        });

        const inputStyles = regExp && !isValid ? {
            color: '#d23f31',
            fontWeight: '700'
        } : null;

        const responsiveInput = () => (
            <div
                className={classNames}
                style={style}
            >
                <input
                    style={{
                        ...inputStyles,
                        width: '100%',
                        marginBottom: '5px'
                    }}
                    ref={(ref) => {
                        this._node = ref
                    }}
                    value={staticValue}
                    defaultValue={defaultValue}
                    onKeyUp={this.onKeyUp}
                    onInput={this.onInput}
                    onBlur={this.onBlur}
                    className="input"
                    type="text"
                    required
                />
                <label>{placeholder}</label>
            </div>
        );

        const input = () => (
            <input
                className={classNames}
                ref={(ref) => {
                    this._node = ref
                }}
                value={staticValue}
                defaultValue={defaultValue}
                placeholder={placeholder}
                style={{
                    ...style,
                    ...inputStyles
                }}
                onKeyUp={this.onKeyUp}
                onInput={this.onInput}
                onBlur={this.onBlur}
                type="text"
                required
            />
        );

        return (responsive ? responsiveInput() : input());
    }
};
