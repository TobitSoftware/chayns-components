import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Input from '../input/Input';
import { DECIMAL_TEST, INTEGER_TEST, MONEY_TEST, NUMBER_CLEAR_REGEX } from './constants/number';
import { formateNumber, parseFloatAndRound } from './utils/number';

export type NumberInputProps = {
    /**
     * Whether the user can add decimal places. Enables the user to input a zero as first number
     */
    isDecimalInput?: boolean;
    /**
     * Applies rules for money input.
     * Rules: only two decimal places, one leading zero
     */
    isMoneyInput?: boolean;
    /**
     * Limits the number to this value
     */
    maxNumber?: number;
    /**
     * The number that should be displayed formatted in the input field. NOTE: The number has to match the mode (integer, decimal or money)
     */
    number: number | null;
    /**
     * The placeholder that should be in the input
     */
    placeholder?: string;
    /**
     * Callback function that is called when the input gets out of focus
     */
    onBlur?: (newNumber: number | null) => void;
    /**
     * Callback function that is called when the input changes
     */
    onChange?: (newNumber: number | null) => void;
    /**
     * Whether the input is disabled
     */
    isDisabled?: boolean;
};

const NumberInput: FC<NumberInputProps> = (
    {
        isDecimalInput,
        isMoneyInput,
        maxNumber = Infinity,
        number,
        placeholder,
        onBlur,
        isDisabled,
        onChange
    }) => {
    const [stringValue, setStringValue] = useState<string>('');
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const localPlaceholder = placeholder ?? (isMoneyInput ? '€' : undefined);

    const handleChange = useCallback(
        (newValue: number | null = null) => {
            if (hasFocus) {
                return;
            }

            if (typeof newValue !== 'number') {
                setStringValue('');

                return;
            }

            const parsedValue = parseFloatAndRound({ stringValue: newValue?.toString() });

            setStringValue(formateNumber({ number: parsedValue, isMoneyInput }));
        },
        [hasFocus, isMoneyInput]
    );

    const onLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        const sanitizedValue = newValue
            // Removes everything except numbers, commas and points
            .replace(NUMBER_CLEAR_REGEX, '')
            // Calculations need points for decimal indication
            .replace(',', '.');

        if (sanitizedValue.length === 0) {
            setStringValue('');

            if (typeof onChange === 'function') {
                onChange?.(null);
            }

            return;
        }

        // Allows numbers, one (comma/point) and any number of decimal places
        if (isDecimalInput && DECIMAL_TEST.test(sanitizedValue)) {
            const parsedNumber = parseFloatAndRound({ stringValue: sanitizedValue });

            if (parsedNumber > maxNumber) {
                return;
            }

            setStringValue(sanitizedValue.replace('.', ','));

            if (typeof onChange === 'function') {
                onChange(parsedNumber);
            }

            return;
        }

        // Allows numbers, one (comma/point) and 2 numbers of decimal places
        if (isMoneyInput && MONEY_TEST.test(sanitizedValue)) {
            const parsedNumber = parseFloatAndRound({
                stringValue: sanitizedValue,
                decimals: 2,
            });

            if (parsedNumber > maxNumber) {
                return;
            }

            setStringValue(sanitizedValue.replace('.', ','));

            if (typeof onChange === 'function') {
                onChange(parsedNumber);
            }

            return;
        }

        // Allows numbers but excludes numbers with leading 0
        if (INTEGER_TEST.test(sanitizedValue)) {
            const parsedNumber = Number(sanitizedValue);

            if (parsedNumber > maxNumber) {
                return;
            }

            setStringValue(sanitizedValue);

            if (typeof onChange === 'function') {
                onChange(parsedNumber);
            }
        }
    };

    const onLocalBlur = () => {
        setHasFocus(false);

        const sanitizedValue = stringValue.length === 0 ? '0' : stringValue;
        const parsedValue = parseFloatAndRound({ stringValue: sanitizedValue });

        setStringValue(
            stringValue.length === 0
                ? ''
                : formateNumber({
                    number: parsedValue,
                    isMoneyInput,
                })
        );

        if (typeof onBlur === 'function') {
            onBlur(parsedValue === 0 ? null : parsedValue);
        }
    };

    const onFocus = () => {
        setHasFocus(true);

        setStringValue(stringValue.replaceAll('.', ''));
    };

    useEffect(() => {
        handleChange(number);
    }, [handleChange, number]);

    return (
        <Input
            inputMode="decimal"
            onChange={onLocalChange}
            value={stringValue}
            placeholder={localPlaceholder}
            onBlur={onLocalBlur}
            onFocus={onFocus}
            isDisabled={isDisabled}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
