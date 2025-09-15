import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import Filter from '../src/components/filter/Filter';
import { FilterButtonSize } from '../src';
import { SortItem } from '../src/types/filter';

export default {
    title: 'Core/Filter',
    component: Filter,
    args: {},
} as Meta<typeof Filter>;

const Template: StoryFn<typeof Filter> = ({ ...args }) => {
    const [searchValue, setSearchValue] = useState('');
    const [sortItem, setSortItem] = useState<SortItem>({
        text: 'alphanumerisch',
        id: 'alphanumerisch',
    });

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleSortChange = (item: SortItem) => {
        setSortItem(item);
    };

    return (
        <Filter
            {...args}
            searchConfig={
                args.searchConfig ? { searchValue, onSearchChange: handleSearchChange } : undefined
            }
            sortConfig={
                args.sortConfig
                    ? {
                          onSortChange: handleSortChange,
                          items: args.sortConfig.items,
                          selectedItem: sortItem,
                      }
                    : undefined
            }
        />
    );
};

export const General = Template.bind({});

export const OnlySearch = Template.bind({});

export const OnlyFilterButtons = Template.bind({});

export const OnlySort = Template.bind({});

General.args = {
    headline: '',
    searchConfig: {
        searchValue: '',
        onSearchChange: () => {},
    },
    filterButtonConfig: {
        items: [
            {
                id: '1',
                text: 'Essen',
                color: 'red',
                icons: ['fa fa-burger'],
                count: 5,
            },
            {
                id: '2',
                text: 'Getränke',
                color: 'green',
                icons: ['fa fa-bottle-water'],
                count: 74,
            },
            {
                id: '3',
                text: 'Nachtisch',
                color: 'blue',
                icons: ['fa fa-pie'],
                isDisabled: true,
                count: 32,
            },
            {
                id: '4',
                text: 'Snacks',
                color: 'purple',
                icons: ['fa fa-cookie'],
                count: 45,
            },
        ],
        size: FilterButtonSize.Small,
    },
    sortConfig: {
        items: [
            { text: 'alphanumerisch', id: 'alphanumerisch' },
            { text: 'zuletzt hinzugefügt', id: 'latest' },
        ],
        selectedItem: { text: 'alphanumerisch', id: 'alphanumerisch' },
        onSortChange: () => {},
    },
};

OnlySearch.args = {
    headline: 'Suche',
    searchConfig: {
        searchValue: '',
        onSearchChange: () => {},
    },
};

OnlyFilterButtons.args = {
    headline: 'Filter',
    filterButtonConfig: {
        items: [
            {
                id: '1',
                text: 'Essen',
                color: 'red',
                icons: ['fa fa-burger'],
                count: 5,
            },
            {
                id: '2',
                text: 'Getränke',
                color: 'green',
                icons: ['fa fa-bottle-water'],
                count: 74,
            },
            {
                id: '3',
                text: 'Nachtisch',
                color: 'blue',
                icons: ['fa fa-pie'],
                isDisabled: true,
                count: 32,
            },
            {
                id: '4',
                text: 'Snacks',
                color: 'purple',
                icons: ['fa fa-cookie'],
                count: 45,
            },
        ],
        size: FilterButtonSize.Small,
    },
};

OnlySort.args = {
    headline: 'Sortierung',
    sortConfig: {
        items: [
            { text: 'alphanumerisch', id: 'alphanumerisch' },
            { text: 'zuletzt hinzugefügt', id: 'latest' },
        ],
        selectedItem: { text: 'alphanumerisch', id: 'alphanumerisch' },
        onSortChange: () => {},
    },
};
