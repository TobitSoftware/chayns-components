import { SmallWaitCursor } from '@chayns-components/core';
import type { FileItem } from '@chayns-components/core/lib/types/file';
import React, { FC } from 'react';
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
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{
            opacity: 0,
            transition: { duration: 3.2, delay: 3.2 },
        }}
        transition={{ duration: 3.2 }}
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
