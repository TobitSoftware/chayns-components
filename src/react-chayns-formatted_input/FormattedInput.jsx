import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import Input from '../react-chayns-input/component/Input';
import Formatter from './utils/Formatter';

export default class FormattedInput extends Component {
    static propTypes = {
        initialFormatter: PropTypes.instanceOf(Formatter).isRequired,
        debounce: PropTypes.number,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any, /* eslint-disable-line react/forbid-prop-types */
    };

    static defaultProps = {
        debounce: 2000,
        onChange: null,
        defaultValue: null,
    };

    constructor(props) {
        super(props);

        this.formatter = props.initialFormatter;

        this.state = {
            value: this.formatter.format(props.defaultValue) || '',
        };

        this.handleChange = debounce(this.handleChange.bind(this), props.debounce);
    }

    handleInputChange = (value, ...args) => {
        const { formatter } = this;
        const { value: oldValue } = this.state;

        if (!(formatter instanceof Formatter)) {
            return;
        }

        const newValue = formatter.validate(value) ? value : oldValue;

        this.setState({
            value: newValue,
        });

        this.handleChange(newValue, ...args);
    };

    handleChange = (value, ...args) => {
        const { onChange } = this.props;
        const { formatter } = this;

        if (!(formatter instanceof Formatter)) {
            return;
        }

        const parsedValue = formatter.parse(value);

        this.setState({
            value: formatter.format(parsedValue),
        });

        if (onChange) {
            onChange(parsedValue, ...args);
        }
    };

    render() {
        const { value } = this.state;
        const {
            defaultValue,
            debounce: debounceProp,
            initialFormatter,
            ...props
        } = this.props;

        if (!(initialFormatter instanceof Formatter)) {
            return null;
        }

        return (
            <Input
                {...props}
                value={value}
                onChange={this.handleInputChange}
            />
        );
    }
}
