import React, { FC } from 'react';
import { CommunicationContent } from '@chayns-components/communication';

const Component: FC = () => (
    <CommunicationContent
        breakPoint={720}
        content={
            <div>
                <div>Subject: Project update</div>
                <div>From: Alex Taylor</div>
                <div>This content is shown as a side panel or overlay depending on the width.</div>
            </div>
        }
        overlayContentConfig={{ minHeight: 64, topOffset: 24 }}
        shouldShowContent
        sideContentConfig={{ initialWidth: 360, maxWidth: 520, minWidth: 280 }}
    >
        <div>
            <div>Conversation overview</div>
            <div>Latest message preview</div>
            <div>Selected thread content</div>
        </div>
    </CommunicationContent>
);

Component.displayName = 'Component';

export default Component;
