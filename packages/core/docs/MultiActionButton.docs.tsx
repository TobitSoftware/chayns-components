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
                onClick: () => console.log('Primary'),
            }}
            secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
                onClick: () => console.log('Secondary'),
                status: {
                    type: MultiActionButtonStatusType.Pulse,
                    pulseColor: 'rgba(255, 0, 0, 0.6)',
                },
            }}
            backgroundColor="#0b6b3a"
        />
    );
};

Component.displayName = 'Component';

export default Component;
