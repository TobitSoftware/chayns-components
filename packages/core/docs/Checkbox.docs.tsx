import React, { FC } from 'react';
import { Checkbox } from '@chayns-components/core';

const Component: FC = () => {
    const handleClick = () => {
        console.log('Click');
    };

    return <Checkbox onChange={handleClick}>Click me!</Checkbox>;
};

Component.displayName = 'Component';

export default Component;
