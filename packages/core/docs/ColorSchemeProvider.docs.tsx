import React, { FC } from 'react';
import { ColorSchemeProvider } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <ColorSchemeProvider>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel finibus nunc, a cursus
            magna.
        </ColorSchemeProvider>
    );
};

Component.displayName = 'Component';

export default Component;
