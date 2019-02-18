import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import PersonFinderData from './PersonFinderData';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import { convertToInputValue, createInputValue } from '../utils/createInputValue';

export default class SimplePersonFinder extends Component {
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
        showSites: true,
        defaultValue: null,
        className: null,
    };

    static PERSON = PERSON_RELATION;

    static LOCATION = LOCATION_RELATION;

    constructor(props) {
        super(props);

        this.state = {
            inputValue: createInputValue(props.defaultValue) || '',
            selectedValue: !!props.defaultValue,
        };

        this.clear = this.clear.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(inputValue) {
        this.setState({
            inputValue,
            selectedValue: false,
        });
    }

    handleSelect(type, value) {
        const { onChange } = this.props;
        const name = convertToInputValue(value);

        this.setState({
            inputValue: name,
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
            inputValue: '',
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
        const { inputValue, selectedValue } = this.state;

        return (
            <div className={classnames('cc__person-finder', className)}>
                <PersonFinderData
                    {...props}
                    inputComponent={Input}
                    value={inputValue}
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
