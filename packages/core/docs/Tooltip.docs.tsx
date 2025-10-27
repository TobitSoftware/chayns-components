import React, { FC } from 'react';
import { Tooltip } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <Tooltip
            item={{
                key: 'tooltip',
                text: 'Tooltip',
            }}
        >
            Lorem
        </Tooltip>
    );
};

Component.displayName = 'Component';

export default Component;
