import React from 'react';
import { SmallWaitCursor, SmallWaitCursorSize, Icon } from '@chayns-components/core';
import {
    CommunicationFile,
    CommunicationImage,
    CommunicationVideo,
    CommunicationLoadingState,
} from '../CommunicationFileList.types';
import CommunicationDocumentItem from './communication-document-item/CommunicationDocumentItem';
import CommunicationImageItem from './communication-image-item/CommunicationImageItem';
import CommunicationVideoItem from './communication-video-item/CommunicationVideoItem';
import {
    StyledCommunicationFileItemContainer,
    StyledCommunicationFileItemLoadingOverlay,
    StyledCommunicationFileItemRemoveButton,
} from './CommunicationFileItem.styles';
import { CommunicationInputSize } from '../../communication-input/CommunicationInput.types';

interface Props {
    file: CommunicationFile | CommunicationImage | CommunicationVideo;
    onRemove?: (fileId: string) => void;
    size: CommunicationInputSize;
}

const CommunicationFileItem = ({ file, onRemove, size }: Props) => {
    const isUploading = file.loadingState === CommunicationLoadingState.UPLOADING;
    const isError = file.loadingState === CommunicationLoadingState.ERROR;

    return (
        <StyledCommunicationFileItemContainer $size={size}>
            {file.type === 'image' && <CommunicationImageItem file={file} />}
            {file.type === 'video' && <CommunicationVideoItem file={file} />}
            {file.type === 'file' && <CommunicationDocumentItem file={file} />}

            {isUploading && (
                <StyledCommunicationFileItemLoadingOverlay>
                    <SmallWaitCursor size={SmallWaitCursorSize.Small} shouldHideBackground />
                </StyledCommunicationFileItemLoadingOverlay>
            )}

            {isError && (
                <StyledCommunicationFileItemLoadingOverlay>
                    <Icon
                        icons={['fa fa-cloud-xmark']}
                        color="var(--chayns-color--wrong)"
                        size={20}
                    />
                </StyledCommunicationFileItemLoadingOverlay>
            )}

            {onRemove && (
                <StyledCommunicationFileItemRemoveButton onClick={() => onRemove(file.id)}>
                    <Icon icons={['fa fa-times']} size={12} />
                </StyledCommunicationFileItemRemoveButton>
            )}
        </StyledCommunicationFileItemContainer>
    );
};

export default CommunicationFileItem;
