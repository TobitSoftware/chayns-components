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

const GalleryViewer: FC<GalleryViewerProps> = ({ files, viewMode = GalleryViewMode.GRID }) => {
    const fileItems = files ?? [];

    const ratio = useMemo(() => getGalleryRatio(fileItems), [fileItems]);

    const handleOpenFiles = useCallback(
        (file: FileItem) => {
            openKnownFiles(fileItems, file);
        },
        [fileItems],
    );

    const visibleItems = fileItems.slice(0, 4);

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
                        remainingItemsLength={
                            fileItems.length > 4 && index === 3 ? fileItems.length : undefined
                        }
                    />
                ))}
            </StyledGalleryViewerItemWrapper>
        </StyledGalleryViewer>
    );
};

GalleryViewer.displayName = 'GalleryViewer';

export default GalleryViewer;
