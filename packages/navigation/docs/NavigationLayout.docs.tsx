import React, { FC } from 'react';
import { NavigationLayout } from '@chayns-components/navigation';

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
    return (
        <NavigationLayout config={{}} groups={[]} headerContent={<div />} selectedItemId="chat">
            <div />
        </NavigationLayout>
    );
};

Component.displayName = 'Component';

export default Component;
