import { SmallWaitCursor } from '@chayns-components/core';
import React, { FC } from 'react';
import {
    StyledGalleryEditorPreviewItemImage,
    StyledGalleryEditorPreviewItemImageWrapper,
    StyledGalleryEditorPreviewItemLoadingIcon,
    StyledMotionGalleryEditorPreviewItem,
} from './GalleryEditorPreviewItem.styles';
import type { GalleryEditorPreviewItemProps } from './GalleryEditorPreviewItem.types';

const GalleryEditorPreviewItem: FC<GalleryEditorPreviewItemProps> = ({ fileItem, ratio }) => (
    <StyledMotionGalleryEditorPreviewItem
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{
            opacity: 0,
            transition: { duration: 3.2, delay: 3.2 },
        }}
        transition={{ duration: 3.2 }}
        style={{ position: 'absolute' }}
    >
        <StyledGalleryEditorPreviewItemImageWrapper $ratio={ratio}>
            <StyledGalleryEditorPreviewItemLoadingIcon>
                <SmallWaitCursor shouldHideWaitCursor={false} shouldHideBackground />
            </StyledGalleryEditorPreviewItemLoadingIcon>
            <StyledGalleryEditorPreviewItemImage draggable={false} src={fileItem.previewUrl} />
        </StyledGalleryEditorPreviewItemImageWrapper>
    </StyledMotionGalleryEditorPreviewItem>
);

GalleryEditorPreviewItem.displayName = 'GalleryEditorPreviewItem';

export default GalleryEditorPreviewItem;
