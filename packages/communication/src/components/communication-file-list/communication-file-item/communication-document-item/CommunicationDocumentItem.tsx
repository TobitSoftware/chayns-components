import React from 'react';
import { SmallWaitCursor, SmallWaitCursorSize, Icon } from '@chayns-components/core';
import { CommunicationFile, CommunicationLoadingState } from '../../CommunicationFileList.types';
import {
    StyledDocumentItem,
    StyledDocumentName,
    StyledRemoveButton,
    StyledLoadingOverlay,
} from './CommunicationDocumentItem.styles';

interface Props {
    file: CommunicationFile;
    onRemove?: (fileId: string) => void;
}

const CommunicationDocumentItem = ({ file, onRemove }: Props) => {
    const isUploading = file.loadingState === CommunicationLoadingState.uploading;
    const isError = file.loadingState === CommunicationLoadingState.error;

    return (
        <StyledDocumentItem>
            <StyledDocumentName>
                {file.name}
                {isError && ' ❌'}
            </StyledDocumentName>
            {isUploading && (
                <StyledLoadingOverlay>
                    <SmallWaitCursor size={SmallWaitCursorSize.MEDIUM} />
                </StyledLoadingOverlay>
            )}
            {onRemove && (
                <StyledRemoveButton onClick={() => onRemove(file.id)} title="Entfernen">
                    <Icon icons={['fa fa-times']} />
                </StyledRemoveButton>
            )}
        </StyledDocumentItem>
    );
};

export default CommunicationDocumentItem;
