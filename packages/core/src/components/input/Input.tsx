import React, { FocusEvent, forwardRef, useCallback, useRef, useState } from 'react';
import { StyledInput, StyledInputContentWrapper, StyledInputField } from './Input.styles';
import { InputDesign, type InputProps } from './Input.types';
import { InputPlaceholderMode } from './input-placeholder/InputPlaceholder.types';
import InputPlaceholder from './input-placeholder/InputPlaceholder';

const Input = forwardRef<unknown, InputProps>(
    ({
        design = InputDesign.Default,
        inputType = 'text',
        isDisabled = false,
        isInvalid = false,
        leftElement,
        onBlur,
        onChange,
        onFocus,
        placeholder = '',
        placeholderMode = InputPlaceholderMode.Default,
        rightElement,
        shouldUseAutoFocus = false,
        value,
    }) => {
        const [hasValue, setHasValue] = useState(typeof value === 'string' && value !== '');
        const [isFocused, setIsFocused] = useState(false);

        const inputFieldRef = useRef<HTMLInputElement>(null);

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setIsFocused(false);

                onBlur?.(event);
            },
            [onBlur],
        );

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setHasValue(event.target.value !== '');

                onChange?.(event);
            },
            [onChange],
        );

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setIsFocused(true);

                onFocus?.(event);
            },
            [onFocus],
        );

        return (
            <StyledInput $design={design} $isDisabled={isDisabled} $isFocused={isFocused}>
                {leftElement}
                <StyledInputContentWrapper>
                    <StyledInputField
                        $isInvalid={isInvalid}
                        autoFocus={shouldUseAutoFocus}
                        disabled={isDisabled}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        ref={inputFieldRef}
                        type={inputType}
                        value={value}
                    />
                    {placeholder && (
                        <InputPlaceholder
                            hasValue={hasValue}
                            isInvalid={isInvalid}
                            placeholder={placeholder}
                            placeholderMode={placeholderMode}
                        />
                    )}
                </StyledInputContentWrapper>
                {rightElement}
            </StyledInput>
        );
    },
);

Input.displayName = 'Input';

export default Input;
