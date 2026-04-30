import React, { FC, ReactNode } from 'react';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import {
    StyledInputBottomRow,
    StyledInputContent,
    StyledInputLayoutWrapper,
} from './InputContent.styles';

interface InputContentProps {
    inputElement: ReactNode;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    shouldShowInputInBottomRow: boolean;
}

const InputContent: FC<InputContentProps> = ({
    inputElement,
    leftElement,
    rightElement,
    shouldShowInputInBottomRow,
}) => (
    <LayoutGroup>
        <StyledInputContent>
            <AnimatePresence>
                {!shouldShowInputInBottomRow && (
                    <StyledInputLayoutWrapper layout>{inputElement}</StyledInputLayoutWrapper>
                )}
            </AnimatePresence>
            <StyledInputBottomRow>
                {leftElement}
                <AnimatePresence>
                    {shouldShowInputInBottomRow && (
                        <StyledInputLayoutWrapper layout>{inputElement}</StyledInputLayoutWrapper>
                    )}
                </AnimatePresence>
                {rightElement}
            </StyledInputBottomRow>
        </StyledInputContent>
    </LayoutGroup>
);

InputContent.displayName = 'InputContent';

export default InputContent;
