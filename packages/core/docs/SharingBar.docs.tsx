import React, { FC } from 'react';
import { SharingBar, ContextMenuAlignment } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <SharingBar
            label="Teilen"
            link="https://www.google.com"
            popupAlignment={ContextMenuAlignment.TopLeft}
        />
    );
};

Component.displayName = 'Component';

export default Component;
