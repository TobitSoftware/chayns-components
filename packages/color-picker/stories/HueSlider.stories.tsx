import { ComponentMeta, ComponentStory } from '@storybook/react';
import HueSlider from '../src/components/hue-slider/HueSlider';

export default {
    title: 'ColorPicker/HueSlider',
    component: HueSlider,
    args: {},
} as ComponentMeta<typeof HueSlider>;

const Template: ComponentStory<typeof HueSlider> = ({ ...args }) => <HueSlider {...args} />;

export const General = Template.bind({});
