import React, { FC } from 'react';
import { CommunicationContentProps } from './CommunicationContent.types';
import { StyledCommunicationContent } from './CommunicationContent.styles';

const CommunicationContent: FC<CommunicationContentProps> = ({}) => {
    const tetst = 0;

    return <StyledCommunicationContent>TEST</StyledCommunicationContent>;
};

CommunicationContent.displayName = 'CommunicationContent';

export default CommunicationContent;
