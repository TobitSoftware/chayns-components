import React, { FC, memo, useCallback } from 'react';
import MediaContent from '../../media-content/MediaContent';
import {
    StyledGalleryViewerItem,
    StyledGalleryViewerMoreItemsIndicator,
} from './GalleryViewerItem.styles';
import type { GalleryViewerItemProps } from './GalleryViewerItem.types';

const GalleryViewerItem: FC<GalleryViewerItemProps> = ({
    fileItem,
    shouldLoadImages = true,
    ratio = 1,
    remainingItemsLength,
    onClick,
}) => {
    const handleClick = useCallback(() => onClick(fileItem), [fileItem, onClick]);

    return (
        <StyledGalleryViewerItem>
            <MediaContent
                file={fileItem.file}
                onClick={handleClick}
                ratio={ratio}
                shouldLoadImages={shouldLoadImages}
            />
            {remainingItemsLength && (
                <StyledGalleryViewerMoreItemsIndicator onClick={handleClick}>
                    <p>{`+ ${remainingItemsLength - 3}`}</p>
                </StyledGalleryViewerMoreItemsIndicator>
            )}
        </StyledGalleryViewerItem>
    );
};

GalleryViewerItem.displayName = 'GalleryViewerItem';

export default memo(GalleryViewerItem);
