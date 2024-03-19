import { Meta, StoryFn } from '@storybook/react';
import ColorPicker from '../src/components/color-picker/ColorPicker';

export default {
    title: 'ColorPicker/ColorPicker',
    component: ColorPicker,
    args: {
        selectedColor: '#6a18a1',
    },
} as Meta<typeof ColorPicker>;

const Template: StoryFn<typeof ColorPicker> = ({ ...args }) => <ColorPicker {...args} />;

export const General = Template.bind({});
export const WithPresetColors = Template.bind({});
export const WithTransparencySlider = Template.bind({});
export const WithMoreOptions = Template.bind({});
export const ShowPlain = Template.bind({});

WithPresetColors.args = {
    shouldShowPresetColors: true,
};
WithTransparencySlider.args = {
    shouldShowTransparencySlider: true,
};
WithMoreOptions.args = {
    shouldShowMoreOptions: true,
};
ShowPlain.args = {
    shouldShowAsPopup: false,
};
