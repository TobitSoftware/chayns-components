import { Meta, StoryFn } from '@storybook/react';
import EmojiPickerPopup from '../src/components/emoji-picker-popup/EmojiPickerPopup';

export default {
    title: 'EmojiInput/EmojiPickerPopup',
    component: EmojiPickerPopup,
    args: {},
} as Meta<typeof EmojiPickerPopup>;

const Template: StoryFn<typeof EmojiPickerPopup> = ({ ...args }) => <EmojiPickerPopup {...args} />;

export const General = Template.bind({});
