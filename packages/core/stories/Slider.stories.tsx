import { Meta, StoryFn } from '@storybook/react';
import Slider from '../src/components/slider/Slider';

export default {
    title: 'Core/Slider',
    component: Slider,
    args: {
        maxValue: 100,
        minValue: 0,
    },
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => <Slider {...args} />;

export const General = Template.bind({});
