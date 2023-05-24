import { ComponentMeta, ComponentStory } from '@storybook/react';
import ColorPicker from '../src/components/color-picker/ColorPicker';

export default {
    title: 'Core/ColorPicker',
    component: ColorPicker,
    args: {},
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = (args) => <ColorPicker {...args} />;

export const General = Template.bind({});
