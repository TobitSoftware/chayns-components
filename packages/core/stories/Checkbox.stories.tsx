import { Meta, StoryFn } from '@storybook/react';
import Checkbox from '../src/components/checkbox/Checkbox';

export default {
    title: 'Core/Checkbox',
    component: Checkbox,
    args: {},
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({ children, ...args }) => (
    <Checkbox {...args}>{children}</Checkbox>
);

export const General = Template.bind({});

General.args = {
    children: 'Try me out!',
};
