import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../react-chayns-input/component/Input';
import Formatter from './utils/Formatter';

export default class FormattedInput extends Component {
    static propTypes = {};

    handleChange = (value, ...args) => {
        const { formatter, onChange } = this.props;

        if (!(formatter instanceof Formatter)) {
            return;
        }

        const parsedValue = formatter.parse(value);

        if (onChange) {
            onChange(parsedValue.value, ...args);
        }
    };

    render() {
        const { value, formatter, ...props } = this.props;

        if (!(formatter instanceof Formatter)) {
            return null;
        }

        return (
            <Input
                {...props}
                value={formatter.format(value).value}
                onChange={this.handleChange}
            />
        );
    }
}
