import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import GalleryEditor from './gallery-editor/GalleryEditor';
import type { GalleryEditorRef } from './gallery-editor/GalleryEditor.types';
import GalleryViewer from './gallery-viewer/GalleryViewer';
import type { GalleryProps, GalleryRef } from './Gallery.types';
import {
    DEFAULT_GALLERY_IS_EDIT_MODE,
    DEFAULT_GALLERY_SHOULD_LOAD_IMAGES,
    DEFAULT_GALLERY_VIEW_MODE,
} from './Gallery.constants';
import {
    DEFAULT_GALLERY_EDITOR_ADD_FILE_ICON,
    DEFAULT_GALLERY_EDITOR_ALLOW_DRAG_AND_DROP,
    DEFAULT_GALLERY_EDITOR_DOUBLE_FILE_DIALOG_MESSAGE,
    DEFAULT_GALLERY_EDITOR_FILE_MIN_WIDTH,
} from './gallery-editor/GalleryEditor.constants';

const Gallery = forwardRef<GalleryRef, GalleryProps>(
    (
        {
            allowDragAndDrop = DEFAULT_GALLERY_EDITOR_ALLOW_DRAG_AND_DROP,
            addFileIcon = DEFAULT_GALLERY_EDITOR_ADD_FILE_ICON,
            doubleFileDialogMessage = DEFAULT_GALLERY_EDITOR_DOUBLE_FILE_DIALOG_MESSAGE,
            isEditMode = DEFAULT_GALLERY_IS_EDIT_MODE,
            fileMinWidth = DEFAULT_GALLERY_EDITOR_FILE_MIN_WIDTH,
            files,
            maxFiles,
            onAdd,
            onFileCountChange,
            onRemove,
            shouldLoadImages = DEFAULT_GALLERY_SHOULD_LOAD_IMAGES,
            viewMode = DEFAULT_GALLERY_VIEW_MODE,
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
                shouldLoadImages={shouldLoadImages}
            />
        ) : (
            <GalleryViewer files={files} shouldLoadImages={shouldLoadImages} viewMode={viewMode} />
        );
    },
);

Gallery.displayName = 'Gallery';

export default Gallery;
