import React, { forwardRef, useCallback, useMemo, useState, FocusEvent } from 'react';
import {
    StyledCommunicationInput,
    StyledCommunicationInputSpacer,
    StyledMotionCommunicationInputWrapper,
    StyledMotionIconWrapper,
} from './CommunicationInput.styles';
import {
    CommunicationInputProps,
    CommunicationInputRef,
    CommunicationInputTextType,
} from './CommunicationInput.types';
import { ContextMenu, Icon } from '@chayns-components/core';
import InputElement from './input-element/InputElement';
import Chips from './chips/Chips';
import DynamicLayout from './dynamic-layout/DynamicLayout';

const CommunicationInput = forwardRef<CommunicationInputRef, CommunicationInputProps>(
    (
        {
            contextMenuItems,
            rightElement,
            textType = CommunicationInputTextType.MARKDOWN,
            onChange,
            onFocus,
            onBlur,
            value,
            chips,
            isDisabled,
        },
        ref,
    ) => {
        const [isMultiLine, setIsMultiLine] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

        const shouldShowInputInBottomRow = useMemo(() => {
            if (chips) {
                return false;
            }

            return !isMultiLine;
        }, [chips, isMultiLine]);

        const shouldShowRoundedCorners = useMemo(
            () => isMultiLine || !shouldShowInputInBottomRow,
            [isMultiLine, shouldShowInputInBottomRow],
        );

        const leftElement = useMemo(() => {
            if (!contextMenuItems) {
                return null;
            }

            return (
                <ContextMenu
                    items={contextMenuItems}
                    onHide={() => setIsContextMenuOpen(false)}
                    onShow={() => setIsContextMenuOpen(true)}
                >
                    <StyledMotionIconWrapper animate={{ rotate: isContextMenuOpen ? 45 : 0 }}>
                        <Icon icons={['fa fa-plus']} size={20} />
                    </StyledMotionIconWrapper>
                </ContextMenu>
            );
        }, [contextMenuItems, isContextMenuOpen]);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLDivElement | HTMLTextAreaElement>) => {
                setIsFocused(true);

                if (typeof onFocus === 'function') {
                    onFocus(event);
                }
            },
            [onFocus],
        );

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLDivElement | HTMLTextAreaElement>) => {
                setIsFocused(false);

                if (typeof onBlur === 'function') {
                    onBlur(event);
                }
            },
            [onBlur],
        );

        return (
            <StyledCommunicationInput>
                <StyledCommunicationInputSpacer />
                <StyledMotionCommunicationInputWrapper
                    animate={{
                        borderRadius: shouldShowRoundedCorners ? 8 : 26,
                    }}
                    $isFocused={isFocused}
                >
                    <DynamicLayout
                        shouldShowInputInBottomRow={shouldShowInputInBottomRow}
                        leftElement={leftElement}
                        rightElement={rightElement}
                        chipsElement={<Chips chips={chips} />}
                    >
                        <InputElement
                            textType={textType}
                            value={value}
                            onFocus={handleFocus}
                            onChange={onChange}
                            onBlur={handleBlur}
                            isDisabled={isDisabled}
                            ref={ref}
                            isMultiLine={isMultiLine}
                            onMultiLineChange={setIsMultiLine}
                        />
                    </DynamicLayout>
                </StyledMotionCommunicationInputWrapper>
            </StyledCommunicationInput>
        );
    },
);

CommunicationInput.displayName = 'CommunicationInput';

export default CommunicationInput;
