import { Meta, StoryFn } from '@storybook/react';
import Badge from '../src/components/badge/Badge';
import { BadgeDesign } from '../src/components/badge/Badge.types';
import React from 'react';

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

export const SingleNumber = Template.bind({});

export const Empty = Template.bind({});

export const Border = Template.bind({});

SingleNumber.args = {
    backgroundColor: '#ff0000',
    children: '4',
    fontColor: '#ffffff',
};

Empty.args = {
    children: undefined,
};

Border.args = {
    children: 'SYSTEM',
    design: BadgeDesign.BORDER,
};
