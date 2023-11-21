import { Meta, StoryFn } from '@storybook/react';
import EmojiPicker from '../src/components/emoji-picker/EmojiPicker';

export default {
    title: 'EmojiInput/EmojiPicker',
    component: EmojiPicker,
    args: {},
} as Meta<typeof EmojiPicker>;

const Template: StoryFn<typeof EmojiPicker> = ({ ...args }) => <EmojiPicker {...args} />;

export const General = Template.bind({});
