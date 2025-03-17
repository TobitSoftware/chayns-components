import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HighlightSlider from '../src/components/highlight-slider/HighlightSlider';

export default {
    title: 'Core/HighlightSlider',
    component: HighlightSlider,
    args: {
        count: 5,
    },
} as Meta<typeof HighlightSlider>;

const Template: StoryFn<typeof HighlightSlider> = ({ ...args }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <HighlightSlider
            {...args}
            currentIndex={currentIndex}
            onIndexChange={(index) => setCurrentIndex(index)}
        />
    );
};

export const General = Template.bind({});
