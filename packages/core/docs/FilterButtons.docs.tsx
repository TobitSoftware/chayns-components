import React, { FC } from 'react';
import { FilterButtons, FilterButtonItem } from '@chayns-components/core';

const ITEMS: FilterButtonItem[] = [
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
];

const Component: FC = () => {
    return <FilterButtons items={ITEMS} />;
};

Component.displayName = 'Component';

export default Component;
