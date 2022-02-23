import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, useState } from 'react';
import Icon from '../../../../core/src/components/icon/Icon';
import { StyledEmojiButton } from './EmojiButton.styles';

export type EmojiButtonProps = {
    icon?: string;
};

export const EmojiButton: FC<EmojiButtonProps> = ({ icon }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <MotionConfig transition={{ type: 'tween' }}>
            <StyledEmojiButton>
                <Icon icons={[icon || 'fas fa-smile']} shouldStopPropagation />
            </StyledEmojiButton>
            <AnimatePresence initial={false}>{showPopup && <></>}</AnimatePresence>
        </MotionConfig>
    );
};
