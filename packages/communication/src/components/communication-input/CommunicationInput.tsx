import React, { forwardRef, useMemo, useRef, useState } from 'react';
import {
    StyledCommunicationInput,
    StyledCommunicationInputSideElement,
    StyledCommunicationInputWrapper,
    StyledMotionCommunicationInputEmojiInputWrapper,
    StyledMotionCommunicationInputInner,
    StyledMotionCommunicationInputSpacer,
    StyledMotionIconWrapper,
} from './CommunicationInput.styles';
import {
    CommunicationInputProps,
    CommunicationInputRef,
    CommunicationInputCornerType,
    CommunicationInputSize,
} from './CommunicationInput.types';
import { ContextMenu, ContextMenuRef, Icon } from '@chayns-components/core';
import DynamicLayout from './dynamic-layout/DynamicLayout';
import { EmojiInput } from '@chayns-components/emoji-input';
import {
    useCommunicationInputAnimation,
    useCommunicationInputEvents,
    useCommunicationInputRef,
    useCommunicationInputStyles,
} from './CommunicationInput.hooks';
import Chips from './chips/Chips';
import AudioInput from '../audio-input/AudioInput';
import { AnimatePresence } from 'motion/react';

const CommunicationInput = forwardRef<CommunicationInputRef, CommunicationInputProps>(
    (
        {
            size = CommunicationInputSize.MEDIUM,
            cornerType = CommunicationInputCornerType.DYNAMIC,
            contextMenuItems,
            rightElement,
            audioInputConfig,
            shouldUseAudioInput,
            inputConfig,
            shouldUseInitialAnimation = false,
            chips,
            topContent,
        },
        ref,
    ) => {
        const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

        const contextMenuRef = useRef<ContextMenuRef>(null);

        const {
            onFullHeightToggle,
            shouldShowFullHeightToggle,
            isFullHeight,
            onBlur,
            onFocus,
            ref: wrapperRef,
            isMultiLine,
            isFocused,
            onStop,
            onStart,
            isAudioInputOpen,
        } = useCommunicationInputEvents({ inputConfig, audioInputConfig, disableEvents: false });

        const shouldShowInputInBottomRow = useMemo(() => {
            if (chips) {
                return false;
            }

            return !isMultiLine;
        }, [chips, isMultiLine]);

        const { borderRadius, outerHeight, innerHeight, fontSize } = useCommunicationInputStyles({
            cornerType,
            isMultiLine,
            isInputInBottomRow: shouldShowInputInBottomRow,
            size,
        });
        const { startInitialAnimation, initial, animate, transition, shouldShowOnlyRightElement } =
            useCommunicationInputAnimation({
                shouldUseInitialAnimation,
                borderRadius,
                height: outerHeight,
            });
        const { emojiInputRef, audioInputRef } = useCommunicationInputRef({
            ref,
            startInitialAnimation,
        });

        const leftElement = useMemo(() => {
            if (!contextMenuItems) {
                return null;
            }

            return (
                <StyledCommunicationInputSideElement $height={innerHeight}>
                    <StyledMotionIconWrapper
                        onClick={() =>
                            isContextMenuOpen
                                ? contextMenuRef.current?.hide()
                                : contextMenuRef.current?.show()
                        }
                        animate={{ rotate: isContextMenuOpen ? 45 : 0 }}
                    >
                        <ContextMenu
                            shouldDisableClick
                            items={contextMenuItems}
                            onHide={() => setIsContextMenuOpen(false)}
                            onShow={() => setIsContextMenuOpen(true)}
                            ref={contextMenuRef}
                        >
                            <Icon icons={['fa fa-plus']} size={fontSize} />
                        </ContextMenu>
                    </StyledMotionIconWrapper>
                </StyledCommunicationInputSideElement>
            );
        }, [contextMenuItems, fontSize, innerHeight, isContextMenuOpen]);

        return (
            <StyledCommunicationInput $height={outerHeight}>
                <StyledCommunicationInputWrapper>
                    <StyledMotionCommunicationInputInner
                        $isFocused={isFocused}
                        animate={animate}
                        initial={initial}
                        transition={transition}
                    >
                        {shouldShowOnlyRightElement ? (
                            <StyledCommunicationInputSideElement $height={innerHeight}>
                                {rightElement}
                            </StyledCommunicationInputSideElement>
                        ) : (
                            <>
                                {topContent}
                                <DynamicLayout
                                    shouldShowInputInBottomRow={shouldShowInputInBottomRow}
                                    shouldShowFullHeightToggle={shouldShowFullHeightToggle}
                                    isFullHeight={isFullHeight}
                                    onFullHeightToggle={onFullHeightToggle}
                                    leftElement={leftElement}
                                    rightElement={
                                        rightElement && (
                                            <StyledCommunicationInputSideElement
                                                $height={innerHeight}
                                            >
                                                {rightElement}
                                            </StyledCommunicationInputSideElement>
                                        )
                                    }
                                    chipsElement={<Chips chips={chips} />}
                                >
                                    <StyledMotionCommunicationInputEmojiInputWrapper
                                        ref={wrapperRef}
                                        $height={innerHeight}
                                        $fontSize={fontSize}
                                        $size={size}
                                        animate={{ height: isFullHeight ? 513 : 'auto' }}
                                    >
                                        <EmojiInput
                                            {...inputConfig}
                                            onBlur={onBlur}
                                            onFocus={onFocus}
                                            ref={emojiInputRef}
                                        />
                                    </StyledMotionCommunicationInputEmojiInputWrapper>
                                </DynamicLayout>
                            </>
                        )}
                    </StyledMotionCommunicationInputInner>
                </StyledCommunicationInputWrapper>
                {shouldUseAudioInput && (
                    <AnimatePresence initial={false}>
                        {!isAudioInputOpen && (
                            <StyledMotionCommunicationInputSpacer
                                initial={{ width: 16 }}
                                exit={{ width: 0 }}
                                animate={{ width: 16 }}
                            />
                        )}
                    </AnimatePresence>
                )}
                {shouldUseAudioInput && (
                    <AudioInput
                        {...audioInputConfig}
                        onStart={onStart}
                        onStop={onStop}
                        ref={audioInputRef}
                    />
                )}
            </StyledCommunicationInput>
        );
    },
);

CommunicationInput.displayName = 'CommunicationInput';

export default CommunicationInput;
