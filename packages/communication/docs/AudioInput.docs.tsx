import React, { FC } from 'react';
import {
    AudioInput,
    AudioInputPosition,
    CommunicationInputSize,
} from '@chayns-components/communication';

const Component: FC = () => (
    <AudioInput
        position={AudioInputPosition.RIGHT}
        size={CommunicationInputSize.MEDIUM}
        styleConfig={{ backgroundColor: 'var(--chayns-color--primary)', color: 'white' }}
    />
);

Component.displayName = 'Component';

export default Component;
