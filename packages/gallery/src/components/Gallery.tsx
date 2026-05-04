import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import GalleryEditor from './gallery-editor/GalleryEditor';
import type { GalleryEditorRef } from './gallery-editor/GalleryEditor.types';
import GalleryViewer from './gallery-viewer/GalleryViewer';
import type { GalleryProps, GalleryRef } from './Gallery.types';
import { GalleryViewMode } from '../types/gallery';

const Gallery = forwardRef<GalleryRef, GalleryProps>(
    (
        {
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
        },
        ref,
    ) => {
        const editorRef = useRef<GalleryEditorRef>(null);

        const handleClear = useCallback(() => {
            if (!isEditMode) {
                console.warn('Gallery.clear() can only be used in edit mode.');
                return;
            }

            editorRef.current?.clear();
        }, [isEditMode]);

        useImperativeHandle(
            ref,
            () => ({
                clear: handleClear,
            }),
            [handleClear],
        );

        return isEditMode ? (
            <GalleryEditor
                ref={editorRef}
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
    },
);

Gallery.displayName = 'Gallery';

export default Gallery;
