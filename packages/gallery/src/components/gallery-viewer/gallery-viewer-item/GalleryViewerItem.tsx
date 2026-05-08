import React, { FC, memo } from 'react';
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
}) => (
    <StyledGalleryViewerItem>
        <MediaContent
            file={fileItem.file}
            onClick={() => onClick(fileItem)}
            ratio={ratio}
            shouldLoadImages={shouldLoadImages}
        />
        {remainingItemsLength && (
            <StyledGalleryViewerMoreItemsIndicator onClick={() => onClick(fileItem)}>
                <p>{`+ ${remainingItemsLength - 3}`}</p>
            </StyledGalleryViewerMoreItemsIndicator>
        )}
    </StyledGalleryViewerItem>
);

GalleryViewerItem.displayName = 'GalleryViewerItem';

export default memo(GalleryViewerItem);
