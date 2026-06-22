import React from 'react';
import { CommunicationFile } from '../../CommunicationFileList.types';
import { StyledDocumentItem, StyledDocumentName } from './CommunicationDocumentItem.styles';

interface Props {
    file: CommunicationFile;
}

const CommunicationDocumentItem = ({ file }: Props) => {
    const statusIndicator = file.status === 'error' ? ' ❌' : '';
    const uploadingIndicator = file.status === 'uploading' ? ' ⬆️' : '';

    return (
        <StyledDocumentItem>
            <StyledDocumentName>
                {file.name}
                {uploadingIndicator}
                {statusIndicator}
            </StyledDocumentName>
        </StyledDocumentItem>
    );
};

export default CommunicationDocumentItem;
