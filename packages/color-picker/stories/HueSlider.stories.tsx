import { Meta, StoryFn } from '@storybook/react';
import HueSlider from '../src/components/hue-slider/HueSlider';
import React from 'react';

export default {
    title: 'ColorPicker/HueSlider',
    component: HueSlider,
    args: {},
} as Meta<typeof HueSlider>;

const Template: StoryFn<typeof HueSlider> = ({ ...args }) => <HueSlider {...args} />;

export const General = Template.bind({});
