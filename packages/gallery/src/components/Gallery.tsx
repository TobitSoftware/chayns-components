import React, { FC } from 'react';
import GalleryEditor from './gallery-editor/GalleryEditor';
import GalleryViewer from './gallery-viewer/GalleryViewer';
import type { GalleryProps } from './Gallery.types';
import { GalleryViewMode } from '../types/gallery';

const Gallery: FC<GalleryProps> = ({
    allowDragAndDrop = false,
    addFileIcon = 'fa fa-plus',
    doubleFileDialogMessage = 'Diese Datei ist bereits vorhanden',
    isEditMode = false,
    fileMinWidth = 100,
    files,
    maxFiles,
    onAdd,
    onFileCountChange,
    onRemove,
    viewMode = GalleryViewMode.GRID,
}) =>
    isEditMode ? (
        <GalleryEditor
            allowDragAndDrop={allowDragAndDrop}
            addFileIcon={addFileIcon}
            doubleFileDialogMessage={doubleFileDialogMessage}
            fileMinWidth={fileMinWidth}
            files={files}
            maxFiles={maxFiles}
            onAdd={onAdd}
            onFileCountChange={onFileCountChange}
            onRemove={onRemove}
        />
    ) : (
        <GalleryViewer files={files} viewMode={viewMode} />
    );

Gallery.displayName = 'Gallery';

export default Gallery;
