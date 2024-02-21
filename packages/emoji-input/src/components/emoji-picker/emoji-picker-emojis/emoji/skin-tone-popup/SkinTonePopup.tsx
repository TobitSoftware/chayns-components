import React, { FC, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import emojiComponents from 'unicode-emoji-json/data-emoji-components.json';
import type { AnchorAlignment } from '../../../../../constants/alignment';
import { addSkinToneToEmoji } from '../../../../../utils/emoji';
import {
    StyledMotionSkinTonePopup,
    StyledSkinTonePopupContent,
    StyledSkinTonePopupContentEmoji,
    StyledSkinTonePopupOverlay,
} from './SkinTonePopup.styles';

export type SkinTonePopupProps = {
    anchorAlignment: AnchorAlignment;
    anchorOffset: number;
    emoji: string;
    onHidePopup: VoidFunction;
    onSelect: (emojiWithSkinTone: string) => void;
    overlayPosition: { top: number };
    position: { left: number; top: number };
};

const SkinTonePopup: FC<SkinTonePopupProps> = ({
    anchorAlignment,
    anchorOffset,
    emoji,
    onHidePopup,
    onSelect,
    overlayPosition,
    position,
}) => {
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    const skinToneRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            onHidePopup();
        },
        [onHidePopup],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                const children = skinToneRef.current?.children;
                if (children && children.length > 0) {
                    let newIndex = focusedIndex !== null ? focusedIndex : 0;

                    if (event.key === 'ArrowLeft') {
                        newIndex = (newIndex - 1) % children.length;
                    } else if (event.key === 'ArrowRight') {
                        newIndex = (newIndex + 1) % children.length;
                    }

                    // remove focus from the old element
                    if (focusedIndex !== null) {
                        const prevElement = children[focusedIndex] as HTMLDivElement;
                        prevElement.tabIndex = -1;
                    }

                    if (newIndex < 0) {
                        newIndex = children.length - 1;
                    } else if (newIndex > children.length - 1) {
                        newIndex = 0;
                    }

                    setFocusedIndex(newIndex);

                    // Set focus to the element
                    const newElement = children[newIndex] as HTMLDivElement;
                    newElement.tabIndex = 0;
                    newElement.focus();
                }
            } else if (event.key === 'Enter' && focusedIndex !== null) {
                const { dataset } = skinToneRef.current?.children[focusedIndex] as HTMLDivElement;

                const { skinTone } = dataset;

                if (!skinTone) {
                    return;
                }

                onSelect(skinTone);

                onHidePopup();
            } else if (event.key === 'Escape' && event.shiftKey) {
                event.preventDefault();

                onHidePopup();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedIndex, onHidePopup, onSelect]);

    const emojis = useMemo(() => {
        const result: JSX.Element[] = [];

        Object.entries(emojiComponents).forEach(([key, value], index) => {
            if (key.includes('skin_tone')) {
                const emojiWithSkinTone = addSkinToneToEmoji(emoji, value);

                const handleClick = (event: MouseEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    event.stopPropagation();

                    onSelect(emojiWithSkinTone);

                    onHidePopup();
                };

                result.push(
                    <StyledSkinTonePopupContentEmoji
                        key={key}
                        data-skin-tone={emojiWithSkinTone}
                        $isSelected={index === focusedIndex}
                        onClick={handleClick}
                    >
                        {emojiWithSkinTone}
                    </StyledSkinTonePopupContentEmoji>,
                );
            }
        });

        return result;
    }, [emoji, focusedIndex, onHidePopup, onSelect]);

    return (
        <StyledMotionSkinTonePopup
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
        >
            <StyledSkinTonePopupContent
                ref={skinToneRef}
                $anchorAlignment={anchorAlignment}
                $anchorOffset={anchorOffset}
                style={position}
            >
                {emojis}
            </StyledSkinTonePopupContent>
            <StyledSkinTonePopupOverlay onClick={handleOverlayClick} style={overlayPosition} />
        </StyledMotionSkinTonePopup>
    );
};

SkinTonePopup.displayName = 'SkinTonePopup';

export default SkinTonePopup;
