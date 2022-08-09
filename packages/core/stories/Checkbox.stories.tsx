import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from '../src/components/checkbox/Checkbox';

export default {
    title: 'Core/Checkbox',
    component: Checkbox,
    args: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = ({ children, ...args }) => (
    <Checkbox {...args}>{children}</Checkbox>
);

export const General = Template.bind({});

General.args = {
    children: 'Try me out!',
};
