import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { NUMBER_CLEAR_REGEX } from '../../constants/numberInput';
import { formateNumber, isValidString, parseFloatWithDecimals } from '../../utils/numberInput';
import Input from '../input/Input';

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
     * Whether the value is invalid.
     */
    isInvalid?: boolean;
    /**
     * Applies rules for money input.
     * Rules: only two decimal places, one zero before the comma
     */
    isMoneyInput?: boolean;
    /**
     * Whether the value should be formatted as a time.
     */
    isTimeInput?: boolean;
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
    onBlur?: (newNumber: number | string | null, isInvalid: boolean) => void;
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
     * Whether only the bottom border should be displayed
     */
    shouldShowOnlyBottomBorder?: boolean;
    /**
     * The value, that should be displayed in the input, when it is in focus.
     * You can also pass a stringified number as default value.
     * NOTE: If you pass a stringified number, it will be formatted to the selected format
     */
    value?: string;
};

const NumberInput: FC<NumberInputProps> = ({
    isDecimalInput,
    isMoneyInput,
    isTimeInput,
    isInvalid,
    maxNumber = Infinity,
    value,
    placeholder,
    onBlur,
    isDisabled,
    onChange,
    shouldShowOnlyBottomBorder,
    minNumber = -Infinity,
}) => {
    // the plainText will be shown in the input, when it is in focus
    const [plainText, setPlainText] = useState<string>('');
    // the formattedValue will be shown in the input, when it is not in focus
    const [formattedValue, setFormattedValue] = useState<string>('');
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const [shouldRemainPlaceholder, setShouldRemainPlaceholder] = useState<boolean>(false);

    const [isValueInvalid, setIsValueInvalid] = useState(false);
    const localPlaceholder = placeholder ?? (isMoneyInput ? '€' : undefined);

    const onLocalChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;

        const sanitizedValueString = newValue
            // Removes everything except numbers, commas and points
            .replace(NUMBER_CLEAR_REGEX, '');

        if (
            isTimeInput &&
            ((sanitizedValueString.includes(':') && sanitizedValueString.length > 5) ||
                (!sanitizedValueString.includes(':') && sanitizedValueString.length > 4))
        ) {
            return;
        }

        const valueToCheck = sanitizedValueString.replaceAll(',', '.');

        if (!isValidString({ string: valueToCheck, isMoneyInput, isDecimalInput, isTimeInput })) {
            return;
        }

        if (
            (maxNumber && Number(valueToCheck) > maxNumber) ||
            (minNumber && Number(valueToCheck) < minNumber)
        ) {
            return;
        }

        if (newValue.length === 1 && newValue.match(/^[0-9]+$/) === null) {
            setShouldRemainPlaceholder(true);
        } else {
            setShouldRemainPlaceholder(false);
        }

        setPlainText(sanitizedValueString.replaceAll('.', ','));

        if (typeof onChange === 'function') {
            onChange(sanitizedValueString.replaceAll('.', ','));
        }
    };

    const onLocalBlur = () => {
        const sanitizedValue = plainText.length === 0 ? '0' : plainText;
        let newIsInvalid = false;
        let parsedNumber = null;

        if (!isTimeInput) {
            parsedNumber = parseFloatWithDecimals({
                stringValue: sanitizedValue.replace(',', '.').replaceAll(':', '').replace('€', ''),
                decimals: isMoneyInput ? 2 : undefined,
            });

            if (parsedNumber !== 0 && (parsedNumber > maxNumber || parsedNumber < minNumber)) {
                newIsInvalid = true;
            }

            setIsValueInvalid(newIsInvalid);
        }

        const newStringValue =
            plainText.length === 0
                ? ''
                : formateNumber({
                      number: isTimeInput ? sanitizedValue : parsedNumber,
                      isMoneyInput,
                      isTimeInput,
                  });

        setFormattedValue(`${newStringValue} ${isMoneyInput ? '€' : ''}`);

        setPlainText(newStringValue.replaceAll('.', ''));
        setHasFocus(false);

        if (typeof onChange === 'function') {
            onChange(newStringValue.replaceAll('.', ''));
        }

        if (typeof onBlur === 'function') {
            if (isTimeInput) {
                onBlur(newStringValue, newIsInvalid);
            } else {
                onBlur(parsedNumber === 0 ? null : parsedNumber, newIsInvalid);
                console.log('parsedNumber', parsedNumber);
            }
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

    // updates the formattedValue, when the value changes
    useEffect(() => {
        let parsedNumber = null;

        if (!isTimeInput) {
            parsedNumber = parseFloatWithDecimals({
                stringValue: plainText.replace(',', '.').replaceAll(':', ''),
                decimals: isMoneyInput ? 2 : undefined,
            });

            // checks, if a given number is invalid, if the input is not in focus
            if (!hasFocus) {
                setIsValueInvalid(parsedNumber > maxNumber || parsedNumber < minNumber);
            }
        }

        setFormattedValue(
            plainText.length === 0
                ? ''
                : `${formateNumber({
                      number: isTimeInput ? plainText : parsedNumber,
                      isMoneyInput,
                      isTimeInput,
                  })}${isMoneyInput ? ' €' : ''}`,
        );
    }, [hasFocus, isMoneyInput, isTimeInput, maxNumber, minNumber, plainText]);

    useEffect(() => {
        if (typeof value === 'string') {
            setPlainText(value);
        }
    }, [value]);
    return (
        <Input
            shouldRemainPlaceholder={shouldRemainPlaceholder}
            shouldShowOnlyBottomBorder={shouldShowOnlyBottomBorder}
            inputMode="decimal"
            onChange={onLocalChange}
            value={hasFocus ? plainText : formattedValue}
            placeholder={localPlaceholder}
            onBlur={onLocalBlur}
            onFocus={onLocalFocus}
            isDisabled={isDisabled}
            isInvalid={typeof isInvalid === 'boolean' ? isInvalid : isValueInvalid}
            shouldShowCenteredContent={shouldShowOnlyBottomBorder}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export default NumberInput;
