import React, {
    FocusEvent,
    forwardRef,
    isValidElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    StyledInput,
    StyledInputContentWrapper,
    StyledInputField,
    StyledMotionInputAnimationElementWrapper,
    StyledMotionInputWrapper,
} from './Input.styles';
import { InputAnimationState, InputDesign, type InputProps } from './Input.types';
import { InputPlaceholderMode } from './input-placeholder/InputPlaceholder.types';
import InputPlaceholder from './input-placeholder/InputPlaceholder';
import { AnimatePresence } from 'motion/react';

const Input = forwardRef<unknown, InputProps>(
    ({
        animationElement,
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
        shouldShowExpandAnimation = false,
        shouldUseAutoFocus = false,
        value,
    }) => {
        const [animationState, setAnimationState] = useState(
            shouldShowExpandAnimation ? InputAnimationState.Idle : InputAnimationState.None,
        );

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

        useEffect(() => {
            if (shouldShowExpandAnimation) {
                setTimeout(setAnimationState, 1000, InputAnimationState.Expanding);
                setTimeout(setAnimationState, 1250, InputAnimationState.Expanded);
            }
        }, [shouldShowExpandAnimation]);

        const hasLeftElement = isValidElement(leftElement);
        const hasRightElement = isValidElement(rightElement);

        const shouldShowAnimationElement =
            isValidElement(animationElement) &&
            (animationState === InputAnimationState.Idle ||
                animationState === InputAnimationState.Expanding);

        const shouldShowWrapperElement =
            animationState === InputAnimationState.Expanded ||
            animationState === InputAnimationState.None;

        return (
            <StyledInput
                $animationState={animationState}
                $design={design}
                $isDisabled={isDisabled}
                $isFocused={isFocused}
            >
                <AnimatePresence initial={false}>
                    {shouldShowWrapperElement && (
                        <StyledMotionInputWrapper
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            key="input-wrapper"
                            transition={{ duration: 0.25, type: 'tween' }}
                        >
                            {leftElement}
                            <StyledInputContentWrapper
                                $hasLeftElement={hasLeftElement}
                                $hasRightElement={hasRightElement}
                            >
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
                                        hasLeftElement={hasLeftElement}
                                        hasRightElement={hasRightElement}
                                        hasValue={hasValue}
                                        isInvalid={isInvalid}
                                        placeholder={placeholder}
                                        placeholderMode={placeholderMode}
                                    />
                                )}
                            </StyledInputContentWrapper>
                            {rightElement}
                        </StyledMotionInputWrapper>
                    )}
                    {shouldShowAnimationElement && (
                        <StyledMotionInputAnimationElementWrapper
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            key="input-animation-element"
                            transition={{ duration: 0.25, type: 'tween' }}
                        >
                            {animationElement}
                        </StyledMotionInputAnimationElementWrapper>
                    )}
                </AnimatePresence>
            </StyledInput>
        );
    },
);

Input.displayName = 'Input';

export default Input;
