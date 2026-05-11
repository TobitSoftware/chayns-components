import React, { FC, ReactNode } from 'react';
import { StyledSystemMessage } from './SystemMessage.styles';

interface SystemMessageProps {
    content: ReactNode;
}

const SystemMessage: FC<SystemMessageProps> = ({ content }) => (
    <StyledSystemMessage>{content}</StyledSystemMessage>
);

SystemMessage.displayName = 'CommunicationMessage.System';

export default SystemMessage;
