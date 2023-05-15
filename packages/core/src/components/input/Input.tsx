import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    FocusEventHandler,
    HTMLInputTypeAttribute,
    KeyboardEventHandler,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    StyledInput,
    StyledInputContent,
    StyledInputField,
    StyledMotionInputLabel,
} from './Input.styles';

export type InputProps = {
    /**
     * Disables the input so that it cannot be changed anymore
     */
    isDisabled?: boolean;
    /**
     * Function that is executed when the input field loses focus
     */
    onBlur?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when the text of the input changes
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when the input field is focused
     */
    onFocus?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when a letter is pressed
     */
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Element to be displayed next to or instead of the "placeholder"
     */
    placeholderElement?: ReactNode;
    /**
     * Input type set for input element (e.g. 'text', 'number' or 'password')
     */
    type?: HTMLInputTypeAttribute;
    /**
     * Value if the input field should be controlled
     */
    value?: string;
};

const Input: FC<InputProps> = ({
    isDisabled,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    placeholderElement,
    type = 'text',
    value,
}) => {
    const [hasValue, setHasValue] = useState(typeof value === 'string' && value !== '');

    const handleInputFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setHasValue(event.target.value !== '');

            if (typeof onChange === 'function') {
                onChange(event);
            }
        },
        [onChange]
    );

    useEffect(() => {
        if (typeof value === 'string') {
            setHasValue(value !== '');
        }
    }, [value]);

    const labelPosition = useMemo(() => {
        if (hasValue) {
            return { bottom: -8, right: -6 };
        }

        return { left: 0, top: 0 };
    }, [hasValue]);

    return (
        <StyledInput className="beta-chayns-input" isDisabled={isDisabled}>
            <StyledInputContent>
                <StyledInputField
                    disabled={isDisabled}
                    onBlur={onBlur}
                    onChange={handleInputFieldChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    value={value}
                    type={type}
                />
                <StyledMotionInputLabel
                    animate={{ scale: hasValue ? 0.6 : 1 }}
                    initial={false}
                    layout
                    style={{ ...labelPosition, originX: 1, originY: 1 }}
                    transition={{ type: 'tween' }}
                >
                    {placeholderElement}
                    {placeholder}
                </StyledMotionInputLabel>
            </StyledInputContent>
        </StyledInput>
    );
};

Input.displayName = 'Input';

export default Input;
