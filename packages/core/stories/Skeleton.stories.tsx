import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Skeleton from '../src/components/skeleton';

export default {
    title: 'Core/Skeleton',
} satisfies Meta;

const BoxTemplate: StoryFn<typeof Skeleton.Box> = (args) => <Skeleton.Box {...args} />;

const CircleTemplate: StoryFn<typeof Skeleton.Circle> = (args) => <Skeleton.Circle {...args} />;

const H1Template: StoryFn<typeof Skeleton.H1> = (args) => <Skeleton.H1 {...args} />;

const H2Template: StoryFn<typeof Skeleton.H2> = (args) => <Skeleton.H2 {...args} />;

const H3Template: StoryFn<typeof Skeleton.H3> = (args) => <Skeleton.H3 {...args} />;

const H4Template: StoryFn<typeof Skeleton.H4> = (args) => <Skeleton.H4 {...args} />;

const H5Template: StoryFn<typeof Skeleton.H5> = (args) => <Skeleton.H5 {...args} />;

const H6Template: StoryFn<typeof Skeleton.H6> = (args) => <Skeleton.H6 {...args} />;

const TextTemplate: StoryFn<typeof Skeleton.Text> = (args) => <Skeleton.Text {...args} />;

export const General = BoxTemplate.bind({});

General.args = {
    width: 100,
    height: 100,
};

export const Circle = CircleTemplate.bind({});

Circle.args = {
    size: 100,
};

export const H1 = H1Template.bind({});
export const H2 = H2Template.bind({});
export const H3 = H3Template.bind({});
export const H4 = H4Template.bind({});
export const H5 = H5Template.bind({});
export const H6 = H6Template.bind({});
export const Text = TextTemplate.bind({});

Text.args = {
    lines: 3,
    randomWithBounds: [50, 90],
};
