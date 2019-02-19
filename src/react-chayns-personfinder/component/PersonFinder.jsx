import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import { convertToInputValue, createInputValue } from '../utils/createInputValue';
import PersonFinderData from './PersonFinderData';

export default class PersonFinder extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        showPersons: PropTypes.bool,
        showSites: PropTypes.bool,
        className: PropTypes.string,
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
        onChange: null,
        showPersons: true,
        showSites: false,
        defaultValue: null,
        className: null,
    };

    static PERSON = PERSON_RELATION;

    static LOCATION = LOCATION_RELATION;

    constructor(props) {
        super(props);

        this.state = {
            value: createInputValue(props.defaultValue) || '',
            selectedValue: !!props.defaultValue,
        };

        this.clear = this.clear.bind(this);
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
        const { onChange } = this.props;
        const name = convertToInputValue(value);

        this.setState({
            value: name,
            selectedValue: true
        });

        if (onChange) {
            onChange({
                type,
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

    clear() {
        const { onChange } = this.props;

        this.setState({
            value: '',
        });

        if (onChange) {
            onChange(null);
        }
    }

    render() {
        const {
            showPersons,
            showSites,
            className,
            value: propValue, /* eslint-disable-line react/prop-types */
            defaultValue,
            ...props
        } = this.props;
        const { value, selectedValue } = this.state;

        return (
            <div className={classnames('cc__person-finder', className)}>
                <PersonFinderData
                    {...props}
                    value={value}
                    selectedValue={selectedValue}
                    onChange={this.handleOnChange}
                    onSelect={this.handleSelect}
                    persons={showPersons}
                    sites={showSites}
                />
            </div>
        );
    }
}
