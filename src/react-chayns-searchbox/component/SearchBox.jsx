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
    ...otherProps
}) => {
    const getItem = useCallback(
        (key) => {
            let defaultReturnValue = {};
            if (list.length > 0) {
                if (isString(list[0])) {
                    defaultReturnValue = '';
                } else if (isNumber(list[0])) {
                    defaultReturnValue = 0;
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
        [list, listKey]
    );
    const getValue = useCallback(
        (stringOrObjectOrNumber) => {
            if (
                isString(stringOrObjectOrNumber) ||
                isNumber(stringOrObjectOrNumber)
            ) {
                return stringOrObjectOrNumber;
            } else {
                return stringOrObjectOrNumber[listValue];
            }
        },
        [list, listValue]
    );
    const getKey = useCallback(
        (stringOrObjectOrNumber) => {
            if (
                isString(stringOrObjectOrNumber) ||
                isNumber(stringOrObjectOrNumber)
            ) {
                return stringOrObjectOrNumber;
            } else if (!listKey || !stringOrObjectOrNumber) {
                return null;
            } else {
                return stringOrObjectOrNumber[listKey];
            }
        },
        [list, listKey]
    );

    const [valueState, setValueState] = useState(defaultValue);
    const value = valueProp !== null ? valueProp : valueState;
    const [inputValueState, setInputValueState] = useState(
        (inputDefaultValue !== null
            ? inputDefaultValue
            : getValue(getItem(value))) || ''
    );

    useEffect(() => {
        setInputValueState(
            (inputDefaultValue !== null
                ? inputDefaultValue
                : getValue(getItem(value))) || ''
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, list]);
    const inputValue =
        inputValueProp !== null ? inputValueProp : inputValueState;
    const [focusIndex, setFocusIndex] = useState(autoSelectFirst ? 0 : null);

    const inputBoxRef = useRef(null);
    const inputRef = useRef(null);
    const onItemClick = useCallback(
        (e, item) => {
            const selection = getKey(item) || e?.target.id;
            setValueState(selection);
            setInputValueState(getValue(getItem(selection)));
            if (
                onSelect &&
                list &&
                list.length > 0 &&
                selection !== null &&
                selection !== undefined
            ) {
                onSelect(getItem(selection));
            }
            if (stopPropagation) e.stopPropagation();
            if (inputBoxRef.current) inputBoxRef.current.blur();
        },
        [
            setValueState,
            setInputValueState,
            getItem,
            listValue,
            getKey,
            onSelect,
            list,
            stopPropagation,
            inputBoxRef,
        ]
    );

    const inputOnChange = useCallback(
        (input) => {
            if (onChange) onChange(input);
            setInputValueState(input);
            setFocusIndex(autoSelectFirst ? 0 : null);
        },
        [autoSelectFirst, onChange]
    );

    const filteredList = list
        ?.filter(
            (item) =>
                String(getValue(item))
                    .toLowerCase()
                    .indexOf(String(inputValue).toLowerCase()) >= 0 &&
                (showListWithoutInput || inputValue)
        )
        .sort((a, b) => {
            let aValue = getValue(a);
            let bValue = getValue(b);
            aValue = isString(aValue) ? aValue.toLowerCase() : aValue;
            bValue = isString(bValue) ? bValue.toLowerCase() : bValue;
            const aStartsWith = String(aValue).startsWith(
                String(inputValue).toLowerCase()
            );
            const bStartsWith = String(bValue).startsWith(
                String(inputValue).toLowerCase()
            );
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            if (isString(aValue) || isString(bValue))
                return aValue.localeCompare(bValue);
            return aValue - bValue;
        });
    const updateIndex = useCallback(
        (index) => {
            const listLength = filteredList.length;
            if (index >= listLength) return;
            if (index < 0 || typeof index !== 'number') return;
            setFocusIndex(index);
            const item = filteredList[index];
            const elem = document.getElementById(`${getKey(item)}`);
            if (elem) {
                if (typeof elem.scrollIntoViewIfNeeded === 'function') {
                    elem.scrollIntoViewIfNeeded(false);
                } else if (typeof elem.scrollIntoView === 'function') {
                    elem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
        [filteredList, getKey]
    );

    const handleKeyDown = useCallback(
        (ev) => {
            if (!filteredList) return;

            switch (ev.keyCode) {
                case 40: // Arrow down
                    ev.preventDefault();
                    if (focusIndex === null) {
                        updateIndex(0);
                    } else {
                        updateIndex(focusIndex + 1);
                    }
                    break;
                case 38: // Arrow up
                    ev.preventDefault();
                    if (focusIndex === null) {
                        updateIndex(0);
                    } else {
                        updateIndex(focusIndex - 1);
                    }
                    break;
                case 13: // Enter
                    if (focusIndex !== null && filteredList[focusIndex]) {
                        onItemClick(ev, filteredList[focusIndex]);
                        inputRef.current.ref.blur();
                        updateIndex(null);
                    }
                    break;
                default:
                    break;
            }
        },
        [filteredList, focusIndex, onItemClick, updateIndex]
    );

    return (
        <InputBox
            value={inputValue}
            defaultValue={
                !inputValue && inputDefaultValue ? inputDefaultValue : undefined
            }
            onChange={inputOnChange}
            customProps={{ autocomplete: 'off' }}
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
        >
            {filteredList &&
                filteredList.map((item, index) => (
                    <div
                        key={getKey(item)}
                        id={getKey(item)}
                        className={classNames('cc__search-box__item ellipsis', {
                            'cc__search-box__item--selected':
                                value === getKey(item) || index === focusIndex,
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
    listKey: PropTypes.string.isRequired,

    /**
     * The property name of the name of the `list` items that will be shown in
     * the dropdown.
     */
    listValue: PropTypes.string.isRequired,

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
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
