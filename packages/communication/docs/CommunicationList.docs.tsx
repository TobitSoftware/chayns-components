import React, { FC } from 'react';
import { CommunicationList, SortType } from '@chayns-components/communication';

const renderItem = (_index: number, id: string) => <div key={id}>List item: {id}</div>;

const Component: FC = () => (
    <CommunicationList
        emptyMessage="No messages available."
        itemRenderer={renderItem}
        items={[{ id: 'message-1', sortKey: '2026-05-07T09:30:00.000Z' }]}
        sortType={SortType.DATE}
    />
);

Component.displayName = 'Component';

export default Component;
