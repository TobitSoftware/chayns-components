import React, { FC, memo } from 'react';
import MediaContent from '../../../media-content/MediaContent';
import { StyledMotionGalleryEditorMediaItem } from './GalleryEditorMediaItem.styles';
import type { GalleryEditorMediaItemProps } from './GalleryEditorMediaItem.types';
import { GALLERY_EDITOR_MEDIA_FADE_DURATION_S } from '../../GalleryEditor.constants';

const GalleryEditorMediaItem: FC<GalleryEditorMediaItemProps> = ({
    fileItem,
    openSelectedFile,
    previewUrl,
    shouldLoadImages = true,
    ratio,
}) => (
    <StyledMotionGalleryEditorMediaItem
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: GALLERY_EDITOR_MEDIA_FADE_DURATION_S }}
    >
        {fileItem.uploadedFile && (
            <MediaContent
                file={fileItem.uploadedFile}
                onClick={() => openSelectedFile(fileItem)}
                playIconSize={30}
                previewUrl={previewUrl}
                ratio={ratio}
                shouldLoadImages={shouldLoadImages}
            />
        )}
    </StyledMotionGalleryEditorMediaItem>
);

GalleryEditorMediaItem.displayName = 'GalleryEditorMediaItem';

export default memo(GalleryEditorMediaItem);
