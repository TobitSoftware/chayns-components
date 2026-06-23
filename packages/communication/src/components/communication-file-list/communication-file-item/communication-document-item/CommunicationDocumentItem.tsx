import React from 'react';
import { CommunicationFile } from '../../CommunicationFileList.types';
import {
    StyledCommunicationDocumentItem,
    StyledCommunicationDocumentItemIcon,
    StyledCommunicationDocumentItemInfoWrapper,
    StyledCommunicationDocumentItemMeta,
    StyledCommunicationDocumentItemName,
} from './CommunicationDocumentItem.styles';
import { getHumanSize, Icon } from '@chayns-components/core';

interface Props {
    file: CommunicationFile;
}

const CommunicationDocumentItem = ({ file }: Props) => (
    <StyledCommunicationDocumentItem>
        <StyledCommunicationDocumentItemIcon>
            <Icon icons={['fas fa-file']} size={20} />
        </StyledCommunicationDocumentItemIcon>
        <StyledCommunicationDocumentItemInfoWrapper>
            <StyledCommunicationDocumentItemName>{file.name}</StyledCommunicationDocumentItemName>
            <StyledCommunicationDocumentItemMeta>
                {file.mimeType} - {getHumanSize(file.size)}
            </StyledCommunicationDocumentItemMeta>
        </StyledCommunicationDocumentItemInfoWrapper>
    </StyledCommunicationDocumentItem>
);

export default CommunicationDocumentItem;
