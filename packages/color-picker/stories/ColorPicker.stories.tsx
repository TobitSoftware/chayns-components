import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import ColorPicker from '../src/components/color-picker/ColorPicker';
import { IPresetColor } from '../src/types';

export default {
    title: 'ColorPicker/ColorPicker',
    component: ColorPicker,
    args: {
        selectedColor: '#6a18a1',
    },
} as Meta<typeof ColorPicker>;

const Template: StoryFn<typeof ColorPicker> = ({ ...args }) => {
    const [presetColors, setPresetColors] = useState<IPresetColor[]>([
        { id: 'sgedfhgwash', color: '#15d14d', isCustom: true },
        { id: 'shedfjndxhg', color: '#e3c949', isCustom: true },
        { id: 'dhrsmjdhd', color: '#ff0099', isCustom: true },
    ]);
    const handlePresetAdd = (presetColor: IPresetColor) => {
        setPresetColors((prevState) => {
            const newPresetColors = prevState;

            newPresetColors.push(presetColor);

            return newPresetColors;
        });
    };
    const handlePresetRemove = (idToFilter: IPresetColor['id']) => {
        setPresetColors((prevState) => {
            return prevState.filter(({ id }) => id !== idToFilter);
        });
    };

    return (
        <ColorPicker
            {...args}
            onPresetColorRemove={handlePresetRemove}
            onPresetColorAdd={handlePresetAdd}
            presetColors={presetColors}
        />
    );
};

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
