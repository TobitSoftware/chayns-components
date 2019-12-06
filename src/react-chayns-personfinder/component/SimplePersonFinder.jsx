import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import PersonFinderView from './PersonFinderView';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import { convertToInputValue, createInputValue } from '../utils/createInputValue';
import normalizeOutput from '../utils/normalizeOutput';
import { isFunction } from '../../utils/is';

class SimplePersonFinder extends Component {
    static PERSON = PERSON_RELATION;

    static LOCATION = LOCATION_RELATION;

    constructor(props) {
        super(props);

        this.state = {
            inputValue: createInputValue(props.defaultValue, props.showId) || '',
            selectedValue: !!props.defaultValue,
        };

        this.clear = this.clear.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(inputValue) {
        const { onInput } = this.props;
        this.setState({
            inputValue,
            selectedValue: false,
        });
        if (onInput && isFunction(onInput)) {
            onInput(inputValue);
        }
    }

    handleSelect(type, value) {
        const {
            onChange,
            showId,
            customData,
            context: Context,
        } = this.props;
        const name = customData ? value[Context.ObjectMapping.showName] : convertToInputValue(value, showId);

        this.setState({
            inputValue: name,
            selectedValue: true,
        });

        if (onChange) {
            onChange(customData ? value : normalizeOutput(type, value));
        }
    }

    clear() {
        const { onChange } = this.props;

        this.setState({
            inputValue: '',
            selectedValue: false,
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
            showId,
            customData,
            defaultValue,
            context: Context,
            ...props
        } = this.props;
        const { inputValue, selectedValue } = this.state;

        return (
            <div className={classNames('cc__person-finder', className)}>
                <Context.Provider
                    enableFriends={this.props.enableFriends}
                >
                    <Context.Consumer>
                        {ctx => (
                            <PersonFinderView
                                {...props}
                                {...ctx}
                                orm={Context.ObjectMapping}
                                inputComponent={Input}
                                value={inputValue}
                                selectedValue={selectedValue}
                                onChange={this.handleOnChange}
                                onSelect={this.handleSelect}
                            />
                        )}
                    </Context.Consumer>
                </Context.Provider>
            </div>
        );
    }
}

SimplePersonFinder.propTypes = {
    onChange: PropTypes.func,
    showPersons: PropTypes.bool,
    showSites: PropTypes.bool,
    showId: PropTypes.bool,
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
    customData: PropTypes.bool,
    onInput: PropTypes.func,
    context: PropTypes.shape({
        Provider: PropTypes.func,
        Consumer: PropTypes.object,
        ObjectMapping: PropTypes.shape({
            identifier: PropTypes.string,
            showName: PropTypes.string,
        }),
    }).isRequired,
};

SimplePersonFinder.defaultProps = {
    onChange: null,
    showPersons: true,
    showSites: false,
    defaultValue: null,
    className: null,
    showId: false,
    onInput: null,
    customData: false,
};

export default SimplePersonFinder;
