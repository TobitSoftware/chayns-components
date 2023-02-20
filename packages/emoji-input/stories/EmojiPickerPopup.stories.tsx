import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmojiPickerPopup from '../src/components/emoji-picker-popup/EmojiPickerPopup';

export default {
    title: 'EmojiInput/EmojiPickerPopup',
    component: EmojiPickerPopup,
    args: {},
} as ComponentMeta<typeof EmojiPickerPopup>;

const Template: ComponentStory<typeof EmojiPickerPopup> = ({ ...args }) => (
    <EmojiPickerPopup {...args} />
);

export const General = Template.bind({});
