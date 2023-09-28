import { Icon } from '@chayns-components/core';
import type { FileItem } from '@chayns-components/core/lib/types/file';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useMemo } from 'react';
import {
    StyledGalleryItem,
    StyledGalleryItemDeleteButton,
    StyledGalleryItemMoreItemsIndicator,
} from './GalleryItem.styles';
import MediaItem from './media-item/MediaItem';
import PreviewItem from './preview-item/PreviewItem';

export type GalleryItemProps = {
    /**
     *  Images and videos which should be displayed
     */
    fileItem: FileItem;
    /**
     *  Whether images and videos can be edited
     */
    isEditMode: boolean;
    /**
     *  Function to be executed when a file is deleted
     */
    handleDeleteFile: (id?: string) => void;
    /**
     *  Length of the uploaded files
     */
    remainingItemsLength?: number;
    /**
     * Function to be executed if a file should be opened
     */
    onClick: (file: FileItem) => void;
};

const GalleryItem: FC<GalleryItemProps> = ({
    fileItem,
    handleDeleteFile,
    isEditMode,
    remainingItemsLength,
    onClick,
}) =>
    useMemo(
        () => (
            <StyledGalleryItem>
                {isEditMode && (
                    <StyledGalleryItemDeleteButton onClick={() => handleDeleteFile(fileItem.id)}>
                        <Icon size={20} icons={['ts-wrong']} />
                    </StyledGalleryItemDeleteButton>
                )}
                {!fileItem.state ||
                fileItem.state === 'none' ||
                (!fileItem.previewUrl && !fileItem.uploadedFile) ? null : (
                    <AnimatePresence initial={false}>
                        {fileItem.state === 'uploading' ? (
                            <PreviewItem
                                key={`uploading_${fileItem.id ?? ''}`}
                                fileItem={fileItem}
                            />
                        ) : (
                            <MediaItem
                                key={`uploaded_${fileItem.id ?? ''}`}
                                fileItem={fileItem}
                                isEditMode={isEditMode}
                                openSelectedFile={onClick}
                            />
                        )}
                    </AnimatePresence>
                )}
                {remainingItemsLength && (
                    <StyledGalleryItemMoreItemsIndicator>
                        <p>{`+ ${remainingItemsLength - 3}`}</p>
                    </StyledGalleryItemMoreItemsIndicator>
                )}
            </StyledGalleryItem>
        ),
        [fileItem, handleDeleteFile, isEditMode, onClick, remainingItemsLength]
    );

GalleryItem.displayName = 'GalleryItem';

export default GalleryItem;
