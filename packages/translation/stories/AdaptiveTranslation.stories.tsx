import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { AdaptiveTranslation } from '../src';

export default {
    title: 'Translation/AdaptiveTranslation',
    component: AdaptiveTranslation,
    args: {},
} as Meta<typeof AdaptiveTranslation>;

const Template: StoryFn<typeof AdaptiveTranslation> = ({ ...args }) => (
    <AdaptiveTranslation {...args} />
);

export const General = Template.bind({});

General.args = {
    children: 'Hallo',
    from: undefined,
    to: undefined,
};
