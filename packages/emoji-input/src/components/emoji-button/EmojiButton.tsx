import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, useState } from 'react';
import Icon from '../../../../core/src/components/icon/Icon';
import type { EmojiInputProps } from '../emoji-input/EmojiInput';
import { StyledEmojiButton } from './EmojiButton.styles';

export type EmojiButtonProps = {
    design: EmojiInputProps['design'];
    icon?: string;
    isDisabled: EmojiInputProps['isDisabled'];
};

export const EmojiButton: FC<EmojiButtonProps> = ({ icon, isDisabled, design }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <MotionConfig transition={{ type: 'tween' }}>
            <StyledEmojiButton design={design}>
                <Icon
                    icons={[icon || 'fas fa-smile']}
                    isDisabled={isDisabled}
                    shouldStopPropagation
                    size={18}
                />
            </StyledEmojiButton>
            <AnimatePresence initial={false}>{showPopup && <></>}</AnimatePresence>
        </MotionConfig>
    );
};
