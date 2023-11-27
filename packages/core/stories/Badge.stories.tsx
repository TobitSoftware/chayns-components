import { Meta, StoryFn } from '@storybook/react';
import Badge from '../src/components/badge/Badge';

export default {
    title: 'Core/Badge',
    component: Badge,
    args: {
        children: '10.000 Euro',
    },
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = ({ children, ...args }) => (
    <Badge {...args}>{children}</Badge>
);

export const General = Template.bind({});
