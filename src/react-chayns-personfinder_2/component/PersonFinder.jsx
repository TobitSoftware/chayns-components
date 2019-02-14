import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import Input from '../../react-chayns-input/component/Input';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import PersonFinderResults from '../../react-chayns-personfinder/component/PersonFinderResults';

export default class PersonFinder extends Component {
    static propTypes = {};

    state = {
        value: '',
    };

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        this.setState({
            value,
        });
    }

    handleSelect(value) {
        console.log(value);
    }

    render() {
        const { value } = this.state;

        return (
            <div>
                <InputBox
                    inputComponent={Input}
                    value={value}
                    onChange={this.handleOnChange}
                >
                    <PersonFinderResults
                        value={value}
                        onSelect={this.handleSelect}
                        person
                        site
                    />
                </InputBox>
            </div>
        );
    }
}
