import { Meta, StoryFn } from '@storybook/react';
import ColorPickerPopup from '../src/components/color-picker-popup/ColorPickerPopup';

export default {
    title: 'ColorPicker/ColorPickerPopup',
    component: ColorPickerPopup,
    args: {},
} as Meta<typeof ColorPickerPopup>;

const Template: StoryFn<typeof ColorPickerPopup> = ({ ...args }) => <ColorPickerPopup {...args} />;

export const General = Template.bind({});
