import React, { FC } from 'react';
import { Popup, PopupContent } from '@chayns-components/core';

const Component: FC = () => {
    const popupContent = <PopupContent>Lorem</PopupContent>;

    return <Popup content={popupContent}>Lorem</Popup>;
};

Component.displayName = 'Component';

export default Component;
