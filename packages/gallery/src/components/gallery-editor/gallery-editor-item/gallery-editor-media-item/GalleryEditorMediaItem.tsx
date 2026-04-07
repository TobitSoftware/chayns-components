import React, { FC } from 'react';
import MediaContent from '../../../media-content/MediaContent';
import { StyledMotionGalleryEditorMediaItem } from './GalleryEditorMediaItem.styles';
import type { GalleryEditorMediaItemProps } from './GalleryEditorMediaItem.types';

const GalleryEditorMediaItem: FC<GalleryEditorMediaItemProps> = ({
    fileItem,
    openSelectedFile,
    ratio,
}) => (
    <StyledMotionGalleryEditorMediaItem
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3.2 }}
    >
        {fileItem.uploadedFile && (
            <MediaContent
                file={fileItem.uploadedFile}
                onClick={() => openSelectedFile(fileItem)}
                playIconSize={30}
                ratio={ratio}
            />
        )}
    </StyledMotionGalleryEditorMediaItem>
);

GalleryEditorMediaItem.displayName = 'GalleryEditorMediaItem';

export default GalleryEditorMediaItem;
