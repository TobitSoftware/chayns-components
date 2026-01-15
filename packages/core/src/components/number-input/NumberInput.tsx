import React, { FC, FocusEvent, useMemo, useState, ChangeEvent } from 'react';
import Input from '../input/Input';
import {
    formatDecimal,
    formatMoney,
    formatTime,
    isValidNumberInput,
    NumberInputType,
} from './NumberInput.utils';

export interface NumberInputProps {
    /**
     * Defines the input type: decimal, integer, time (HHMM), or money (e.g. 13,34 €).
     */
    type?: NumberInputType;
    /**
     * The numeric value to display and edit. Must always be a number.
     */
    value?: number;
    /**
     * Callback when the value changes. Returns the parsed number and validity status.
     */
    onChange?: (value: number, isInvalid: boolean) => void;
    /**
     * Callback when the input loses focus. Returns the event and validity status.
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>, isInvalid: boolean) => void;
    /**
     * Callback when the input gains focus. Returns the event and validity status.
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>, isInvalid: boolean) => void;
    /**
     * Placeholder text shown when the input is empty.
     */
    placeholder?: string;
    /**
     * Disables the input field if true.
     */
    isDisabled?: boolean;
    /**
     * Marks the input as invalid (overrides internal validation).
     */
    isInvalid?: boolean;
    /**
     * Maximum allowed value (inclusive) for decimal, money, and integer types.
     */
    maxValue?: number;
    /**
     * Minimum allowed value (inclusive) for decimal, money, and integer types.
     */
    minValue?: number;
    /**
     * If true, only the bottom border of the input is shown.
     */
    shouldShowOnlyBottomBorder?: boolean;
}

const NumberInput: FC<NumberInputProps> = ({
    minValue,
    maxValue,
    value,
    onBlur,
    onFocus,
    isDisabled,
    isInvalid,
    shouldShowOnlyBottomBorder,
    onChange,
    type = NumberInputType.Integer,
    placeholder,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);

    const formattedValue = useMemo(() => {
        if (isFocused && inputValue !== undefined) {
            return inputValue;
        }
        if (value === undefined || value === null || Number.isNaN(value)) {
            return '';
        }
        switch (type) {
            case NumberInputType.Decimal:
                return formatDecimal(value);
            case NumberInputType.Time:
                return formatTime(value);
            case NumberInputType.Money:
                return formatMoney(value);
            default:
                return value?.toString() ?? '';
        }
    }, [isFocused, inputValue, type, value]);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (type === NumberInputType.Time) {
            let padded = '';
            if (value !== undefined && value !== null && !Number.isNaN(value)) {
                padded = value.toString().padStart(4, '0');
            }
            setInputValue(padded);
        } else {
            setInputValue(
                value !== undefined && value !== null && !Number.isNaN(value)
                    ? value.toString()
                    : '',
            );
        }
        const isValueInvalid = !isValidNumberInput(value, type, minValue, maxValue);
        if (typeof onFocus === 'function') {
            onFocus(event, isValueInvalid);
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setInputValue(undefined);
        const isValueInvalid = !isValidNumberInput(value, type, minValue, maxValue);
        if (typeof onBlur === 'function') {
            onBlur(event, isValueInvalid);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value;
        setInputValue(inputVal);
        let numericValue: number | undefined;
        if (type === NumberInputType.Time) {
            const digits = inputVal.replace(/\D/g, '');
            numericValue = digits ? parseInt(digits, 10) : undefined;
        } else {
            numericValue = parseFloat(inputVal.replace(',', '.'));
        }
        const isValueInvalid = !isValidNumberInput(numericValue, type, minValue, maxValue);
        if (typeof onChange === 'function') {
            onChange(numericValue ?? NaN, isValueInvalid);
        }
    };

    return (
        <Input
            placeholder={placeholder}
            value={formattedValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            shouldShowOnlyBottomBorder={shouldShowOnlyBottomBorder}
            shouldShowCenteredContent={shouldShowOnlyBottomBorder}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
