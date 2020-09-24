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
    list, disabled, listValue, listKey, defaultValue, parent, onSelect, value: valueProp, stopPropagation, showListWithoutInput,
    inputValue: inputValueProp, inputDefaultValue, onChange, className, ...otherProps
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

    const inputBoxRef = useRef(null);

    const onItemClick = useCallback((e) => {
        const selection = e.target.id;
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
    }, [onChange]);

    const filteredList = list.filter((item) => (item[listValue].toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0) && (showListWithoutInput || inputValue));
    return (
        <InputBox
            value={inputValue}
            defaultValue={inputDefaultValue}
            onChange={inputOnChange}
            {...otherProps}
            ref={inputBoxRef}
            disabled={disabled}
            className={classNames(className, { 'cc__search-box--disabled': disabled })}
        >
            {filteredList.length > 0 && filteredList.map((item) => (
                <div
                    key={item[listKey]}
                    id={item[listKey]}
                    className={classNames('cc__search-box__item ellipsis', { 'cc__search-box__item--selected': value === item[listKey] })}
                    onClick={onItemClick}
                >
                    {
                        inputValue
                            ? <ResultSelection text={item[listValue]} search={inputValue}/>
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
    list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    listKey: PropTypes.string.isRequired,
    listValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    stopPropagation: PropTypes.bool,
    parent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputValue: PropTypes.string,
    showListWithoutInput: PropTypes.bool,
    inputDefaultValue: PropTypes.string,
    onChange: PropTypes.func,
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
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
