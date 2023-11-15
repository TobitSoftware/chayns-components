import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import Input from '../input/Input';
import { NUMBER_CLEAR_REGEX } from './constants/number';
import { formateNumber, isValidString, parseFloatWithDecimals } from './utils/number';

export type NumberInputProps = {
    /**
     * Applies rules for decimal input.
     * Enables the user to input one zero as number before the comma
     */
    isDecimalInput?: boolean;
    /**
     * Whether the input is disabled
     */
    isDisabled?: boolean;
    /**
     * Applies rules for money input.
     * Rules: only two decimal places, one zero before the comma
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
     * Callback function that is called when the input changes
     * It will pass the text from the input
     */
    onChange?: (newValue: string) => void;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * The value, that should be displayed in the input, when it is in focus.
     * You can also pass a stringified number as default value.
     * NOTE: If you pass a stringified number, it will be formatted to the selected format
     */
    value?: string;
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
        minNumber = -Infinity
    }) => {
    // the plainText will be shown in the input, when it is in focus
    const [plainText, setPlainText] = useState<string>('');
    // the formattedValue will be shown in the input, when it is not in focus
    const [formattedValue, setFormattedValue] = useState<string>('');
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const [isValueInvalid, setIsValueInvalid] = useState(false);
    const localPlaceholder = placeholder ?? (isMoneyInput ? '€' : undefined);


    const onLocalChange: ChangeEventHandler<HTMLInputElement> =
        (event) => {
            const newValue = event.target.value;

            const sanitizedValueString = newValue
                // Removes everything except numbers, commas and points
                .replace(NUMBER_CLEAR_REGEX, '');

            const valueToCheck = sanitizedValueString.replaceAll(',', '.');

            if (!isValidString({ string: valueToCheck, isMoneyInput, isDecimalInput })) {
                return;
            }

            setPlainText(sanitizedValueString.replaceAll('.', ','));

            if (typeof onChange === 'function') {
                onChange(sanitizedValueString.replaceAll('.', ','));
            }
        };

    const onLocalBlur = () => {
        const sanitizedValue = plainText.length === 0 ? '0' : plainText;
        let isInvalid = false;

        const parsedNumber = parseFloatWithDecimals({
            stringValue: sanitizedValue.replace(',', '.'),
            decimals: isMoneyInput ? 2 : undefined
        });

        if (parsedNumber !== 0 && (parsedNumber > maxNumber || parsedNumber < minNumber)) {
            isInvalid = true;
        }

        setIsValueInvalid(isInvalid);

        const newStringValue = plainText.length === 0
            ? ''
            : formateNumber({
                number: parsedNumber,
                isMoneyInput,
            });

        setFormattedValue(newStringValue);
        setPlainText(newStringValue.replaceAll('.', ''));
        setHasFocus(false);

        if (typeof onChange === 'function') {
            onChange(newStringValue.replaceAll('.', ''));
        }

        if (typeof onBlur === 'function') {
            onBlur(parsedNumber === 0 ? null : parsedNumber, isInvalid);
        }
    };

    const onLocalFocus = () => {
        // formattedValue will be a number string with german number format (e.g. 1.000,00)
        // It will remove all dots, so that the user can type in the number
        setPlainText(formattedValue.replaceAll('.', ''));

        // This will update the external state
        if (typeof onChange === 'function') {
            onChange(formattedValue.replaceAll('.', ''));
        }

        setIsValueInvalid(false);
        setHasFocus(true);
    };

    useEffect(() => {
        const parsedNumber = parseFloatWithDecimals({
            stringValue: plainText.replace(',', '.'),
            decimals: isMoneyInput ? 2 : undefined
        });

        setFormattedValue(plainText.length === 0
            ? ''
            : formateNumber({
                number: parsedNumber,
                isMoneyInput,
            }))
    }, [isMoneyInput, plainText]);

    useEffect(() => {
        if (typeof value === 'string') {
            setPlainText(value);
        }
    }, [value]);

    return (
        <Input
            inputMode="decimal"
            onChange={onLocalChange}
            value={hasFocus ? plainText : formattedValue}
            placeholder={localPlaceholder}
            onBlur={onLocalBlur}
            onFocus={onLocalFocus}
            isDisabled={isDisabled}
            isInvalid={isValueInvalid}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
