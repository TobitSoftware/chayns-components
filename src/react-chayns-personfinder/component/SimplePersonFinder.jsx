import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import PersonFinderView from './PersonFinderView';
import { isFunction } from '../../utils/is';
import PersonsContext from './data/persons/PersonsContext';

class SimplePersonFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: props.defaultValue && props.defaultValue[props.context.ObjectMapping.showName],
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
            context: Context,
        } = this.props;
        const name = value[Context.ObjectMapping.showName];

        this.setState({
            inputValue: name,
            selectedValue: true,
        });

        if (onChange) {
            onChange(value);
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
            defaultValue,
            context: Context,
            contextProps,
            ...props
        } = this.props;
        const { inputValue, selectedValue } = this.state;

        return (
            <div className={classNames('cc__person-finder', className)}>
                <Context.Provider
                    // backward compatibility for previous props
                    {...(Context.Provider === PersonsContext.Provider ? {
                        uacId: props.uacId,
                        locationId: props.locationId,
                        includeOwn: props.includeOwn,
                        enableSites: showSites,
                        enablePersons: showPersons,
                        enableFriends: !showSites && showPersons,
                    } : null)}
                    {...contextProps}
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
                                onChange={(value) => {
                                    this.handleOnChange(value);
                                    if (typeof ctx.onChange === 'function') {
                                        ctx.onChange(value);
                                    }
                                }}
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
    contextProps: PropTypes.object,
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
    contextProps: null,
};

export default SimplePersonFinder;
