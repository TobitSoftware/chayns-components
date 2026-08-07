import React, { useRef } from 'react';
import {
    SmallWaitCursor,
    SmallWaitCursorSize,
    Icon,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
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
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

interface Props {
    file: CommunicationFile | CommunicationImage | CommunicationVideo;
    onRemove?: (fileId: string) => void;
    size: CommunicationInputSize;
    shouldEnableKeyboardHighlighting?: boolean;
}

const CommunicationFileItem = ({
    file,
    onRemove,
    size,
    shouldEnableKeyboardHighlighting,
}: Props) => {
    const { t } = useTranslation();
    const isUploading = file.loadingState === CommunicationLoadingState.UPLOADING;
    const isError = file.loadingState === CommunicationLoadingState.ERROR;
    const removeButtonRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        onRemove ? shouldEnableKeyboardHighlighting : false,
    );

    useFocusRingPortal(removeButtonRef, {
        isEnabled: shouldShowKeyboardHighlighting,
        shape: 'circle',
        padding: 3,
    });

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
                <StyledCommunicationFileItemRemoveButton
                    aria-label={t(textStrings.communicationFileItem.accessibility.remove)}
                    onClick={() => onRemove(file.id)}
                    ref={removeButtonRef}
                    type="button"
                >
                    <Icon icons={['fa fa-times']} size={12} />
                </StyledCommunicationFileItemRemoveButton>
            )}
        </StyledCommunicationFileItemContainer>
    );
};

export default CommunicationFileItem;
