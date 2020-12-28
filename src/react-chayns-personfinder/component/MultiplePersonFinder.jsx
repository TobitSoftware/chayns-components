import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TagInput from '../../react-chayns-tag_input/component/TagInput';
import { isString } from '../../utils/is';
import PersonsContext from './data/persons/PersonsContext';
import { convertPersonForReturn } from './data/persons/PersonsConverter';
import PersonFinderView from './PersonFinderView';
import VerificationIcon from '../../react-chayns-verification_icon/component/VerificationIcon';

class MultiplePersonFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue:
                (props.defaultValue &&
                    props.defaultValue[props.context.ObjectMapping.showName]) ||
                '',
            selectedValue: !!props.defaultValue,
            values: props.defaultValues.map((v) => {
                const value = props.context.ValueConverter
                    ? props.context.ValueConverter(v)
                    : v;
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

    handleOnChange(inputValue, ...other) {
        const { onInput, max } = this.props;
        const newInputValue =
            max && max <= this.getValues().length ? '' : inputValue;
        this.setState({
            inputValue: newInputValue,
            selectedValue: false,
        });
        if (onInput) {
            onInput(newInputValue, ...other);
        }
    }

    handleTagRemove(tag) {
        const {
            context: { ObjectMapping: orm },
            onRemove,
        } = this.props;
        const { values } = this.state;
        const { value } = tag || {};

        if (!value) return;

        const newValues = values.filter(
            (r) => r.value[orm.identifier] !== value[orm.identifier]
        );

        this.setState({
            values: newValues,
        });

        this.onChange(newValues);

        if (onRemove) {
            onRemove(value);
        }
    }

    handleSelect(type, value) {
        const {
            onAdd,
            context: { ObjectMapping: orm },
            values: valuesProp,
        } = this.props;
        const { values: valuesState } = this.state;

        const { ValueConverter } = PersonsContext;

        let values = valuesState;
        if (valuesProp) {
            values = valuesProp.map((v) => {
                let retVal = v;
                if (!retVal.value) {
                    retVal = {
                        value: ValueConverter ? ValueConverter(v) : v,
                    };
                }
                return retVal;
            });
        }
        const name = value[orm.showName];

        if (
            values.find(
                (v) => v.value[orm.identifier] === value[orm.identifier]
            )
        ) {
            return;
        }

        let outValue = {
            ...value,
        };

        const newValues = [
            ...values,
            {
                text: orm.verified ? (
                    <VerificationIcon
                        name={name}
                        verified={value[orm.verified]}
                    />
                ) : (
                    name
                ),
                value: outValue,
            },
        ];

        this.setState({
            inputValue: '',
            selectedValue: false,
            values: newValues,
        });

        if (onAdd) {
            if (outValue && outValue.type === 'PERSON') {
                outValue = convertPersonForReturn(outValue);
            }
            onAdd(outValue);
        }

        this.onChange(newValues);

        if (this.boxRef) {
            setImmediate(this.boxRef.focus);
        }
    }

    onChange(values) {
        const { onChange } = this.props;
        const retVal = values.map((v) => v.value);
        if (onChange) {
            if (retVal.length > 0 && retVal[0].type === 'PERSON') {
                onChange(retVal.map(convertPersonForReturn));
            } else {
                onChange(retVal);
            }
        }
    }

    getValues() {
        const { values: valuesProps, context } = this.props;
        if (valuesProps) {
            return valuesProps.map((v) => {
                const value = context.ValueConverter
                    ? context.ValueConverter(v)
                    : v;

                let text = value[context.ObjectMapping.showName];
                if (context.ObjectMapping.verified) {
                    text = (
                        <VerificationIcon
                            name={text}
                            verified={value[context.ObjectMapping.verified]}
                        />
                    );
                }

                return {
                    text,
                    value,
                };
            });
        }
        const { values: valuesState } = this.state;
        return valuesState;
    }

    clear() {
        this.setState({
            inputValue: '',
            values: [],
            selectedValue: null,
        });

        this.onChange([]);
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
            value: valueProp,
            disableFriends,
            ...props
        } = this.props;
        const { inputValue, selectedValue } = this.state;

        return (
            <div className={classNames('cc__person-finder', className)}>
                <Context.Provider
                    // backward compatibility for previous props
                    {...(Context.Provider === PersonsContext.Provider
                        ? {
                              uacId: props.uacId,
                              locationId: props.locationId,
                              includeOwn: props.includeOwn,
                              enableSites: showSites,
                              enablePersons: showPersons,
                              enableFriends:
                                  showPersons &&
                                  !disableFriends &&
                                  !props.uacId,
                              reducerFunction: props.reducerFunction,
                          }
                        : null)}
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
                                value={
                                    isString(valueProp) ? valueProp : inputValue
                                }
                                tags={this.getValues()}
                                selectedValue={
                                    selectedValue ||
                                    (max && this.getValues().length >= max)
                                }
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
    disableFriends: PropTypes.bool,
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
    defaultValues: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            siteId: PropTypes.string,
            personId: PropTypes.string,
        })
    ),
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    showId: PropTypes.bool,
    onInput: PropTypes.func,
    context: PropTypes.shape({
        Provider: PropTypes.func,
        // eslint-disable-next-line react/forbid-prop-types
        Consumer: PropTypes.object,
        ObjectMapping: PropTypes.shape({
            showName: PropTypes.string,
            identifier: PropTypes.string,
            verified: PropTypes.string,
        }),
        ValueConverter: PropTypes.func,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    contextProps: PropTypes.object,
    max: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.array,
    value: PropTypes.string,
};

MultiplePersonFinder.defaultProps = {
    onChange: null,
    showPersons: true,
    showSites: false,
    disableFriends: false,
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
    value: null,
};

MultiplePersonFinder.displayName = 'MultiplePersonFinder';

export default MultiplePersonFinder;
