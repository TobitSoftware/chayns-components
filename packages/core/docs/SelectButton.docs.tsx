import React, { FC } from 'react';
import { SelectButton, SelectButtonItem } from '@chayns-components/core';

const LIST: SelectButtonItem[] = [
    { text: 'Salami', id: 1 },
    { text: 'Thunfisch', id: 2 },
    { text: 'Döner', id: 3 },
];

const Component: FC = () => {
    return <SelectButton buttonText="Auswählen" list={LIST} />;
};

Component.displayName = 'Component';

export default Component;
