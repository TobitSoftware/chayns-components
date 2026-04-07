import { Icon } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import React, { FC } from 'react';
import {
    StyledGalleryEditorItem,
    StyledGalleryEditorItemDeleteButton,
} from './GalleryEditorItem.styles';
import GalleryEditorMediaItem from './gallery-editor-media-item/GalleryEditorMediaItem';
import GalleryEditorPreviewItem from './gallery-editor-preview-item/GalleryEditorPreviewItem';
import type { GalleryEditorItemProps } from './GalleryEditorItem.types';

const GalleryEditorItem: FC<GalleryEditorItemProps> = ({
    fileItem,
    handleDeleteFile,
    ratio = 1,
    onClick,
}) => {
    const mediaContent =
        !fileItem.state ||
        fileItem.state === 'none' ||
        (!fileItem.previewUrl && !fileItem.uploadedFile) ? null : fileItem.state === 'uploading' ? (
            <GalleryEditorPreviewItem
                ratio={ratio}
                key={`uploading_${fileItem.id ?? ''}`}
                fileItem={fileItem}
            />
        ) : (
            <GalleryEditorMediaItem
                key={`uploaded_${fileItem.id ?? ''}`}
                fileItem={fileItem}
                ratio={ratio}
                openSelectedFile={onClick}
            />
        );

    return (
        <StyledGalleryEditorItem>
            <StyledGalleryEditorItemDeleteButton onClick={() => handleDeleteFile(fileItem.id)}>
                <Icon size={20} icons={['ts-wrong']} />
            </StyledGalleryEditorItemDeleteButton>
            <AnimatePresence initial={false}>{mediaContent}</AnimatePresence>
        </StyledGalleryEditorItem>
    );
};

GalleryEditorItem.displayName = 'GalleryEditorItem';

export default GalleryEditorItem;
