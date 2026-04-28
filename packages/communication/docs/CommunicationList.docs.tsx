import React from 'react';
import { CommunicationList, SortType } from '@chayns-components/communication';

const Component = () => {
    return (
        <div>
            <CommunicationList
                emptyMessage="Keine Nachrichten vorhanden."
                itemRenderer={() => {}}
                items={[]}
                sortType={SortType.DATE}
            />
        </div>
    );
};

Component.displayName = 'Component';

export default Component;
