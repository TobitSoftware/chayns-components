import type { FileItem } from '@chayns-components/core';
import React, { FC, useCallback, useMemo } from 'react';
import GalleryViewerItem from './gallery-viewer-item/GalleryViewerItem';
import { StyledGalleryViewer, StyledGalleryViewerItemWrapper } from './GalleryViewer.styles';
import type { GalleryViewerProps } from './GalleryViewer.types';
import {
    getGalleryRatio,
    getGalleryViewerKey,
    getReadOnlyItemRatio,
    openKnownFiles,
} from '../../utils/gallery';
import { GalleryViewMode } from '../../types/gallery';
import { GALLERY_VIEWER_MAX_VISIBLE_ITEMS } from './GalleryViewer.constants';

const GalleryViewer: FC<GalleryViewerProps> = ({
    files,
    shouldLoadImages = true,
    viewMode = GalleryViewMode.GRID,
}) => {
    const fileItems = useMemo(() => files ?? [], [files]);

    const ratio = useMemo(() => getGalleryRatio(fileItems), [fileItems]);

    const handleOpenFiles = useCallback(
        (file: FileItem) => {
            openKnownFiles(fileItems, file);
        },
        [fileItems],
    );

    const visibleItems = useMemo(
        () => fileItems.slice(0, GALLERY_VIEWER_MAX_VISIBLE_ITEMS),
        [fileItems],
    );

    return (
        <StyledGalleryViewer>
            <StyledGalleryViewerItemWrapper
                $ratio={ratio}
                $itemCount={fileItems.length}
                $viewMode={viewMode}
            >
                {visibleItems.map((file, index) => (
                    <GalleryViewerItem
                        key={getGalleryViewerKey(file, index)}
                        fileItem={file}
                        onClick={handleOpenFiles}
                        ratio={getReadOnlyItemRatio({ fileItems, index, viewMode })}
                        shouldLoadImages={shouldLoadImages}
                        remainingItemsLength={
                            fileItems.length > GALLERY_VIEWER_MAX_VISIBLE_ITEMS && index === 3
                                ? fileItems.length
                                : undefined
                        }
                    />
                ))}
            </StyledGalleryViewerItemWrapper>
        </StyledGalleryViewer>
    );
};

GalleryViewer.displayName = 'GalleryViewer';

export default GalleryViewer;
