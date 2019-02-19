import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TagInput from '../../react-chayns-tag_input/component/TagInput';
import PersonFinderData from './PersonFinderData';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import { convertToInputValue, createInputValue } from '../utils/createInputValue';

export default class MultiplePersonFinder extends Component {
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
            values: [],
        };

        this.clear = this.clear.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.state;

        if (!value && prevState.inputValue) {
            this.input.focus();
        }
    }

    handleOnChange(inputValue) {
        this.setState({
            inputValue,
            selectedValue: false,
        });
    }

    handleTagRemove(tag) {
        const { onRemove } = this.props;
        const { values } = this.state;
        const { value } = tag;

        this.setState({
            values: values.filter(r => r.value.type !== value.type || r.value.personId !== value.personId || r.value.siteId !== value.siteId),
        });

        if (onRemove) {
            onRemove(value.value);
        }
    }

    handleSelect(type, value) {
        const { onAdd } = this.props;
        const { values } = this.state;
        const name = convertToInputValue(value);

        if (values.find(v => (v.value.type === type
            && v.value.siteId === value.siteId
            && v.value.personId === value.personId))) {
            return;
        }

        const outValue = {
            type,
            name: value.name,
            firstName: value.firstName,
            lastName: value.lastName,
            personId: value.personId,
            userId: value.userId,
            siteId: value.siteId,
            locationId: value.locationId,
        };

        this.setState({
            inputValue: '',
            selectedValue: false,
            values: [...values, {
                text: name,
                value: outValue,
            }],
        });

        if (onAdd) {
            onAdd(outValue);
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
        const { inputValue, selectedValue, values } = this.state;

        return (
            <div className={classnames('cc__person-finder', className)}>
                <PersonFinderData
                    {...props}
                    inputComponent={TagInput}
                    inputRef={(ref) => { this.input = ref; }}
                    value={inputValue}
                    tags={values}
                    selectedValue={selectedValue}
                    onChange={this.handleOnChange}
                    onSelect={this.handleSelect}
                    onRemoveTag={this.handleTagRemove}
                    persons={showPersons}
                    sites={showSites}
                />
            </div>
        );
    }
}
