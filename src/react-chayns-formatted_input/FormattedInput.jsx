import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../react-chayns-input/component/Input';
import Formatter from './utils/Formatter';

export default class FormattedInput extends Component {
    static propTypes = {
        initialFormatter: PropTypes.instanceOf(Formatter).isRequired,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any, /* eslint-disable-line react/forbid-prop-types */
    };

    static defaultProps = {
        onChange: null,
        defaultValue: null,
    };

    constructor(props) {
        super(props);

        this.formatter = props.initialFormatter;

        this.state = {
            value: this.formatter.format(props.defaultValue) || '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        if (this.selection && this.input) {
            this.input.setSelectionRange(this.selection.start, this.selection.start);
        }

        this.selection = null;
    }

    handleInputChange = (value, ...args) => {
        const { formatter } = this;
        const { value: oldValue } = this.state;

        if (!(formatter instanceof Formatter)) {
            return;
        }

        const { selectionStart, selectionEnd } = this.input;
        const selection = {
            start: selectionStart,
            end: selectionEnd,
        };
        const validationInfo = formatter.validate(value, selection);
        const newValue = validationInfo.valid ? value : oldValue;

        if (!validationInfo.valid) {
            this.selection = validationInfo.selection || null;
        }

        this.setState({
            value: newValue,
        });

        if (validationInfo.valid) {
            const parsedValue = formatter.parse(newValue);
            this.handleChangeEvent(parsedValue, ...args);
        }
    };

    handleChangeEvent = (value, ...args) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(value, ...args);
        }
    };

    handleChange = (value, ...args) => {
        const { formatter } = this;

        if (!(formatter instanceof Formatter)) {
            return;
        }

        const parsedValue = formatter.parse(value);

        this.setState({
            value: formatter.format(parsedValue),
        });

        this.handleChangeEvent(parsedValue, ...args);
    };

    render() {
        const { value } = this.state;
        const {
            defaultValue,
            initialFormatter,
            ...props
        } = this.props;

        if (!(initialFormatter instanceof Formatter)) {
            return null;
        }

        return (
            <Input
                {...props}
                inputRef={(ref) => { this.input = ref; }}
                value={value}
                onChange={this.handleInputChange}
                onBlur={this.handleChange}
            />
        );
    }
}
