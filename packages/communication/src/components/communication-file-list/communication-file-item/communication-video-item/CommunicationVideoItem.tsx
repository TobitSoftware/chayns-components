import React from 'react';
import { SmallWaitCursor, SmallWaitCursorSize, Icon } from '@chayns-components/core';
import { CommunicationVideo, CommunicationLoadingState } from '../../CommunicationFileList.types';
import {
    StyledVideo,
    StyledVideoContainer,
    StyledRemoveButton,
    StyledLoadingOverlay,
} from './CommunicationVideoItem.styles';

interface Props {
    file: CommunicationVideo;
    onRemove?: (fileId: string) => void;
}

const CommunicationVideoItem = ({ file, onRemove }: Props) => {
    const isUploading = file.loadingState === CommunicationLoadingState.uploading;
    // Video: Immer Thumbnail anzeigen, auch wenn hochgeladen. Controls nur wenn url vorhanden.
    const showVideo = file.url && !isUploading;

    return (
        <StyledVideoContainer>
            {showVideo ? (
                <StyledVideo controls preload="metadata" poster={file.thumbnail}>
                    <source src={file.url} />
                </StyledVideo>
            ) : (
                <img
                    src={
                        file.thumbnail ||
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3C/svg%3E'
                    }
                    alt=""
                    style={{ width: '100%', display: 'block', borderRadius: '8px' }}
                />
            )}
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
        </StyledVideoContainer>
    );
};

export default CommunicationVideoItem;
