import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Input from '../input/Input';
import { DECIMAL_TEST, INTEGER_TEST, MONEY_TEST, NUMBER_CLEAR_REGEX } from './constants/number';
import { formateNumber, parseFloatWithDecimals } from './utils/number';

export type NumberInputProps = {
    /**
     * Whether the user can add decimal places. Enables the user to input a zero as first number
     */
    isDecimalInput?: boolean;
    /**
     * Whether the input is disabled
     */
    isDisabled?: boolean;
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
     * Limits the number to this value
     */
    minNumber?: number;
    /**
     * Callback function that is called when the input gets out of focus
     */
    onBlur?: (newNumber: number | null, isInvalid: boolean) => void;
    /**
     * Callback function that is called when the input changes, returns the sanitized value
     */
    onChange?: (newValue: string) => void;
    /**
     * The placeholder that should be in the input
     */
    placeholder?: string;
    /**
     * The number that should be displayed formatted in the input field. NOTE: The number has to match the mode (integer, decimal or money)
     * If the number is a string, the formatting will be skipped and the string will be set as value
     */
    value: number | string | null;
};

const NumberInput: FC<NumberInputProps> = (
    {
        isDecimalInput,
        isMoneyInput,
        maxNumber = Infinity,
        value,
        placeholder,
        onBlur,
        isDisabled,
        onChange,
        minNumber= -Infinity
    }) => {
    const [localValue, setLocalValue] = useState<string>('');
    const [isValueInvalid, setIsValueInvalid] = useState(false);

    const localPlaceholder = placeholder ?? (isMoneyInput ? '€' : undefined);

    const handleChange = useCallback(
        (newValue: number | string | null = null) => {
            if (typeof newValue === 'string') {
                setLocalValue(newValue.replace('.', ','));

                return;
            }

            if (typeof newValue !== 'number') {
                setLocalValue('');

                return;
            }

            const sanitizedValueString = newValue.toString().replace(',', '.');

            const parsedValue = parseFloatWithDecimals({ stringValue: sanitizedValueString });

            setLocalValue(formateNumber({ number: parsedValue, isMoneyInput }));
        },
        [isMoneyInput]
    );

    const onLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        const sanitizedValue = newValue
            // Removes everything except numbers, commas and points
            .replace(NUMBER_CLEAR_REGEX, '')
            // Calculations need points for decimal indication
            .replace(',', '.');


        if (sanitizedValue.length === 0) {
            setLocalValue('');

            if (typeof onChange === 'function') {
                onChange('');
            }

            return;
        }

        let isValid = false;

        // Allows numbers, one (comma/point) and any number of decimal places
        if (isDecimalInput && DECIMAL_TEST.test(sanitizedValue)) {
            isValid = true;
        }

        // Allows numbers but excludes numbers with leading 0
        if (isMoneyInput && MONEY_TEST.test(sanitizedValue)) {
            isValid = true;
        }

        // Allows numbers but excludes numbers with leading 0
        if (!isDecimalInput && !isMoneyInput && INTEGER_TEST.test(sanitizedValue)) {
            isValid = true;
        }

        if (!isValid) {
            return;
        }

        setLocalValue(sanitizedValue.replace('.', ','));

        if (typeof onChange === 'function') {
            onChange(sanitizedValue);
        }
    };

    const onLocalBlur = () => {
        const sanitizedValue = localValue.length === 0 ? '0' : localValue;
        let isInvalid = false;

        const parsedNumber = parseFloatWithDecimals({
            stringValue: sanitizedValue.replace(',', '.'),
            decimals: isMoneyInput ? 2 : undefined
        });

        if (parsedNumber > maxNumber || parsedNumber < minNumber) {
            isInvalid = true;
        }

        setIsValueInvalid(isInvalid);

        setLocalValue(
            localValue.length === 0
                ? ''
                : formateNumber({
                    number: parsedNumber,
                    isMoneyInput,
                })
        );

        if (typeof onBlur === 'function') {
            onBlur(parsedNumber === 0 ? null : parsedNumber, isInvalid);
        }
    };

    const onFocus = () => {
        setIsValueInvalid(false);
        setLocalValue(localValue.replaceAll('.', ''));
    };

    useEffect(() => {
        handleChange(value);
    }, [handleChange, value]);

    return (
        <Input
            inputMode="decimal"
            onChange={onLocalChange}
            value={localValue}
            placeholder={localPlaceholder}
            onBlur={onLocalBlur}
            onFocus={onFocus}
            isDisabled={isDisabled}
            isInvalid={isValueInvalid}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
