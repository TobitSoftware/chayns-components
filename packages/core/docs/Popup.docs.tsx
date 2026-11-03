import React, { FC } from 'react';
import { Popup } from '@chayns-components/core';
import { useSafeArea } from 'chayns-api';

const Component: FC = () => {
    const { left, right } = useSafeArea();
    const popupContent = <div>Lorem</div>;

    return (
        <Popup boundaryInsets={{ left, right }} content={popupContent}>
            Lorem
        </Popup>
    );
};

Component.displayName = 'Component';

export default Component;
