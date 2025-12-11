import { Meta, StoryFn } from '@storybook/react';
import PersonFinder from '../src/components/person-finder/PersonFinder';
import React from 'react';
import { PersonFinderFilterTypes } from '../src';

export default {
    title: 'PersonFinder/PersonFinder',
    component: PersonFinder,
    args: {},
} as Meta<typeof PersonFinder>;

const Template: StoryFn<typeof PersonFinder> = ({ ...args }) => <PersonFinder {...args} />;

export const General = Template.bind({});

export const UACGroups = Template.bind({});

export const WithUACFilter = Template.bind({});

export const WithOwnEntries = Template.bind({});

UACGroups.args = {
    filterTypes: [PersonFinderFilterTypes.UAC],
};

WithUACFilter.args = {
    uacFilter: [{ groupId: -1 }],
};

WithOwnEntries.args = {
    entries: [
        {
            type: PersonFinderFilterTypes.PERSON,
            id: 'test1',
            firstName: 'Test',
            lastName: '1',
            isVerified: false,
            commonSites: 0,
        },
        {
            type: PersonFinderFilterTypes.PERSON,
            id: 'test2',
            firstName: 'Test',
            lastName: '2',
            isVerified: false,
            commonSites: 0,
        },
        {
            type: PersonFinderFilterTypes.PERSON,
            id: 'test3',
            firstName: 'Test',
            lastName: '3',
            isVerified: false,
            commonSites: 0,
        },
    ],
};
