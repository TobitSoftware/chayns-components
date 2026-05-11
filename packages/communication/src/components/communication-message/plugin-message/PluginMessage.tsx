import React, { FC } from 'react';
import {
    CommunicationMessageAlignment,
    CommunicationMessageProps,
} from '../CommunicationMessage.types';
import CommunicationMessage from '../CommunicationMessage';

const PluginMessage: FC<
    Omit<
        CommunicationMessageProps,
        | 'alignment'
        | 'shouldShowStatus'
        | 'shouldShowTimestamp'
        | 'shouldShowAuthorName'
        | 'shouldShowAuthorImage'
    >
> = ({ metadata, options, content }) => (
    <CommunicationMessage
        metadata={metadata}
        content={content}
        options={options}
        alignment={CommunicationMessageAlignment.CENTER}
        shouldShowStatus={false}
        shouldShowAuthorName={false}
        shouldShowTimestamp
        shouldShowAuthorImage={false}
    />
);

PluginMessage.displayName = 'CommunicationMessage.Plugin';

export default PluginMessage;
