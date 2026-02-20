import React, { FC } from 'react';
import {
    MultiActionButton,
    MultiActionButtonStatusType,
} from '@chayns-components/core';

const Component: FC = () => {
    return (
        <MultiActionButton
            primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
                backgroundColor: '#0b6b3a',
                onClick: () => console.log('Primary'),
            }}
            secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
                backgroundColor: '#0f6d7e',
                onClick: () => console.log('Secondary'),
                status: {
                    type: MultiActionButtonStatusType.Pulse,
                    pulseColors: ['#A50000', '#630000'],
                },
            }}
        />
    );
};

Component.displayName = 'Component';

export default Component;
