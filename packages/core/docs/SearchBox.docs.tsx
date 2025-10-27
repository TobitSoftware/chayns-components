import React, { ChangeEvent, FC } from 'react';
import { SearchBox, SearchBoxItems } from '@chayns-components/core';

const LISTS: SearchBoxItems[] = [
    {
        groupName: undefined,
        list: [
            {
                imageUrl: 'https://picsum.photos/200',
                id: '1',
                text: 'Pizza',
            },
            { imageUrl: 'https://picsum.photos/200', id: '2', text: 'Burger' },
            { imageUrl: 'https://picsum.photos/200', id: '3', text: 'Nudeln' },
            { imageUrl: 'https://picsum.photos/200', id: '4', text: 'Steak' },
            { imageUrl: 'https://picsum.photos/200', id: '5', text: 'Pommes' },
            { imageUrl: 'https://picsum.photos/200', id: '6', text: 'Reis' },
        ],
    },
];

const Component: FC = () => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    return <SearchBox onChange={handleChange} lists={LISTS} shouldAddInputToList />;
};

Component.displayName = 'Component';

export default Component;
