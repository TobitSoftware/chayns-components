import React, { FC } from 'react';
import { List, ListItem } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <List>
            <ListItem title="Test 1" />
            <ListItem title="Test 2" />
            <ListItem title="Test 3" />
        </List>
    );
};

Component.displayName = 'Component';

export default Component;
