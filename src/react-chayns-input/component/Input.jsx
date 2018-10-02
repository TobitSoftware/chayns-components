import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


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
        value: null,
        defaultValue: '',
        invalid: false,
        type: 'text',
    };

    constructor(props) {
        super(props);

        const value = (props.value) ? props.value : props.defaultValue;
        this.state = { valid: !props.invalid && (!props.regExp || value.match(props.regExp)) };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callIfValid = this.callIfValid.bind(this);
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
    }

    callIfValid(value, callback) {
        const { regExp, invalid } = this.props;
        const valid = !invalid && (!regExp || value.match(regExp));

        if (valid && callback) {
            callback(value);
        }
        this.setState({ valid });
    }

    render() {
        const {
            className, defaultValue, value, style, placeholder, type,
        } = this.props;
        const { valid } = this.state;

        return (
            <input
                className={classNames('input', className, { 'input--invalid': !valid })}
                style={style}
                placeholder={placeholder}
                onKeyUp={this.onKeyUp}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={value}
                defaultValue={defaultValue}
                type={type}
            />
        );
    }
}
