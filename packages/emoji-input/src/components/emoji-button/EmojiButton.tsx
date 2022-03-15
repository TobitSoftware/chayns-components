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
    onEmojiInput: (event: any, emojiHtml: string) => void;
    ref: ForwardedRef<any>;
};

export const EmojiButton: FC<EmojiButtonProps> = React.forwardRef(
    ({ icon, isDisabled, design, onClick, onEmojiInput }, ref) => {
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
                                onEmojiInput(
                                    event,
                                    '<img style="margin: -.2ex 0.15em .2ex; height: 3ex; width: 3ex; vertical-align: middle;" alt="😀" src="https://api.chayns-static.space/emojione/4.0/png/64/1f600.png">'
                                );
                            }
                        }}
                    />
                </StyledEmojiButton>
                <AnimatePresence initial={false}>{showPopup && <></>}</AnimatePresence>
            </MotionConfig>
        );
    }
);
