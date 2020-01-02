import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import PersonFinderData from './PersonFinderData';
import PersonFinderView from './PersonFinderView';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import { convertToInputValue, createInputValue } from '../utils/createInputValue';
import normalizeOutput from '../utils/normalizeOutput';
import FriendsDataContainer from './data/friends/FriendsDataContainer';
import { isFunction } from '../../utils/is';

export default class SimplePersonFinder extends Component {
    static propTypes = {
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
        orm: PropTypes.shape({
            identifier: PropTypes.string,
            showName: PropTypes.string,
        }),
        removeIcon: PropTypes.bool,
        onInput: PropTypes.func,
    };

    static defaultProps = {
        onChange: null,
        showPersons: true,
        showSites: false,
        defaultValue: null,
        className: null,
        showId: false,
        onInput: null,
        customData: false,
        orm: {},
        removeIcon: false,
    };

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
            orm,
        } = this.props;
        const name = customData ? value[orm.showName] : convertToInputValue(value, showId);

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
            removeIcon,
            ...props
        } = this.props;
        const { inputValue, selectedValue } = this.state;

        const additionalProps = {
            inputComponent: Input,
            value: inputValue,
            selectedValue,
            onChange: this.handleOnChange,
            onSelect: this.handleSelect,
        };

        if (removeIcon) {
            additionalProps.icon = selectedValue ? 'ts-wrong' : null;
            additionalProps.onIconClick = (ev) => {
                ev.stopPropagation();
                this.clear();
            };
        }

        return (
            <div className={classnames('cc__person-finder', className)}>
                {customData ? (
                    <PersonFinderView
                        {...props}
                        {...additionalProps}
                    />
                ) : (
                    <FriendsDataContainer>
                        <PersonFinderData
                            {...props}
                            {...additionalProps}
                            persons={showPersons}
                            sites={showSites}
                        />
                    </FriendsDataContainer>
                )}
            </div>
        );
    }
}
