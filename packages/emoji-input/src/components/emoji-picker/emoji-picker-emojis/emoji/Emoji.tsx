import { AnimatePresence } from 'framer-motion';
import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { AnchorAlignment } from '../../../../constants/alignment';
import { StyledEmoji } from './Emoji.styles';
import SkinTonePopup, { SkinTonePopupProps } from './skin-tone-popup/SkinTonePopup';
import { skinTonePopupContentSize } from './skin-tone-popup/SkinTonePopup.styles';

export type EmojiProps = {
    emoji: string;
    isSkinToneSupported: boolean;
    onPopupVisibilityChange: (isVisible: boolean) => void;
    onSelect: (emoji: string) => void;
};

const Emoji: FC<EmojiProps> = ({
    emoji,
    isSkinToneSupported,
    onPopupVisibilityChange,
    onSelect,
}) => {
    const [shouldShowPopup, setShouldShowPopup] = useState(false);
    const [skinTonePopupAnchorAlignment, setSkinTonePopupAnchorAlignment] = useState(
        AnchorAlignment.Top
    );
    const [skinTonePopupAnchorOffset, setSkinTonePopupAnchorOffset] = useState(0);
    const [skinTonePopupOverlayPosition, setSkinTonePopupOverlayPosition] = useState<
        SkinTonePopupProps['overlayPosition']
    >({ top: 0 });
    const [skinTonePopupPosition, setSkinTonePopupPosition] = useState<
        SkinTonePopupProps['position']
    >({ left: 0, top: 0 });

    const handleClick = useCallback(() => {
        onSelect(emoji);
    }, [emoji, onSelect]);

    const handleContextMenu = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            const {
                currentTarget: element,
                currentTarget: { parentElement },
            } = event;

            if (parentElement) {
                const {
                    height: elementHeight,
                    left: elementLeft,
                    top: elementTop,
                    width: elementWidth,
                } = element.getBoundingClientRect();

                const {
                    height: parentHeight,
                    left: parentLeft,
                    top: parentTop,
                    width: parentWidth,
                } = parentElement.getBoundingClientRect();

                const { scrollTop } = parentElement;

                let anchorAlignment = AnchorAlignment.Top;
                let anchorOffset = 0;

                let left =
                    elementLeft -
                    parentLeft -
                    skinTonePopupContentSize.width / 2 +
                    elementWidth / 2;

                let top = elementTop - parentTop + elementHeight + scrollTop;

                const maxLeft = parentWidth - skinTonePopupContentSize.width - 12;
                const minLeft = 12;

                if (left < minLeft) {
                    anchorOffset = left - minLeft;
                    left = minLeft;
                } else if (left > maxLeft) {
                    anchorOffset = left - maxLeft;
                    left = maxLeft;
                }

                if (top + skinTonePopupContentSize.height > parentHeight + scrollTop) {
                    anchorAlignment = AnchorAlignment.Bottom;
                    top -= elementHeight + skinTonePopupContentSize.height;
                }

                if (isSkinToneSupported) {
                    setSkinTonePopupAnchorAlignment(anchorAlignment);
                    setSkinTonePopupAnchorOffset(anchorOffset);
                    setSkinTonePopupPosition({ left, top });
                    setSkinTonePopupOverlayPosition({ top: scrollTop });
                    setShouldShowPopup(true);
                }
            }
        },
        [isSkinToneSupported]
    );

    const handleHidePopup = useCallback(() => setShouldShowPopup(false), []);

    useEffect(() => {
        onPopupVisibilityChange(shouldShowPopup);
    }, [onPopupVisibilityChange, shouldShowPopup]);

    return (
        <StyledEmoji
            className="prevent-lose-focus"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
        >
            {emoji}
            <AnimatePresence initial={false}>
                {shouldShowPopup && (
                    <SkinTonePopup
                        anchorAlignment={skinTonePopupAnchorAlignment}
                        anchorOffset={skinTonePopupAnchorOffset}
                        emoji={emoji}
                        key={emoji}
                        onHidePopup={handleHidePopup}
                        onSelect={onSelect}
                        overlayPosition={skinTonePopupOverlayPosition}
                        position={skinTonePopupPosition}
                    />
                )}
            </AnimatePresence>
        </StyledEmoji>
    );
};

Emoji.displayName = 'Emoji';

export default Emoji;
