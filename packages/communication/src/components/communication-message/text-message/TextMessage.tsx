import React, { FC } from 'react';
import CommunicationMessage from '../CommunicationMessage';
import { CommunicationMessageProps } from '../CommunicationMessage.types';

const TextMessage: FC<CommunicationMessageProps> = ({
    metadata,
    shouldShowStatus,
    shouldShowAuthorName,
    shouldShowAuthorImage,
    shouldShowTimestamp,
    content,
    timestampFormatter,
    alignment,
    options,
}) => (
    <CommunicationMessage
        metadata={metadata}
        content={content}
        alignment={alignment}
        timestampFormatter={timestampFormatter}
        shouldShowStatus={shouldShowStatus}
        shouldShowTimestamp={shouldShowTimestamp}
        shouldShowAuthorName={shouldShowAuthorName}
        shouldShowAuthorImage={shouldShowAuthorImage}
        options={options}
    />
);

TextMessage.displayName = 'CommunicationMessage.Text';

export default TextMessage;
