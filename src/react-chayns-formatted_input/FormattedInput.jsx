import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../react-chayns-input/component/Input';

export default class FormattedInput extends Component {
    static propTypes = {};

    render() {
        const { ...props } = this.props;

        return (
            <Input
                {...props}
            />
        );
    }
}
