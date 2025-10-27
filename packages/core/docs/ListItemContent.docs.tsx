import React, { FC } from 'react';
import { List, ListItem, ListItemContent } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <List>
            <ListItem title="Test 1">
                <ListItemContent>Lorem</ListItemContent>
            </ListItem>
        </List>
    );
};

Component.displayName = 'Component';

export default Component;
