import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TagInput from '../../react-chayns-tag_input/component/TagInput';
import PersonFinderView from './PersonFinderView';
import PersonsContext from './data/persons/PersonsContext';
import { convertPersonForReturn } from './data/persons/PersonsConverter';

class MultiplePersonFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: (props.defaultValue && props.defaultValue[props.context.ObjectMapping.showName]) || '',
            selectedValue: !!props.defaultValue,
            values: props.defaultValues.map((v) => {
                const value = props.context.ValueConverter ? props.context.ValueConverter(v) : v;
                return {
                    text: value[props.context.ObjectMapping.showName],
                    value,
                };
            }),
        };

        this.clear = this.clear.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { inputValue } = this.state;

        if (!inputValue && prevState.inputValue) {
            this.input.focus();
        }
    }

    getValues() {
        const { values: valuesProps, context } = this.props;
        if (valuesProps) {
            return valuesProps.map((v) => {
                const value = context.ValueConverter ? context.ValueConverter(v) : v;
                return {
                    text: value[context.ObjectMapping.showName],
                    value,
                };
            });
        }
        const { values: valuesState } = this.state;
        return valuesState;
    }

    handleOnChange(inputValue, ...other) {
        const { onInput } = this.props;
        this.setState({
            inputValue,
            selectedValue: false,
        });
        if (onInput) {
            onInput(inputValue, ...other);
        }
    }

    handleTagRemove(tag) {
        const { context: { ObjectMapping: orm }, onRemove } = this.props;
        const { values } = this.state;
        const { value } = tag || {};

        if (!value) return;

        this.setState({
            values: values.filter((r) => r.value[orm.identifier] !== value[orm.identifier]),
        });

        if (onRemove) {
            onRemove(value);
        }
    }

    handleSelect(type, value) {
        const {
            onAdd, context: { ObjectMapping: orm },
        } = this.props;
        const { values } = this.state;
        const name = value[orm.showName];

        if (values.find((v) => v.value[orm.identifier] === value[orm.identifier])) {
            return;
        }

        let outValue = {
            ...value,
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
            if (outValue && outValue.type === 'PERSON') {
                outValue = convertPersonForReturn(outValue);
            }
            onAdd(outValue);
        }

        if (this.boxRef) {
            this.boxRef.updatePosition();
            setImmediate(this.boxRef.focus);
        }
    }

    clear() {
        const { onChange } = this.props;

        this.setState({
            inputValue: '',
            values: [],
            selectedValue: null,
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
            defaultValue,
            showId,
            context: Context,
            contextProps,
            max,
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
                        reducerFunction: props.reducerFunction,
                    } : null)}
                    {...contextProps}
                >
                    <Context.Consumer>
                        {(ctx) => (
                            <PersonFinderView
                                {...props}
                                {...ctx}
                                orm={Context.ObjectMapping}
                                inputComponent={TagInput}
                                inputRef={(ref) => {
                                    this.input = ref;
                                }}
                                boxRef={(ref) => {
                                    this.boxRef = ref;
                                }}
                                value={inputValue}
                                tags={this.getValues()}
                                selectedValue={selectedValue || (max && this.getValues().length >= max)}
                                onChange={(...value) => {
                                    this.handleOnChange(...value);
                                    if (typeof ctx.onChange === 'function') {
                                        ctx.onChange(...value);
                                    }
                                }}
                                onRemoveTag={this.handleTagRemove}
                                onSelect={this.handleSelect}
                            />
                        )}
                    </Context.Consumer>
                </Context.Provider>
            </div>
        );
    }
}

MultiplePersonFinder.propTypes = {
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
    defaultValues: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        siteId: PropTypes.string,
        personId: PropTypes.string,
    })),
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    showId: PropTypes.bool,
    onInput: PropTypes.func,
    context: PropTypes.shape({
        Provider: PropTypes.func,
        Consumer: PropTypes.object,
        ObjectMapping: PropTypes.shape({
            showName: PropTypes.string,
            identifier: PropTypes.string,
        }),
        ValueConverter: PropTypes.func,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    contextProps: PropTypes.object,
    max: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.array,
};

MultiplePersonFinder.defaultProps = {
    onChange: null,
    showPersons: true,
    showSites: false,
    defaultValue: null,
    className: null,
    onAdd: null,
    onRemove: null,
    showId: false,
    defaultValues: [],
    onInput: null,
    contextProps: null,
    max: null,
    values: null,
};

export default MultiplePersonFinder;
