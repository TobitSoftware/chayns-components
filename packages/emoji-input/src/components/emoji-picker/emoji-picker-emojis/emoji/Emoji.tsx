import { useElementSize } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import React, { FC, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnchorAlignment } from '../../../../constants/alignment';
import { StyledEmoji } from './Emoji.styles';
import SkinTonePopup from './skin-tone-popup/SkinTonePopup';
import { skinTonePopupContentSize } from './skin-tone-popup/SkinTonePopup.styles';

type EmojiDictionaryEntry = {
    skin_tone_support: boolean;
};

export type EmojiProps = {
    emoji: string;
    isSelected: boolean;
    name: string;
    index: number;
    isSkinToneSupported: boolean;
    onPopupVisibilityChange: (isVisible: boolean) => void;
    onSelect: (emoji: string) => void;
    onRightClick: (newIndex: number) => void;
    shouldShowSkinTonePopup: boolean;
    emojiList: { [x: string]: EmojiDictionaryEntry };
};

const Emoji: FC<EmojiProps> = ({
    emoji,
    isSelected,
    name,
    isSkinToneSupported,
    onPopupVisibilityChange,
    onSelect,
    shouldShowSkinTonePopup,
    onRightClick,
    index,
    emojiList,
}) => {
    const emojiRef = useRef<HTMLDivElement>(null);
    const emojiSize = useElementSize(emojiRef);
    const parentSize = useElementSize(emojiRef, { shouldUseParentElement: true });
    const [parentScrollTop, setParentScrollTop] = useState(0);

    const handleClick = useCallback(() => {
        onSelect(emoji);
    }, [emoji, onSelect]);

    useEffect(() => {
        const parentElement = emojiRef.current?.parentElement;

        if (!parentElement) {
            return () => {};
        }

        const updateScrollTop = () => {
            setParentScrollTop(parentElement.scrollTop);
        };

        const animationFrame = window.requestAnimationFrame(updateScrollTop);

        parentElement.addEventListener('scroll', updateScrollTop);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            parentElement.removeEventListener('scroll', updateScrollTop);
        };
    }, []);

    const skinTonePopupLayout = useMemo(() => {
        if (!shouldShowSkinTonePopup || !isSkinToneSupported || !emojiSize || !parentSize) {
            return {
                anchorAlignment: AnchorAlignment.Top,
                anchorOffset: 0,
                overlayPosition: { top: parentScrollTop },
                position: { left: 0, top: 0 },
            };
        }

        const {
            height: elementHeight,
            left: elementLeft,
            top: elementTop,
            width: elementWidth,
        } = emojiSize;
        const { height: parentHeight, left: parentLeft, width: parentWidth } = parentSize;

        let anchorAlignment = AnchorAlignment.Top;
        let anchorOffset = 0;

        let left = elementLeft - parentLeft - skinTonePopupContentSize.width / 2 + elementWidth / 2;
        let top = elementTop + elementHeight + parentScrollTop;

        const maxLeft = parentWidth - skinTonePopupContentSize.width - 12;
        const minLeft = 12;

        if (left < minLeft) {
            anchorOffset = left - minLeft;
            left = minLeft;
        } else if (left > maxLeft) {
            anchorOffset = left - maxLeft;
            left = maxLeft;
        }

        if (top + skinTonePopupContentSize.height > parentHeight + parentScrollTop) {
            anchorAlignment = AnchorAlignment.Bottom;
            top -= elementHeight + skinTonePopupContentSize.height;
        }

        return {
            anchorAlignment,
            anchorOffset,
            overlayPosition: { top: parentScrollTop },
            position: { left, top },
        };
    }, [emojiSize, isSkinToneSupported, parentScrollTop, parentSize, shouldShowSkinTonePopup]);

    const handleContextMenu = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            if (isSkinToneSupported) {
                onRightClick(index);
                onPopupVisibilityChange(true);
            }
        },
        [index, isSkinToneSupported, onPopupVisibilityChange, onRightClick],
    );

    const handleHidePopup = useCallback(() => {
        onPopupVisibilityChange(false);
    }, [onPopupVisibilityChange]);

    return (
        <StyledEmoji
            ref={emojiRef}
            $isSelected={isSelected}
            data-emoji={emoji}
            data-name={name}
            data-skin-tone-support={isSkinToneSupported}
            className="prevent-lose-focus"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
        >
            {emoji}
            <AnimatePresence initial={false}>
                {shouldShowSkinTonePopup && isSkinToneSupported && (
                    <SkinTonePopup
                        anchorAlignment={skinTonePopupLayout.anchorAlignment}
                        anchorOffset={skinTonePopupLayout.anchorOffset}
                        emoji={emoji}
                        key={emoji}
                        onHidePopup={handleHidePopup}
                        onSelect={onSelect}
                        overlayPosition={skinTonePopupLayout.overlayPosition}
                        position={skinTonePopupLayout.position}
                        emojiList={emojiList}
                    />
                )}
            </AnimatePresence>
        </StyledEmoji>
    );
};

Emoji.displayName = 'Emoji';

export default Emoji;
