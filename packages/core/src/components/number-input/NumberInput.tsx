import React, { FC, FocusEventHandler, FocusEvent, useMemo, useState, ChangeEvent } from 'react';
import Input from '../input/Input';

export enum NumberInputType {
    Decimal = 'decimal',
    Time = 'time',
    Money = 'money',
}

export interface NumberInputProps {
    type?: NumberInputType;
    value?: number;
    onChange?: (value: number) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    isDisabled?: boolean;
    maxValue?: number;
    minValue?: number;
}

const NumberInput: FC<NumberInputProps> = ({
    minValue,
    maxValue,
    value,
    onBlur,
    onFocus,
    isDisabled,
    onChange,
    type,
    placeholder,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const formattedValue = useMemo(() => {
        if (isFocused) {
            return value?.toString() ?? '';
        }

        switch (type) {
            case NumberInputType.Decimal:
                return '';
            case NumberInputType.Time:
                return '';
            case NumberInputType.Money:
                return '';
            default:
                return value?.toString() ?? '';
        }
    }, [isFocused, type, value]);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);

        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);

        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        let numericValue = parseFloat(inputValue);

        if (isNaN(numericValue)) {
            numericValue = 0;
        }

        // if (minValue !== undefined && numericValue < minValue) {
        //     numericValue = minValue;
        // }
        //
        // if (maxValue !== undefined && numericValue > maxValue) {
        //     numericValue = maxValue;
        // }

        if (typeof onChange === 'function') {
            onChange(numericValue);
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
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
