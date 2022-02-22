import { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmojiInput, EmojiInputMode } from '../src/components/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Platzhalter',
        mode: EmojiInputMode.Normal,
    },
} as ComponentMeta<typeof EmojiInput>;

const Template: ComponentStory<typeof EmojiInput> = (args) => <EmojiInput {...args} />;

export const General = Template.bind({});
