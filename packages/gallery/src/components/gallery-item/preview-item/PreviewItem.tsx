import { SmallWaitCursor } from '@chayns-components/core';
import React, { FC } from 'react';
import type { FileItem } from '../../../types/file';
import {
    StyledMotionPreviewItem,
    StyledPreviewItemImage,
    StyledPreviewItemImageWrapper,
    StyledPreviewItemLoadingIcon,
} from './PreviewItem.styles';

export type PreviewItemProps = {
    /**
     *  Images and videos which should be displayed
     */
    fileItem: FileItem;
};

const PreviewItem: FC<PreviewItemProps> = ({ fileItem }) => (
    <StyledMotionPreviewItem
        key={`uploading_${fileItem.id ?? ''}`}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{
            opacity: 0,
            transition: { duration: 0.2, delay: 0.2 },
        }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute' }}
    >
        <StyledPreviewItemImageWrapper>
            <StyledPreviewItemLoadingIcon>
                <SmallWaitCursor shouldShowWaitCursor shouldShowBackground={false} />
            </StyledPreviewItemLoadingIcon>
            <StyledPreviewItemImage draggable={false} src={fileItem.previewUrl} />
        </StyledPreviewItemImageWrapper>
    </StyledMotionPreviewItem>
);

PreviewItem.displayName = 'PreviewItem';

export default PreviewItem;
