import { ComponentMeta, ComponentStory } from '@storybook/react';
import OpacitySlider from '../src/components/opacity-slider/OpacitySlider';

export default {
    title: 'ColorPicker/OpacitySlider',
    component: OpacitySlider,
    args: {
        color: 'purple',
    },
} as ComponentMeta<typeof OpacitySlider>;

const Template: ComponentStory<typeof OpacitySlider> = ({ ...args }) => <OpacitySlider {...args} />;

export const General = Template.bind({});
