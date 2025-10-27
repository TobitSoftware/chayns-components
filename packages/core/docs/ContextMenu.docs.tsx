import React, { FC } from 'react';
import { ContextMenu, ContextMenuItem } from '@chayns-components/core';

const ITEMS: ContextMenuItem[] = [
    {
        icons: ['fa fa-pencil'],
        key: 'rename',
        onClick: () => alert('Option "Umbenennen" wurde geklickt...'),
        text: 'Umbenennen',
    },
    {
        icons: ['fa fa-eye'],
        key: 'show',
        onClick: () => alert('Option "Einblenden" wurde geklickt...'),
        text: 'Einblenden',
        shouldShowSpacer: true,
    },
    {
        icons: ['fa fa-trash'],
        key: 'delete',
        onClick: () => alert('Option "Löschen" wurde geklickt...'),
        text: 'Löschen',
    },
];

const Component: FC = () => {
    return <ContextMenu items={ITEMS} />;
};

Component.displayName = 'Component';

export default Component;
