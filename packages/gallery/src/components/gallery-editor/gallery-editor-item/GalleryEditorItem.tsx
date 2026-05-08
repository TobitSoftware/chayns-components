import { Icon } from '@chayns-components/core';
import React, { FC, ReactNode, memo } from 'react';
import {
    StyledMotionGalleryEditorItem,
    StyledGalleryEditorItemDeleteButton,
} from './GalleryEditorItem.styles';
import GalleryEditorMediaItem from './gallery-editor-media-item/GalleryEditorMediaItem';
import GalleryEditorPreviewItem from './gallery-editor-preview-item/GalleryEditorPreviewItem';
import type { GalleryEditorItemProps } from './GalleryEditorItem.types';
import {
    GALLERY_EDITOR_DELETE_BUTTON_Z_INDEX,
    GALLERY_EDITOR_ITEM_FADE_DURATION_S,
} from '../GalleryEditor.constants';

const GalleryEditorItem: FC<GalleryEditorItemProps> = ({
    fileItem,
    handleDeleteFile,
    shouldLoadImages = true,
    ratio = 1,
    onClick,
}) => {
    const shouldRenderPreview = fileItem.state === 'uploading';
    const shouldRenderMedia =
        fileItem.state !== 'none' &&
        (Boolean(fileItem.previewUrl) || Boolean(fileItem.uploadedFile));

    let mediaContent: ReactNode = null;

    if (shouldRenderPreview) {
        mediaContent = <GalleryEditorPreviewItem ratio={ratio} fileItem={fileItem} />;
    } else if (shouldRenderMedia) {
        mediaContent = (
            <GalleryEditorMediaItem
                fileItem={fileItem}
                ratio={ratio}
                openSelectedFile={onClick}
                previewUrl={fileItem.previewUrl}
                shouldLoadImages={shouldLoadImages}
            />
        );
    }

    return (
        <StyledMotionGalleryEditorItem
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: GALLERY_EDITOR_ITEM_FADE_DURATION_S }}
        >
            {mediaContent}
            <StyledGalleryEditorItemDeleteButton
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteFile(fileItem.id);
                }}
                $zIndex={GALLERY_EDITOR_DELETE_BUTTON_Z_INDEX}
                aria-label="Bild entfernen"
            >
                <Icon size={20} icons={['ts-wrong']} />
            </StyledGalleryEditorItemDeleteButton>
        </StyledMotionGalleryEditorItem>
    );
};

GalleryEditorItem.displayName = 'GalleryEditorItem';

export default memo(GalleryEditorItem);
