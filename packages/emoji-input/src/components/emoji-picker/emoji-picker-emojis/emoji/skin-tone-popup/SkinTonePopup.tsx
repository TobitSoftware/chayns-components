import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
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
    position: { left: number; top: number };
};

const SkinTonePopup: FC<SkinTonePopupProps> = ({
    anchorAlignment,
    anchorOffset,
    emoji,
    onHidePopup,
    onSelect,
    position,
}) => {
    const handleOverlayClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            onHidePopup();
        },
        [onHidePopup]
    );

    const emojis = useMemo(() => {
        const result: JSX.Element[] = [];

        Object.entries(emojiComponents).forEach(([key, value]) => {
            if (key.includes('skin_tone')) {
                const emojiWithSkinTone = addSkinToneToEmoji(emoji, value);

                const handleClick = (event: MouseEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    event.stopPropagation();

                    onSelect(emojiWithSkinTone);

                    onHidePopup();
                };

                result.push(
                    <StyledSkinTonePopupContentEmoji key={key} onClick={handleClick}>
                        {emojiWithSkinTone}
                    </StyledSkinTonePopupContentEmoji>
                );
            }
        });

        return result;
    }, [emoji, onHidePopup, onSelect]);

    return (
        <StyledMotionSkinTonePopup
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
        >
            <StyledSkinTonePopupContent
                anchorAlignment={anchorAlignment}
                anchorOffset={anchorOffset}
                style={position}
            >
                {emojis}
            </StyledSkinTonePopupContent>
            <StyledSkinTonePopupOverlay onClick={handleOverlayClick} />
        </StyledMotionSkinTonePopup>
    );
};

SkinTonePopup.displayName = 'SkinTonePopup';

export default SkinTonePopup;
