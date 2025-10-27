import React, { FC } from 'react';
import { ComboBox, ComboBoxItems } from '@chayns-components/core';

const LIST: ComboBoxItems[] = [
    {
        list: [
            {
                text: 'Margherita',
                value: 1,
            },
            {
                text: 'Thunfisch',
                value: 2,
            },
        ],
    },
];

const Component: FC = () => {
    return <ComboBox lists={LIST} placeholder="Pizza auswählen" />;
};

Component.displayName = 'Component';

export default Component;
