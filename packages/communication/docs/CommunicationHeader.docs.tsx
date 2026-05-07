import React, { FC } from 'react';
import { CommunicationHeader } from '@chayns-components/communication';

const handleInteraction = () => undefined;

const Component: FC = () => (
    <CommunicationHeader
        cc={[]}
        date="2026-05-07T09:30:00.000Z"
        from={{
            id: 'person-1',
            name: 'Alex Taylor',
            actions: [
                { icons: ['fa fa-envelope'], label: 'Send email', onClick: handleInteraction },
            ],
        }}
        isFullScreen={false}
        isRead={false}
        isTeamTalkActive={false}
        maxActionCount={3}
        onFullScreenToggle={handleInteraction}
        onReadToggle={handleInteraction}
        rightActions={[
            { id: 'reply', label: 'Reply', icons: ['fa fa-reply'], onClick: handleInteraction },
        ]}
        title="Project update"
        to={[
            {
                id: 'person-2',
                name: 'Jordan Miller',
                actions: [
                    { icons: ['fa fa-user'], label: 'Open profile', onClick: handleInteraction },
                ],
            },
        ]}
    />
);

Component.displayName = 'Component';

export default Component;
