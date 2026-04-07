import React, { FC } from 'react';
import { MultiActionButton } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <MultiActionButton
            primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
                backgroundColor: '#0b6b3a',
                onClick: () => console.log('Primary'),
            }}
            secondaryContextMenu={[
                {
                    icons: ['fa fa-play'],
                    key: 'start',
                    onClick: () => console.log('Start'),
                    text: 'Starten',
                },
                {
                    icons: ['fa fa-stop'],
                    key: 'stop',
                    onClick: () => console.log('Stop'),
                    text: 'Beenden',
                },
            ]}
        />
    );
};

Component.displayName = 'Component';

export default Component;
