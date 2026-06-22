import React from 'react';
import { SmallWaitCursor, SmallWaitCursorSize, Icon } from '@chayns-components/core';
import { CommunicationImage, CommunicationLoadingState } from '../../CommunicationFileList.types';
import {
    StyledImage,
    StyledImageContainer,
    StyledRemoveButton,
    StyledLoadingOverlay,
} from './CommunicationImageItem.styles';

interface Props {
    file: CommunicationImage;
    onRemove?: (fileId: string) => void;
}

const CommunicationImageItem = ({ file, onRemove }: Props) => {
    const isUploading = file.loadingState === CommunicationLoadingState.uploading;
    const displayUrl = isUploading ? file.thumbnail : file.url;

    if (!displayUrl) {
        return null;
    }

    return (
        <StyledImageContainer>
            <StyledImage src={displayUrl} alt="" loading="lazy" />
            {isUploading && (
                <StyledLoadingOverlay>
                    <SmallWaitCursor size={SmallWaitCursorSize.Small} />
                </StyledLoadingOverlay>
            )}
            {onRemove && (
                <StyledRemoveButton onClick={() => onRemove(file.id)} title="Entfernen">
                    <Icon icons={['fa fa-times']} />
                </StyledRemoveButton>
            )}
        </StyledImageContainer>
    );
};

export default CommunicationImageItem;
