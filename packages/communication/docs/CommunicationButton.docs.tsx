import React, { FC } from 'react';
import { CommunicationButton, CommunicationInputSize } from '@chayns-components/communication';

const Component: FC = () => (
    <CommunicationButton
        iconColor="white"
        icons={['fa fa-paper-plane']}
        shouldFillBackground
        size={CommunicationInputSize.MEDIUM}
    />
);

Component.displayName = 'Component';

export default Component;
