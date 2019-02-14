import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../react-chayns-input/component/Input';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import PersonFinderResults from './PersonFinderResults';
import { PERSON_RELATION, SITE_RELATION } from '../constants/relationTypes';

export default class PersonFinder extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
        persons: PropTypes.bool,
        sites: PropTypes.bool,
    };

    static defaultProps = {
        onSelect: null,
        persons: true,
        sites: true,
    };

    static PERSON = PERSON_RELATION;

    static SITE = SITE_RELATION;

    state = {
        value: '',
        selectedValue: false,
    };

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        this.setState({
            value,
            selectedValue: false,
        });
    }

    handleSelect(type, value) {
        const { onSelect } = this.props;
        const name = `${value.name} (${type === PERSON_RELATION ? value.personId : value.siteId})`;

        this.setState({
            value: name,
            selectedValue: true
        });

        if (onSelect) {
            onSelect({
                name: value.name,
                firstName: value.firstName,
                lastName: value.lastName,
                personId: value.personId,
                userId: value.userId,
                siteId: value.siteId,
                locationId: value.locationId,
            });
        }
    }

    render() {
        const { persons, sites, ...props } = this.props;
        const { value, selectedValue } = this.state;

        return (
            <div className="cc__person-finder">
                <InputBox
                    inputComponent={Input}
                    value={value}
                    onChange={this.handleOnChange}
                    {...props}
                >
                    <PersonFinderResults
                        value={value}
                        hide={selectedValue}
                        onSelect={this.handleSelect}
                        person={persons}
                        site={sites}
                    />
                </InputBox>
            </div>
        );
    }
}
