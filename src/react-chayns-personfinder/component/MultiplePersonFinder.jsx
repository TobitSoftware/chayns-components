import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TagInput from '../../react-chayns-tag_input/component/TagInput';
import PersonFinderView from './PersonFinderView';
import PersonsContext from './data/persons/PersonsContext';

class MultiplePersonFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: (props.defaultValue && props.defaultValue[props.context.ObjectMapping.showName]) || '',
            selectedValue: !!props.defaultValue,
            values: props.defaultValues.map(v => ({
                text: v[props.context.ObjectMapping.showName],
                value: v,
            })),
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

    handleOnChange(inputValue) {
        const { onInput } = this.props;
        this.setState({
            inputValue,
            selectedValue: false,
        });
        if (onInput) {
            onInput(inputValue);
        }
    }

    handleTagRemove(tag) {
        const { context: { ObjectMapping: orm }, onRemove } = this.props;
        const { values } = this.state;
        const { value } = tag || {};

        if (!value) return;

        this.setState({
            values: values.filter(r => r.value[orm.identifier] !== value[orm.identifier]),
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

        if (values.find(v => v.value[orm.identifier] === value[orm.identifier])) {
            return;
        }

        const outValue = {
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
            values: null,
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
            ...props
        } = this.props;
        const { inputValue, selectedValue, values } = this.state;

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
                        {ctx => (
                            <PersonFinderView
                                {...props}
                                {...ctx}
                                orm={Context.ObjectMapping}
                                inputComponent={TagInput}
                                inputRef={(ref) => { this.input = ref; }}
                                boxRef={(ref) => { this.boxRef = ref; }}
                                value={inputValue}
                                tags={values}
                                selectedValue={selectedValue}
                                onChange={(value) => {
                                    this.handleOnChange(value);
                                    if (typeof ctx.onChange === 'function') {
                                        ctx.onChange(value);
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
    }).isRequired,
    contextProps: PropTypes.object,
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
};

export default MultiplePersonFinder;
