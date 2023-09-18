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
     * The number that should be displayed formatted in the input field. NOTE: A zero as number is not allowed
     */
    number: number | null;
    /**
     * The placeholder that should be in the input
     */
    placeholder?: string;
    /**
     * Callback function that is called when the input gets out of focus
     */
    onNumberChange: (newNumber: number | null) => void;
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
        onNumberChange,
        isDisabled
    }) => {
    const [stringValue, setStringValue] = useState<string>('');

    const handleChange = useCallback((newValue: number | null = null) => {
        if (typeof newValue !== 'number') {
            setStringValue('');

            return;
        }

        const parsedValue = parseFloatAndRound({ stringValue: newValue?.toString() });

        setStringValue(formateNumber({ number: parsedValue, isMoneyInput }));
    }, [isMoneyInput]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        const sanitizedValue = newValue
            // Removes everything except numbers and commas (decimals should be indicated with a comma)
            .replace(NUMBER_CLEAR_REGEX, '')
            // Calculations need points for decimal indication
            .replace(',', '.');

        if (sanitizedValue.trim().length > 0) {

            // Allows numbers, a comma and any number of decimal places
            if (isDecimalInput && DECIMAL_TEST.test(sanitizedValue)) {
                const parsedNumber = parseFloatAndRound({ stringValue: sanitizedValue });

                if (parsedNumber > maxNumber) {
                    return;
                }

                setStringValue(sanitizedValue.replace('.', ','));

                return;
            }

            // Allows numbers, a comma and 2 numbers of decimal places
            if (isMoneyInput && MONEY_TEST.test(sanitizedValue)) {
                const parsedNumber = parseFloatAndRound({
                    stringValue: sanitizedValue,
                    decimals: 2,
                });

                if (parsedNumber > maxNumber) {
                    return;
                }

                setStringValue(sanitizedValue.replace('.', ','));

                return;
            }

            // Allows numbers but excludes numbers with leading 0
            if (INTEGER_TEST.test(sanitizedValue)) {
                const parsedNumber = Number(sanitizedValue);

                if (parsedNumber > maxNumber) {
                    return;
                }

                setStringValue(sanitizedValue);
            }
        } else {
            setStringValue('');
        }
    };

    const onBlur = () => {
        const sanitizedValue = stringValue.length === 0 ? '0' : stringValue;
        const parsedValue = parseFloatAndRound({ stringValue: sanitizedValue });

        setStringValue(
            stringValue.length === 0
                ? ''
                : formateNumber({
                    number: parsedValue,
                    isMoneyInput
                })
        );

        onNumberChange(parsedValue === 0 ? null : parsedValue);
    };

    const onFocus = () => {
        setStringValue(stringValue.replaceAll('.', ''));
    };

    useEffect(() => {
        handleChange(number);
    }, [handleChange, number]);

    return (
        <Input
            onChange={onChange}
            value={stringValue}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            isDisabled={isDisabled}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
