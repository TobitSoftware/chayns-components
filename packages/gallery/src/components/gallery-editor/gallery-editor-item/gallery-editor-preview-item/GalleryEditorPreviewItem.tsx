import { SmallWaitCursor } from '@chayns-components/core';
import React, { FC, memo } from 'react';
import {
    StyledGalleryEditorPreviewItemImage,
    StyledGalleryEditorPreviewItemImageWrapper,
    StyledGalleryEditorPreviewItemLoadingIcon,
    StyledMotionGalleryEditorPreviewItem,
} from './GalleryEditorPreviewItem.styles';
import type { GalleryEditorPreviewItemProps } from './GalleryEditorPreviewItem.types';
import { GALLERY_EDITOR_PREVIEW_FADE_DURATION_S } from '../../GalleryEditor.constants';

const GalleryEditorPreviewItem: FC<GalleryEditorPreviewItemProps> = ({ fileItem, ratio }) => (
    <StyledMotionGalleryEditorPreviewItem
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: GALLERY_EDITOR_PREVIEW_FADE_DURATION_S }}
        style={{ position: 'absolute' }}
    >
        <StyledGalleryEditorPreviewItemImageWrapper $ratio={ratio}>
            <StyledGalleryEditorPreviewItemLoadingIcon>
                <SmallWaitCursor shouldHideWaitCursor={false} shouldHideBackground />
            </StyledGalleryEditorPreviewItemLoadingIcon>
            {fileItem.previewUrl && (
                <StyledGalleryEditorPreviewItemImage draggable={false} src={fileItem.previewUrl} />
            )}
        </StyledGalleryEditorPreviewItemImageWrapper>
    </StyledMotionGalleryEditorPreviewItem>
);

GalleryEditorPreviewItem.displayName = 'GalleryEditorPreviewItem';

export default memo(GalleryEditorPreviewItem);
