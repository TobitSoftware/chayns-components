import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CommunicationList, SortType } from '../src';
import { ListItem } from '@chayns-components/core';

const getDateWithOffset = (days: number, hour = 10, minute = 0): string => {
    const date = new Date();

    date.setDate(date.getDate() + days);
    date.setHours(hour, minute, 0, 0);

    return date.toISOString();
};

const ALL_ITEMS = [
    {
        id: '1',
        title: 'Anton',
    },
    {
        id: '2',
        title: 'Xaver',
    },
    {
        id: '3',
        title: 'Gustav',
    },
    {
        id: '4',
        title: 'Clara',
    },
    {
        id: '5',
        title: 'Thomas',
    },
    {
        id: '6',
        title: 'Bernd',
    },
    {
        id: '7',
        title: 'Siggy',
        subtitle: getDateWithOffset(0, 9, 15),
    },
    {
        id: '8',
        title: 'Clara',
        subtitle: getDateWithOffset(0, 14, 45),
    },
    {
        id: '9',
        title: 'Bernd',
        subtitle: getDateWithOffset(-1, 11, 30),
    },
    {
        id: '10',
        title: 'Max',
        subtitle: getDateWithOffset(-1, 18, 5),
    },
    {
        id: '11',
        title: 'Gustav',
        subtitle: getDateWithOffset(-3, 8, 0),
    },
    {
        id: '12',
        title: 'Kai',
        subtitle: getDateWithOffset(-6, 16, 20),
    },
    {
        id: '13',
        title: 'Luca',
        subtitle: getDateWithOffset(-10, 12, 0),
    },
    {
        id: '14',
        title: 'Tom',
        subtitle: getDateWithOffset(-18, 10, 0),
    },
];

export default {
    title: 'Communication/CommunicationList',
    component: CommunicationList,
    args: {
        items: [],
        emptyMessage: 'Keine Ergebnisse gefunden.',
        itemRenderer: (_index, id) => {
            const item = ALL_ITEMS.find((item) => item.id === id);

            if (!item) {
                return null;
            }

            return (
                <ListItem
                    key={id}
                    title={item.title}
                    subtitle={item.subtitle}
                    icons={['fa fa-user']}
                    shouldDisableAnimation
                    shouldShowRoundImageOrIcon
                />
            );
        },
    },
} as Meta<typeof CommunicationList>;

const Template: StoryFn<typeof CommunicationList> = (args) => (
    <div style={{ width: '100%', height: 400 }}>
        <CommunicationList {...args} />
    </div>
);

export const General = Template.bind({});

export const Alphabetic = Template.bind({});

Alphabetic.args = {
    sortType: SortType.ALPHABETIC,
    items: [
        {
            id: '1',
            sortKey: 'Anton',
        },
        {
            id: '2',
            sortKey: 'Xaver',
        },
        {
            id: '3',
            sortKey: 'Gustav',
        },
        {
            id: '4',
            sortKey: 'Clara',
        },
        {
            id: '5',
            sortKey: 'Thomas',
        },
        {
            id: '6',
            sortKey: 'Bernd',
        },
    ],
};

export const DateSort = Template.bind({});

DateSort.args = {
    sortType: SortType.DATE,
    items: [
        {
            id: '7',
            sortKey: getDateWithOffset(0, 9, 15),
        },
        {
            id: '8',
            sortKey: getDateWithOffset(0, 14, 45),
        },
        {
            id: '9',
            sortKey: getDateWithOffset(-1, 11, 30),
        },
        {
            id: '10',
            sortKey: getDateWithOffset(-1, 18, 5),
        },
        {
            id: '11',
            sortKey: getDateWithOffset(-3, 8, 0),
        },
        {
            id: '12',
            sortKey: getDateWithOffset(-6, 16, 20),
        },
        {
            id: '13',
            sortKey: getDateWithOffset(-10, 12, 0),
        },
        {
            id: '14',
            sortKey: getDateWithOffset(-18, 10, 0),
        },
    ],
};
