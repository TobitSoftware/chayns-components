import { Meta, StoryFn } from '@storybook/react';
import PersonFinder from '../src/components/person-finder/PersonFinder';
import React from 'react';

export default {
    title: 'PersonFinder/PersonFinder',
    component: PersonFinder,
    args: {},
} as Meta<typeof PersonFinder>;

const Template: StoryFn<typeof PersonFinder> = ({ ...args }) => <PersonFinder {...args} />;

export const General = Template.bind({});
