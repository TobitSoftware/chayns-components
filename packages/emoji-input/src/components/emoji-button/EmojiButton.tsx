import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, ForwardedRef, MouseEventHandler, useState } from 'react';
import Icon from '../../../../core/src/components/icon/Icon';
import type { EmojiInputProps } from '../emoji-input/EmojiInput';
import { StyledEmojiButton } from './EmojiButton.styles';

export type EmojiButtonProps = {
    design: EmojiInputProps['design'];
    icon?: string;
    isDisabled: EmojiInputProps['isDisabled'];
    onClick: MouseEventHandler<HTMLSpanElement>;
    ref: ForwardedRef<any>;
};

export const EmojiButton: FC<EmojiButtonProps> = React.forwardRef(
    ({ icon, isDisabled, design, onClick }, ref) => {
        const [showPopup, setShowPopup] = useState(false);

        return (
            <MotionConfig transition={{ type: 'tween' }}>
                <StyledEmojiButton ref={ref} design={design}>
                    <Icon
                        icons={[icon || 'far fa-smile']}
                        isDisabled={isDisabled}
                        shouldStopPropagation
                        size={18}
                        onClick={(event) => {
                            if (!isDisabled) {
                                onClick(event);
                                console.log('Emoji Popup');
                                setShowPopup(!showPopup);
                            }
                        }}
                    />
                </StyledEmojiButton>
                <AnimatePresence initial={false}>{showPopup && <></>}</AnimatePresence>
            </MotionConfig>
        );
    }
);
