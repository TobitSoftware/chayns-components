import React, { FC } from 'react';
import { Popup } from '@chayns-components/core';

const Component: FC = () => {
    const popupContent = <div>Lorem</div>;

    return <Popup content={popupContent}>Lorem</Popup>;
};

Component.displayName = 'Component';

export default Component;
