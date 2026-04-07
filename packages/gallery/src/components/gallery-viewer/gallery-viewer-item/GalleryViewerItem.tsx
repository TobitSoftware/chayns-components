import React, { FC } from 'react';
import MediaContent from '../../media-content/MediaContent';
import {
    StyledGalleryViewerItem,
    StyledGalleryViewerMoreItemsIndicator,
} from './GalleryViewerItem.styles';
import type { GalleryViewerItemProps } from './GalleryViewerItem.types';

const GalleryViewerItem: FC<GalleryViewerItemProps> = ({
    fileItem,
    ratio = 1,
    remainingItemsLength,
    onClick,
}) => (
    <StyledGalleryViewerItem>
        <MediaContent file={fileItem.file} onClick={() => onClick(fileItem)} ratio={ratio} />
        {remainingItemsLength && (
            <StyledGalleryViewerMoreItemsIndicator onClick={() => onClick(fileItem)}>
                <p>{`+ ${remainingItemsLength - 3}`}</p>
            </StyledGalleryViewerMoreItemsIndicator>
        )}
    </StyledGalleryViewerItem>
);

GalleryViewerItem.displayName = 'GalleryViewerItem';

export default GalleryViewerItem;
