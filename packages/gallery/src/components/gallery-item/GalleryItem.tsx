import { Icon } from '@chayns-components/core';
import type { FileItem } from '@chayns-components/core/src/types/file';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useMemo } from 'react';
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
     *  Function to be executed wehen a file is deleted
     */
    handleDeleteFile: (id?: string) => void;
    /**
     *  Length of the uploaded files
     */
    remainingItemsLength?: number;
};

const GalleryItem: FC<GalleryItemProps> = ({
    fileItem,
    handleDeleteFile,
    isEditMode,
    remainingItemsLength,
}) => {
    /**
     * This function opens a selected file
     */
    const openSelectedFile = useCallback((file: FileItem) => {
        if (file.state !== 'uploaded') {
            // ToDo add dialog that the file is not loaded yet

            return;
        }

        if (file.uploadedFile && 'thumbnailUrl' in file.uploadedFile) {
            // @ts-expect-error: Type is correct here
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            void chayns.openVideo(file.uploadedFile.url);

            return;
        }

        // @ts-expect-error: Type is correct here
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        void chayns.openImage([file.uploadedFile?.url], 0);
    }, []);

    return useMemo(
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
                                openSelectedFile={openSelectedFile}
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
        [fileItem, handleDeleteFile, isEditMode, openSelectedFile, remainingItemsLength]
    );
};

GalleryItem.displayName = 'GalleryItem';

export default GalleryItem;
