import { ComponentMeta, ComponentStory } from '@storybook/react';
import ColorPicker from '../src/components/color-picker/ColorPicker';

export default {
    title: 'ColorPicker/ColorPicker',
    component: ColorPicker,
    args: {},
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = ({ ...args }) => (
    <ColorPicker {...args}></ColorPicker>
);

export const General = Template.bind({});
