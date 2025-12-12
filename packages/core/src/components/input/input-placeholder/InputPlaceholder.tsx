import React, { FC, useMemo } from 'react';
import { StyledMotionInputPlaceholder } from './InputPlaceholder.styles';
import { InputPlaceholderMode, type InputPlaceholderProps } from './InputPlaceholder.types';

const InputPlaceholder: FC<InputPlaceholderProps> = ({
    hasLeftElement,
    hasRightElement,
    hasValue,
    isInvalid,
    placeholder,
    placeholderMode,
}) => {
    const labelPosition = useMemo(() => {
        if (hasValue && placeholderMode === InputPlaceholderMode.Floating) {
            return { bottom: 0, right: hasRightElement ? 6 : 12 };
        }

        return { left: hasLeftElement ? 6 : 12 };
    }, [hasLeftElement, hasRightElement, hasValue, placeholderMode]);

    return (
        <StyledMotionInputPlaceholder
            $hasValue={hasValue}
            $isInvalid={isInvalid}
            $placeholderMode={placeholderMode}
            initial={false}
            layout="position"
            style={{ ...labelPosition }}
            transition={{ duration: 0.2, type: 'tween' }}
        >
            {placeholder}
        </StyledMotionInputPlaceholder>
    );
};

InputPlaceholder.displayName = 'InputPlaceholder';

export default InputPlaceholder;
