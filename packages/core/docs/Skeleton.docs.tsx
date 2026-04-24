import React from 'react';
import { Skeleton } from '@chayns-components/core';

const Component = () => {
    return (
        <div>
            <Skeleton.H3 width="45%" />
            <Skeleton.Text lines={3} randomWithBounds={[55, 90]} />
            <div>
                <Skeleton.Circle size={40} />
                <div>
                    <Skeleton.Text lines={2} randomWithBounds={[60, 100]} />
                </div>
            </div>
            <Skeleton.Button />
            <div>
                <Skeleton.Badge width={24} />
                <Skeleton.Badge width={48} />
                <Skeleton.Badge width={72} />
            </div>
            <Skeleton.ListItem />
            <Skeleton.Accordion />
            <Skeleton.Box height={120} width="100%" />
        </div>
    );
};

Component.displayName = 'Component';

export default Component;
