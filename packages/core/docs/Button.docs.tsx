import React, { FC } from 'react';
import { Button } from '@chayns-components/core';

const Component: FC = () => {
    const handleClick = () => {
        console.log('Click');
    };

    return <Button onClick={handleClick}>Click me!</Button>;
};

Component.displayName = 'Component';

export default Component;
