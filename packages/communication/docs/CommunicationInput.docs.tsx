import React, { FC } from 'react';
import {
    CommunicationInput,
    CommunicationInputCornerType,
    CommunicationInputSize,
} from '@chayns-components/communication';

const Component: FC = () => (
    <CommunicationInput
        chips={[{ label: 'Project update' }]}
        cornerType={CommunicationInputCornerType.ROUNDED}
        inputConfig={{ placeholder: 'Write a message', value: '' }}
        rightElement={<span>Send</span>}
        shouldUseAudioInput
        size={CommunicationInputSize.MEDIUM}
    />
);

Component.displayName = 'Component';

export default Component;
