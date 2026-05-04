import {
    Image,
    uploadFile,
    Video,
    type FileItem,
    type InternalFileItem,
} from '@chayns-components/core';
import { createDialog, DialogType } from 'chayns-api';
import React, { DragEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterDuplicateFile, generatePreviewUrl, generateVideoThumbnail } from '../../utils/file';
import { openFiles, mapFilesToInternalItems } from '../../utils/gallery';
import AddFile from './add-file/AddFile';
import GalleryEditorItem from './gallery-editor-item/GalleryEditorItem';
import { StyledGalleryEditor, StyledGalleryEditorGrid } from './GalleryEditor.styles';
import type { GalleryEditorProps } from './GalleryEditor.types';

const GalleryEditor: FC<GalleryEditorProps> = ({
    allowDragAndDrop = false,
    addFileIcon = 'fa fa-plus',
    doubleFileDialogMessage = 'Diese Datei ist bereits vorhanden',
    fileMinWidth = 100,
    files,
    maxFiles,
    onAdd,
    onFileCountChange,
    onRemove,
}) => {
    const [fileItems, setFileItems] = useState<InternalFileItem[]>(() =>
        mapFilesToInternalItems(files),
    );

    const handlePreviewUrlCallback = useCallback((previewUrl: string, file: InternalFileItem) => {
        setFileItems((prevState) =>
            prevState.map((prevFile) => {
                if (prevFile.id === file.id) {
                    return { ...prevFile, previewUrl };
                }

                return prevFile;
            }),
        );
    }, []);

    const callDuplicateFileDialog = useCallback(() => {
        createDialog({ type: DialogType.ALERT, text: doubleFileDialogMessage });
    }, [doubleFileDialogMessage]);

    const handleUploadFileCallback = useCallback(
        (file: InternalFileItem, uploadedFile: Video | Image) => {
            setFileItems((prevState) => {
                const updatedState = prevState.map((prevFile) => {
                    if (prevFile.uploadedFile?.url === uploadedFile.url) {
                        callDuplicateFileDialog();

                        return undefined;
                    }

                    if (prevFile.id === file.id) {
                        if (typeof onAdd === 'function') {
                            const prevElement = prevState.find(
                                ({ uploadedFile: nextUploadedFile }) =>
                                    nextUploadedFile?.url === uploadedFile?.url,
                            );

                            if (!prevElement) {
                                onAdd({
                                    file: uploadedFile,
                                    id: file.id,
                                });
                            }
                        }

                        return {
                            ...prevFile,
                            uploadedFile,
                            state: 'uploaded',
                        };
                    }

                    return prevFile;
                });

                return updatedState.filter(Boolean) as InternalFileItem[];
            });
        },
        [callDuplicateFileDialog, onAdd],
    );

    const handleAddFiles = useCallback(
        (filesToAdd: File[]) => {
            const newFileItems: InternalFileItem[] = [];

            filesToAdd.forEach((file) => {
                if (file && !filterDuplicateFile({ files: fileItems, newFile: file })) {
                    newFileItems.push({
                        id: uuidv4(),
                        file,
                        state: 'none',
                    });
                }
            });

            let limitedFileItems = newFileItems;

            if (maxFiles) {
                limitedFileItems = newFileItems.slice(0, Math.max(maxFiles - fileItems.length, 0));
            }

            setFileItems((prevState) => [...prevState, ...limitedFileItems]);
        },
        [fileItems, maxFiles],
    );

    const handleDeleteFile = useCallback(
        (id?: string) => {
            let fileToDelete: FileItem | undefined;

            const filteredFiles = fileItems.filter((file) => {
                if (file.id === id && file.uploadedFile) {
                    fileToDelete = { file: file.uploadedFile, id };
                }

                return file.id !== id;
            });

            setFileItems(filteredFiles);

            if (!fileToDelete || typeof onRemove !== 'function') {
                return;
            }

            onRemove(fileToDelete);
        },
        [fileItems, onRemove],
    );

    const handleDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            if (!allowDragAndDrop) {
                return;
            }

            event.preventDefault();

            handleAddFiles(Array.from(event.dataTransfer.files));
        },
        [allowDragAndDrop, handleAddFiles],
    );

    const handleOpenFiles = useCallback(
        (file: InternalFileItem) => {
            openFiles(fileItems, file);
        },
        [fileItems],
    );

    useEffect(() => {
        if (typeof onFileCountChange === 'function') {
            onFileCountChange(fileItems.length);
        }
    }, [fileItems.length, onFileCountChange]);

    useEffect(() => {
        const filesToGeneratePreview = fileItems.filter(
            (file) => file.file && !file.previewUrl && (file.state === 'none' || !file.state),
        );

        const filesToUpload = fileItems.filter(
            (file) => file.file && !file.uploadedFile && file.state !== 'uploading',
        );

        filesToGeneratePreview.forEach((file) => {
            if (!file.file) {
                return;
            }

            if (file.file.type.includes('video/')) {
                generateVideoThumbnail({
                    file: file.file,
                    callback: (previewUrl) => handlePreviewUrlCallback(previewUrl, file),
                });

                return;
            }

            generatePreviewUrl({
                file: file.file,
                callback: (previewUrl) => handlePreviewUrlCallback(previewUrl, file),
            });
        });

        filesToUpload.forEach((file) => {
            setFileItems((prevState) =>
                prevState.map((prevFile) => {
                    if (prevFile.id === file.id) {
                        return { ...prevFile, state: 'uploading' };
                    }

                    return prevFile;
                }),
            );

            void uploadFile({
                fileToUpload: file,
                callback: (uploadedFile) => handleUploadFileCallback(file, uploadedFile),
            });
        });
    }, [fileItems, handlePreviewUrlCallback, handleUploadFileCallback]);

    useEffect(() => {
        const externalFileItems = mapFilesToInternalItems(files);

        setFileItems((prevState) => {
            // Keep local-only items such as pending uploads while refreshing known external media.
            const updatedItems = prevState.map((prevItem) => {
                const matchingItem = externalFileItems.find(
                    (item) =>
                        item.uploadedFile &&
                        item.uploadedFile.url ===
                            (prevItem.uploadedFile && prevItem.uploadedFile.url),
                );

                return matchingItem || prevItem;
            });

            return updatedItems.concat(
                externalFileItems.filter(
                    (newItem) =>
                        !prevState.some(
                            (prevItem) =>
                                prevItem.uploadedFile &&
                                newItem.uploadedFile &&
                                prevItem.uploadedFile.url === newItem.uploadedFile.url,
                        ),
                ),
            );
        });
    }, [files]);

    const galleryItems = useMemo(() => {
        const items = fileItems.map((file) => (
            <GalleryEditorItem
                key={file.id}
                fileItem={file}
                onClick={handleOpenFiles}
                handleDeleteFile={handleDeleteFile}
            />
        ));

        if (maxFiles && maxFiles <= fileItems.length) {
            return items;
        }

        return [
            ...items,
            <AddFile key="add_file" addFileIcon={addFileIcon} onAdd={handleAddFiles} />,
        ];
    }, [addFileIcon, fileItems, handleAddFiles, handleDeleteFile, handleOpenFiles, maxFiles]);

    return (
        <StyledGalleryEditor>
            <StyledGalleryEditorGrid
                $fileMinWidth={fileMinWidth}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => void handleDrop(event)}
            >
                {galleryItems}
            </StyledGalleryEditorGrid>
        </StyledGalleryEditor>
    );
};

GalleryEditor.displayName = 'GalleryEditor';

export default GalleryEditor;
