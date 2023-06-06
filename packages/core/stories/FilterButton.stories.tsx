import { ComponentMeta, ComponentStory } from '@storybook/react';
import FilterButton from '../src/components/filter-button/FilterButton';
import { FilterButtonSize } from '../src/components/filter-button/types';

export default {
    title: 'Core/FilterButton',
    component: FilterButton,
    args: {
        items: [
            {
                id: '1',
                text: 'Essen',
                color: 'red',
                icons: ['fa fa-burger'],
            },
            {
                id: '2',
                text: 'Getränke',
                color: 'green',
                icons: ['fa fa-bottle-water'],
            },
            {
                id: '3',
                text: 'Nachtisch',
                color: 'blue',
                icons: ['fa fa-pie'],
            },
            {
                id: '4',
                text: 'Snacks',
                color: 'purple',
                icons: ['fa fa-cookie'],
            },
        ],
    },
} as ComponentMeta<typeof FilterButton>;

const Template: ComponentStory<typeof FilterButton> = (args) => <FilterButton {...args} />;

export const General = Template.bind({});

export const FilterButtonWithSmallButtons = Template.bind({});

export const FilterButtonWithSelectedIds = Template.bind({});

FilterButtonWithSmallButtons.args = {
    size: FilterButtonSize.Small,
};

FilterButtonWithSelectedIds.args = {
    selectedItemIds: ['1', '3'],
};
