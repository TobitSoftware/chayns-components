import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmojiPicker from '../src/components/emoji-picker/EmojiPicker';

export default {
    title: 'EmojiInput/EmojiPicker',
    component: EmojiPicker,
    args: {},
} as ComponentMeta<typeof EmojiPicker>;

const Template: ComponentStory<typeof EmojiPicker> = ({ ...args }) => <EmojiPicker {...args} />;

export const General = Template.bind({});
