import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmojiInput from '../src/components/emoji-input/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Nachricht schreiben',
        value: 'Ein Test mit 🔥',
    },
} as ComponentMeta<typeof EmojiInput>;

const Template: ComponentStory<typeof EmojiInput> = ({ ...args }) => <EmojiInput {...args} />;

export const General = Template.bind({});
