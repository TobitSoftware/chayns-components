import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Skeleton from '../src/components/skeleton';

export default {
    title: 'Core/Skeleton',
} satisfies Meta;

const BoxTemplate: StoryFn<typeof Skeleton.Box> = (args) => <Skeleton.Box {...args} />;

const CircleTemplate: StoryFn<typeof Skeleton.Circle> = (args) => <Skeleton.Circle {...args} />;

export const General = BoxTemplate.bind({});

General.args = {
    width: 100,
    height: 100,
};

export const Circle = CircleTemplate.bind({});
Circle.args = {
    size: 100,
};
