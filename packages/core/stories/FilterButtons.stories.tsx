import { Meta, StoryFn } from '@storybook/react';
import FilterButtons from '../src/components/filter-buttons/FilterButtons';
import { FilterButtonSize } from '../src/types/filterButtons';
import React, { useState } from 'react';

export default {
    title: 'Core/FilterButtons',
    component: FilterButtons,
    args: {
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
    },
} as Meta<typeof FilterButtons>;

const Template: StoryFn<typeof FilterButtons> = (args) => <FilterButtons {...args} />;

export const General = Template.bind({});

export const FilterButtonWithSmallButtons = Template.bind({});

export const FilterButtonWithSelectedIds: StoryFn<typeof FilterButtons> = (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['1', '3']);

    return <FilterButtons {...args} selectedItemIds={selectedIds} onSelect={setSelectedIds} />;
};

FilterButtonWithSmallButtons.args = {
    size: FilterButtonSize.Small,
};
