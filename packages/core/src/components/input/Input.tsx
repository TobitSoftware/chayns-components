import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
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
     * Function that is executed when the text of the input changes
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Value if the input field should be controlled
     */
    value?: string;
};

const Input: FC<InputProps> = ({ onChange, placeholder, value }) => {
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
        <StyledInput className="beta-chayns-input">
            <StyledInputContent>
                <StyledInputField onChange={handleInputFieldChange} />
                <StyledMotionInputLabel
                    animate={{ scale: hasValue ? 0.6 : 1 }}
                    layout
                    style={{ ...labelPosition, originX: 1, originY: 1 }}
                    transition={{ type: 'tween' }}
                >
                    {placeholder}
                </StyledMotionInputLabel>
            </StyledInputContent>
        </StyledInput>
    );
};

Input.displayName = 'Input';

export default Input;
