import React, {
    useState,
    useCallback,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SearchBox.scss';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import ResultSelection from './result-selection/ResultSelection';

const SearchBox = ({
    list,
    disabled,
    listValue,
    listKey,
    defaultValue,
    parent,
    onSelect,
    value: valueProp,
    stopPropagation,
    showListWithoutInput,
    inputValue: inputValueProp,
    inputDefaultValue,
    onChange,
    className,
    autoSelectFirst,
    ...otherProps
}) => {
    const getItem = useCallback((key) => {
        if (key === null || key === undefined) {
            return {};
        }
        return list.find((item) => String(item[listKey]) === String(key));
    }, [list, listKey]);

    const [valueState, setValueState] = useState(defaultValue);
    const value = valueProp !== null ? valueProp : valueState;
    const [inputValueState, setInputValueState] = useState((inputDefaultValue !== null ? inputDefaultValue : getItem(value)[listValue]) || '');
    const inputValue = inputValueProp !== null ? inputValueProp : inputValueState;
    const [focusIndex, setFocusIndex] = useState(autoSelectFirst ? 0 : null);

    const inputBoxRef = useRef(null);
    const inputRef = useRef(null);

    const onItemClick = useCallback((e, item) => {
        const selection = item?.[listKey] || e?.target.id;
        setValueState(selection);
        setInputValueState(getItem(selection)[listValue]);
        if (onSelect && list && list.length > 0 && listKey && selection !== null && selection !== undefined) {
            onSelect(getItem(selection));
        }
        if (stopPropagation) e.stopPropagation();
        if (inputBoxRef.current) inputBoxRef.current.blur();
    }, [setValueState, setInputValueState, getItem, listValue, listKey, onSelect, list, stopPropagation, inputBoxRef]);

    const inputOnChange = useCallback((input) => {
        if (onChange) onChange(input);
        setInputValueState(input);
        setFocusIndex(autoSelectFirst ? 0 : null);
    }, [autoSelectFirst, onChange]);

    const filteredList = list?.filter((item) => (item[listValue].toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0) && (showListWithoutInput || inputValue))
        .sort((a, b) => {
            const aValue = a[listValue].toLowerCase();
            const bValue = b[listValue].toLowerCase();
            const aStartsWith = aValue.startsWith(inputValue.toLowerCase());
            const bStartsWith = bValue.startsWith(inputValue.toLowerCase());
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return aValue.localeCompare(bValue);
        });

    const updateIndex = useCallback((index) => {
        const listLength = filteredList.length;
        if (index >= listLength) return;
        if (index < 0 || typeof index !== 'number') return;
        setFocusIndex(index);
        const item = filteredList[index];
        const elem = document.getElementById(`${item[listKey]}`);
        if (elem) {
            if (typeof elem.scrollIntoViewIfNeeded === 'function') {
                elem.scrollIntoViewIfNeeded(false);
            } else if (typeof elem.scrollIntoView === 'function') {
                elem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [filteredList, listKey]);

    const handleKeyDown = useCallback((ev) => {
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
    }, [filteredList, focusIndex, onItemClick, updateIndex]);

    return (
        <InputBox
            value={inputValue}
            defaultValue={!inputValue && inputDefaultValue ? inputDefaultValue : undefined}
            onChange={inputOnChange}
            {...otherProps}
            ref={inputBoxRef}
            disabled={disabled}
            className={classNames(className, { 'cc__search-box--disabled': disabled })}
            onKeyDown={handleKeyDown}
            inputRef={(ref) => inputRef.current = ref}
        >
            {filteredList && filteredList.map((item, index) => (
                <div
                    key={item[listKey]}
                    id={item[listKey]}
                    className={classNames(
                        'cc__search-box__item ellipsis',
                        {
                            'cc__search-box__item--selected': value === item[listKey] || index === focusIndex,
                        },
                    )}
                    onClick={onItemClick}
                >
                    {
                        inputValue
                            ? (
                                <ResultSelection
                                    text={item[listValue]}
                                    search={inputValue}
                                />
                            )
                            : item[listValue]
                    }
                </div>
            ))}
        </InputBox>
    );
};

SearchBox.propTypes = {
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
    listKey: PropTypes.string.isRequired,
    listValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stopPropagation: PropTypes.bool,
    parent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputValue: PropTypes.string,
    showListWithoutInput: PropTypes.bool,
    inputDefaultValue: PropTypes.string,
    onChange: PropTypes.func,
    autoSelectFirst: PropTypes.bool,
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
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
