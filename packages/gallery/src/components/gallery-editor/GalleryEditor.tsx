import { AnimatePresence } from 'motion/react';
import React, { forwardRef, useImperativeHandle } from 'react';
import AddFile from './add-file/AddFile';
import { StyledGalleryEditor, StyledGalleryEditorGrid } from './GalleryEditor.styles';
import type { GalleryEditorProps, GalleryEditorRef } from './GalleryEditor.types';
import GalleryEditorItem from './gallery-editor-item/GalleryEditorItem';
import { GALLERY_EDITOR_GRID_GAP_PX } from './GalleryEditor.constants';
import useGalleryEditorState from './useGalleryEditorState';

const GalleryEditor = forwardRef<GalleryEditorRef, GalleryEditorProps>(
    (
        {
            allowDragAndDrop = false,
            addFileIcon = 'fa fa-plus',
            doubleFileDialogMessage = 'Diese Datei ist bereits vorhanden',
            fileMinWidth = 100,
            files,
            maxFiles,
            onAdd,
            onFileCountChange,
            onRemove,
            shouldLoadImages = true,
        },
        ref,
    ) => {
        const {
            fileItems,
            handleAddFiles,
            handleClear,
            handleDeleteFile,
            handleDrop,
            handleOpenFiles,
        } = useGalleryEditorState({
            allowDragAndDrop,
            doubleFileDialogMessage,
            files,
            maxFiles,
            onAdd,
            onFileCountChange,
            onRemove,
        });

        useImperativeHandle(
            ref,
            () => ({
                clear: handleClear,
            }),
            [handleClear],
        );

        const shouldShowAddFileTile = !maxFiles || maxFiles > fileItems.length;

        return (
            <StyledGalleryEditor>
                <StyledGalleryEditorGrid
                    $fileMinWidth={fileMinWidth}
                    $gap={GALLERY_EDITOR_GRID_GAP_PX}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => void handleDrop(event)}
                >
                    <AnimatePresence initial={false}>
                        {fileItems.map((file) => (
                            <GalleryEditorItem
                                key={file.id}
                                fileItem={file}
                                handleDeleteFile={handleDeleteFile}
                                onClick={handleOpenFiles}
                                shouldLoadImages={shouldLoadImages}
                            />
                        ))}
                    </AnimatePresence>

                    {shouldShowAddFileTile && (
                        <AddFile addFileIcon={addFileIcon} onAdd={handleAddFiles} />
                    )}
                </StyledGalleryEditorGrid>
            </StyledGalleryEditor>
        );
    },
);

GalleryEditor.displayName = 'GalleryEditor';

export default GalleryEditor;
