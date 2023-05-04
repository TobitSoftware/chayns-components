import { Icon } from '@chayns-components/core';
import React, { FC, useCallback } from 'react';
import type { FileItem } from '../../types/file';
import {
    StyledGalleryItem,
    StyledGalleryItemDeleteButton,
    StyledGalleryItemImage,
    StyledGalleryItemMoreItemsIndicator,
    StyledGalleryItemPlayIcon,
    StyledGalleryItemVideo,
    StyledGalleryItemVideoWrapper,
} from './GalleryItem.styles';

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
     *  Ratio of the images and videos
     */
    ratio: number;
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
    ratio,
    remainingItemsLength,
}) => {
    /**
     * This function opens a selected file
     */
    const openSelectedFile = useCallback((file: FileItem) => {
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

    return (
        <StyledGalleryItem>
            {isEditMode && (
                <StyledGalleryItemDeleteButton onClick={() => handleDeleteFile(fileItem.id)}>
                    <Icon size={20} icons={['ts-wrong']} />
                </StyledGalleryItemDeleteButton>
            )}
            {fileItem.uploadedFile && 'thumbnailUrl' in fileItem.uploadedFile ? (
                <StyledGalleryItemVideoWrapper onClick={() => openSelectedFile(fileItem)}>
                    <StyledGalleryItemPlayIcon>
                        <Icon size={30} icons={['fa fa-play']} />
                    </StyledGalleryItemPlayIcon>
                    <StyledGalleryItemVideo ratio={ratio}>
                        <source src={fileItem.uploadedFile?.url} type="video/mp4" />
                    </StyledGalleryItemVideo>
                </StyledGalleryItemVideoWrapper>
            ) : (
                <StyledGalleryItemImage
                    ratio={ratio}
                    onClick={() => openSelectedFile(fileItem)}
                    draggable={false}
                    src={fileItem.uploadedFile?.url ?? fileItem.previewUrl}
                />
            )}
            {remainingItemsLength && (
                <StyledGalleryItemMoreItemsIndicator>
                    <p>{`+ ${remainingItemsLength - 3}`}</p>
                </StyledGalleryItemMoreItemsIndicator>
            )}
        </StyledGalleryItem>
    );
};

GalleryItem.displayName = 'GalleryItem';

export default GalleryItem;
