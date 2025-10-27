import React, { FC, useState } from 'react';
import { EmojiInput } from '@chayns-components/emoji-input';

const Component: FC = () => {
    const [value, setValue] = useState('');

    return <EmojiInput value={value} onInput={(event, originalText) => setValue(originalText)} />;
};

Component.displayName = 'Component';

export default Component;
