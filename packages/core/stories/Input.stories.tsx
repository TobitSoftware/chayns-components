import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '../src/components/input/Input';

export default {
    title: 'Core/Input',
    component: Input,
    args: {
        placeholder: 'Try me out',
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const General = Template.bind({});
