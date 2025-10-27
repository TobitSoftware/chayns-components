import React, { FC } from 'react';
import { EmojiPickerPopup } from '@chayns-components/emoji-input';

const Component: FC = () => {
    const handleEmojiSelect = (emoji: string) => {
        console.log('Emoji:', emoji);
    };

    return <EmojiPickerPopup onSelect={handleEmojiSelect} />;
};

Component.displayName = 'Component';

export default Component;
