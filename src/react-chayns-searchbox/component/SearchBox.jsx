/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import ResultSelection from './result-selection/ResultSelection';
import './SearchBox.scss';
import { isNumber, isString } from '../../utils/is';

/**
 * An autocomplete input to search through a list of entries.
 */
const SearchBox = ({
    list,
    disabled,
    listValue,
    listKey,
    sortKey,
    defaultValue,
    onSelect,
    value: valueProp,
    stopPropagation,
    showListWithoutInput,
    inputValue: inputValueProp,
    inputDefaultValue,
    onChange,
    className,
    autoSelectFirst,
    highlightInputInResult,
    addInputToList,
    emptyKey,
    ...otherProps
}) => {
    const getValue = useCallback(
        (stringOrObjectOrNumber) => {
            if (
                isString(stringOrObjectOrNumber) ||
                isNumber(stringOrObjectOrNumber) ||
                !stringOrObjectOrNumber
            ) {
                return stringOrObjectOrNumber;
            }
            return stringOrObjectOrNumber[listValue];
        },
        [listValue]
    );

    const getSortValue = useCallback(
        (stringOrObjectOrNumber) => {
            if (
                isString(stringOrObjectOrNumber) ||
                isNumber(stringOrObjectOrNumber) ||
                !stringOrObjectOrNumber
            ) {
                return stringOrObjectOrNumber;
            }
            return stringOrObjectOrNumber[sortKey ?? listValue];
        },
        [sortKey, listValue]
    );

    const getKey = useCallback(
        (stringOrObjectOrNumber) => {
            if (
                isString(stringOrObjectOrNumber) ||
                isNumber(stringOrObjectOrNumber)
            ) {
                return stringOrObjectOrNumber;
            }
            if (!listKey || !stringOrObjectOrNumber) {
                return null;
            }
            const key = stringOrObjectOrNumber[listKey];
            if (!key && addInputToList) {
                return stringOrObjectOrNumber[listValue];
            }
            return key;
        },
        [listKey, addInputToList, listValue]
    );

    const getItemByKey = useCallback(
        (key) => {
            let defaultReturnValue = {};
            if (addInputToList) {
                defaultReturnValue = { [listValue]: key };
            }
            if (list.length > 0) {
                if (isString(list[0])) {
                    if (addInputToList) {
                        defaultReturnValue = key;
                    } else {
                        defaultReturnValue = '';
                    }
                } else if (isNumber(list[0])) {
                    if (addInputToList) {
                        defaultReturnValue = Number(key);
                    } else {
                        defaultReturnValue = 0;
                    }
                }
            }
            if (key === null || key === undefined) {
                return defaultReturnValue;
            }
            const res = list.find(
                (item) => String(getKey(item)) === String(key) || item === key
            );

            return res === undefined ? defaultReturnValue : res;
        },
        [addInputToList, list, listValue, getKey]
    );

    const isItemExisting = useCallback(
        (value) => {
            if (!value && value !== 0) {
                return false;
            }
            return !!list.find(
                (item) =>
                    String(getValue(item)) === String(value) ||
                    String(item) === String(value)
            );
        },
        [getValue, list]
    );

    const [valueState, setValueState] = useState(defaultValue);
    const value = valueProp !== null ? valueProp : valueState;

    const [inputValueState, setInputValueState] = useState(
        (inputDefaultValue !== null
            ? inputDefaultValue
            : getValue(getItemByKey(value))) || ''
    );

    useEffect(() => {
        setInputValueState(
            (inputDefaultValue !== null
                ? inputDefaultValue
                : getValue(getItemByKey(value))) || ''
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, list]);

    const inputValue =
        inputValueProp !== null ? inputValueProp : inputValueState;
    const [focusIndex, setFocusIndex] = useState(autoSelectFirst ? 0 : null);
    const inputBoxRef = useRef(null);
    const inputRef = useRef(null);

    const [filteredList, setFilteredList] = useState([]);

    const inputOnChange = useCallback(
        (input) => {
            if (onChange) onChange(input);
            setInputValueState(input);
        },
        [setInputValueState, onChange]
    );

    const onItemClick = useCallback(
        (e, item) => {
            const selection = getKey(item) || e?.target.id;
            setValueState(selection);
            const itemValue = getValue(getItemByKey(selection));
            let newInputValueState;
            if (addInputToList && !itemValue) {
                if (list.length >= 0 && isNumber(list[0])) {
                    newInputValueState = Number(selection);
                } else {
                    newInputValueState = selection;
                }
            } else {
                newInputValueState = itemValue;
            }
            setInputValueState(newInputValueState);
            if (
                onSelect &&
                list &&
                list.length > 0 &&
                selection !== null &&
                selection !== undefined
            ) {
                onSelect(getItemByKey(selection));
            }
            if (stopPropagation) e.stopPropagation();
            if (inputBoxRef.current) inputBoxRef.current.blur();
        },
        [
            getKey,
            getValue,
            getItemByKey,
            addInputToList,
            onSelect,
            list,
            stopPropagation,
        ]
    );

    const handleKeyDown = useCallback(
        (ev) => {
            if (!filteredList) return;

            switch (ev.keyCode) {
                case 40: // Arrow down
                    ev.preventDefault();
                    if (focusIndex === null) {
                        setFocusIndex(0);
                    } else if (focusIndex >= filteredList.length - 1) {
                        setFocusIndex(filteredList.length - 1);
                    } else {
                        setFocusIndex(focusIndex + 1);
                    }
                    break;
                case 38: // Arrow up
                    ev.preventDefault();
                    if (focusIndex === null || focusIndex <= 0) {
                        setFocusIndex(0);
                    } else {
                        setFocusIndex(focusIndex - 1);
                    }
                    break;
                case 13: // Enter
                    if (focusIndex !== null && filteredList[focusIndex]) {
                        onItemClick(ev, filteredList[focusIndex]);
                        inputRef.current.ref.blur();
                        setFocusIndex(null);
                    }
                    break;
                default:
                    break;
            }
        },
        [filteredList, focusIndex, onItemClick]
    );

    useEffect(() => {
        const inputValueString = Number.isNaN(inputValue)
            ? ''
            : String(inputValue);
        const returnList = list
            ?.filter(
                (item) =>
                    String(getValue(item))
                        .toLowerCase()
                        .indexOf(inputValueString.toLowerCase()) >= 0 &&
                    (showListWithoutInput || inputValue)
            )
            .sort((a, b) => {
                let aValue = getSortValue(a);
                let bValue = getSortValue(b);
                aValue = isString(aValue) ? aValue.toLowerCase() : aValue;
                bValue = isString(bValue) ? bValue.toLowerCase() : bValue;
                const aStartsWith = String(aValue).startsWith(
                    inputValueString.toLowerCase()
                );
                const bStartsWith = String(bValue).startsWith(
                    inputValueString.toLowerCase()
                );
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                if (isString(aValue) || isString(bValue))
                    return aValue.localeCompare(bValue);
                return aValue - bValue;
            });

        if (
            addInputToList &&
            !isItemExisting(inputValue) &&
            list.length > 0 &&
            inputValueString
        ) {
            if (isString(list[0])) {
                returnList.push(inputValue);
            } else if (isNumber(list[0])) {
                returnList.push(Number(inputValue));
            } else {
                returnList.push({ [listValue]: inputValue });
            }
        }
        setFilteredList(returnList);
    }, [
        inputValue,
        addInputToList,
        list,
        isItemExisting,
        getValue,
        showListWithoutInput,
        listValue,
    ]);

    useEffect(() => {
        let index = filteredList.findIndex(
            (item) =>
                (!(!inputValue && emptyKey) && value === getKey(item)) ||
                (!inputValue && emptyKey === getKey(item))
        );
        if (index < 0) {
            index = null;
        }
        setFocusIndex(index || (autoSelectFirst ? 0 : null));
    }, [autoSelectFirst, emptyKey, filteredList, getKey, inputValue, value]);

    useEffect(() => {
        const item = filteredList[focusIndex];
        const elem = document.getElementById(`${getKey(item)}`);
        if (elem) {
            if (typeof elem.scrollIntoViewIfNeeded === 'function') {
                elem.scrollIntoViewIfNeeded(false);
            } else if (typeof elem.scrollIntoView === 'function') {
                elem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [filteredList, focusIndex, getKey]);

    return (
        <InputBox
            value={inputValue}
            defaultValue={
                !inputValue && inputDefaultValue ? inputDefaultValue : undefined
            }
            onChange={inputOnChange}
            customProps={{ autoComplete: 'off' }}
            type={list.length >= 0 && isNumber(list[0]) ? 'number' : 'text'}
            onBlur={() => {
                if (addInputToList) {
                    onItemClick(null, inputValue);
                }
            }}
            {...otherProps}
            ref={inputBoxRef}
            disabled={disabled}
            className={classNames(className, {
                'cc__search-box--disabled': disabled,
            })}
            onKeyDown={handleKeyDown}
            inputRef={(ref) => {
                inputRef.current = ref;
            }}
            emptyValue={getValue(getItemByKey(emptyKey))}
        >
            {filteredList &&
                filteredList.map((item, index) => (
                    <div
                        key={getKey(item)}
                        id={getKey(item)}
                        className={classNames('cc__search-box__item ellipsis', {
                            'cc__search-box__item--selected':
                                (!(!inputValue && emptyKey) &&
                                    value === getKey(item)) ||
                                index === focusIndex ||
                                (!inputValue && emptyKey === getKey(item)),
                        })}
                        onClick={onItemClick}
                    >
                        {highlightInputInResult && inputValue ? (
                            <ResultSelection
                                text={getValue(item)}
                                search={inputValue}
                            />
                        ) : (
                            getValue(item)
                        )}
                    </div>
                ))}
        </InputBox>
    );
};

SearchBox.propTypes = {
    /**
     * A callback that will be invoked when a value was selected.
     */
    onSelect: PropTypes.func,

    /**
     * Disables any user interaction and renders the search box in a disabled
     * style.
     */
    disabled: PropTypes.bool,

    /**
     * An array of items to select from.
     */
    list: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.number),
    ]),

    /**
     * The property name of a unique identifier in the `list` items.
     */
    listKey: PropTypes.string,

    /**
     * The property name of the name of the `list` items that will be shown in
     * the dropdown.
     */
    listValue: PropTypes.string,

    /**
     * The property name to use for sorting the list. Default is listValue
     */
    sortKey: PropTypes.string,

    /**
     * A classname string that will be set on the container component.
     */
    className: PropTypes.string,

    /**
     * The default value of the search box as a key to one of the list items.
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * A DOM element into which the overlay will be rendered.
     */
    parent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    /**
     * A React style object that will be applied to the outer-most container.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * The current value of the search box as a key to one of the list items.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The current value of the text input.
     */
    inputValue: PropTypes.string,

    /**
     * Wether the list should be shown if there is no user input.
     */
    showListWithoutInput: PropTypes.bool,

    /**
     * The default value of the input field. Has no effect when used with the
     * `inputValue`-prop.
     */
    inputDefaultValue: PropTypes.string,

    /**
     * The `onChange`-callback for the input element.
     */
    onChange: PropTypes.func,

    /**
     * Wether the first list item should be automatically selected.
     */
    autoSelectFirst: PropTypes.bool,

    /**
     * Whether the search term should be marked in the selection
     */
    highlightInputInResult: PropTypes.bool,

    /**
     * Whether the input value should be added to the end of the result list.
     * Allows also values which are not in the list.
     */
    addInputToList: PropTypes.bool,

    /**
     * The key of the default value if nothing is selected or typed into the input.
     */
    emptyKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Whether the input should have a small icon to open and close the result list.
     */
    hasOpenCloseIcon: PropTypes.bool,
};

SearchBox.defaultProps = {
    className: null,
    onSelect: null,
    disabled: false,
    stopPropagation: false,
    defaultValue: null,
    parent: null,
    style: null,
    value: null,
    inputValue: null,
    showListWithoutInput: false,
    inputDefaultValue: null,
    onChange: null,
    list: null,
    autoSelectFirst: false,
    highlightInputInResult: true,
    addInputToList: false,
    listKey: 'key',
    listValue: 'value',
    sortKey: null,
    emptyKey: null,
    hasOpenCloseIcon: false,
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
