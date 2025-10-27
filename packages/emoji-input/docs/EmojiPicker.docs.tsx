import React, { FC } from 'react';
import { EmojiPicker } from '@chayns-components/emoji-input';

const Component: FC = () => {
    const handleEmojiSelect = (emoji: string) => {
        console.log('Emoji:', emoji);
    };

    return <EmojiPicker onSelect={handleEmojiSelect} />;
};

Component.displayName = 'Component';

export default Component;
