import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import { PERSON_RELATION, SITE_RELATION } from '../constants/relationTypes';
import { convertToInputValue, createInputValue } from '../utils/createInputValue';
import PersonFinderData from './PersonFinderData';

export default class PersonFinder extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
        persons: PropTypes.bool,
        sites: PropTypes.bool,
        defaultValue: PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                siteId: PropTypes.string,
                personId: PropTypes.string,
            }),
            PropTypes.string,
        ]),
    };

    static defaultProps = {
        onSelect: null,
        persons: true,
        sites: true,
        defaultValue: null,
    };

    static PERSON = PERSON_RELATION;

    static SITE = SITE_RELATION;

    constructor(props) {
        super(props);

        this.state = {
            value: createInputValue(props.defaultValue) || '',
            selectedValue: !!props.defaultValue,
        };

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
        const name = convertToInputValue(value);

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
        const {
            persons,
            sites,
            value: propValue, /* eslint-disable-line react/prop-types */
            defaultValue,
            ...props
        } = this.props;
        const { value, selectedValue } = this.state;

        return (
            <div className="cc__person-finder">
                <InputBox
                    inputComponent={Input}
                    value={value}
                    onChange={this.handleOnChange}
                    className={classnames('cc__person-finder__overlay', {
                        'cc__person-finder__overlay--hidden': selectedValue,
                    })}
                    {...props}
                >
                    <PersonFinderData
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
