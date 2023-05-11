import { ComponentMeta, ComponentStory } from '@storybook/react';
import Slider from '../src/components/slider/Slider';

export default {
    title: 'Core/Slider',
    component: Slider,
    args: {
        maxValue: 100,
        minValue: 0,
    },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const General = Template.bind({});
