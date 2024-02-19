import { Icon } from '@chayns-components/core';
import type { InternalFileItem } from '@chayns-components/core/lib/types/file';
import React, { FC } from 'react';
import {
    StyledMediaItemImage,
    StyledMediaItemImageWrapper,
    StyledMediaItemPlayIcon,
    StyledMediaItemVideo,
    StyledMediaItemVideoWrapper,
    StyledMotionMediaItem,
} from './MediaItem.styles';

export type MediaItemProps = {
    /**
     *  Images and videos which should be displayed
     */
    fileItem: InternalFileItem;
    /**
     *  Whether images and videos can be edited
     */
    isEditMode: boolean;
    /**
     *  Function to be executed when a file is selected
     */
    openSelectedFile: (file: InternalFileItem) => void;
    /**
     * The ratio of the image
     */
    ratio: number;
};

const MediaItem: FC<MediaItemProps> = ({ fileItem, isEditMode, openSelectedFile, ratio }) => (
    <StyledMotionMediaItem
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3.2 }}
    >
        {fileItem.uploadedFile && 'thumbnailUrl' in fileItem.uploadedFile ? (
            <StyledMediaItemVideoWrapper onClick={() => openSelectedFile(fileItem)} $ratio={ratio}>
                <StyledMediaItemPlayIcon>
                    <Icon size={isEditMode ? 30 : 50} icons={['fa fa-play']} />
                </StyledMediaItemPlayIcon>
                <StyledMediaItemVideo poster={fileItem.uploadedFile.thumbnailUrl}>
                    <source src={fileItem.uploadedFile.url} type="video/mp4" />
                </StyledMediaItemVideo>
            </StyledMediaItemVideoWrapper>
        ) : (
            <StyledMediaItemImageWrapper onClick={() => openSelectedFile(fileItem)} $ratio={ratio}>
                <StyledMediaItemImage draggable={false} src={fileItem.uploadedFile?.url} />
            </StyledMediaItemImageWrapper>
        )}
    </StyledMotionMediaItem>
);

MediaItem.displayName = 'MediaItem';

export default MediaItem;
