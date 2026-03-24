import { Meta, StoryFn } from '@storybook/react';
import TransparencySlider from '../src/components/transparency-slider/TransparencySlider';
import React, { useState } from 'react';

export default {
    title: 'ColorPicker/TransparencySlider',
    component: TransparencySlider,
    args: {
        color: 'rgba(255, 0, 0, 1)',
    },
} as Meta<typeof TransparencySlider>;

const Template: StoryFn<typeof TransparencySlider> = (args, { updateArgs }) => {
    const [color, setColor] = useState(args.color);

    return <TransparencySlider {...args} color={color} onChange={setColor} />;
};

export const General = Template.bind({});
