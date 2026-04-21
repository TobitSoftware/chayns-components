import React, { FC } from 'react';
import { DynamicToolbar, DynamicToolbarSpacer } from '@chayns-components/navigation';

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
    return (
        <div>
            <p>Der Spacer reserviert Platz oberhalb einer fixierten Toolbar.</p>
            <DynamicToolbarSpacer />
            <DynamicToolbar activeItemId="chat" items={[]} />
        </div>
    );
};

Component.displayName = 'Component';

export default Component;
