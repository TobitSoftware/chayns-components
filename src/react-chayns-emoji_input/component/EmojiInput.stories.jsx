import React from 'react';
import EmojiInput from './EmojiInput';

export default {
    title: 'chayns-components/EmojiInput',
    component: EmojiInput,
};

const Template = (args) => <EmojiInput {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {};
