import {
    Image,
    uploadFile,
    Video,
    type FileItem,
    type InternalFileItem,
} from '@chayns-components/core';
import { createDialog, DialogType } from 'chayns-api';
import React, {
    DragEvent,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterDuplicateFile, generatePreviewUrl, generateVideoThumbnail } from '../../utils/file';
import { openFiles } from '../../utils/gallery';
import AddFile from './add-file/AddFile';
import GalleryEditorItem from './gallery-editor-item/GalleryEditorItem';
import { StyledGalleryEditor, StyledGalleryEditorGrid } from './GalleryEditor.styles';
import type { GalleryEditorProps, GalleryEditorRef } from './GalleryEditor.types';
import {
    mapExternalFilesIntoInternalItems,
    mergeExternalFilesWithInternalState,
    getPendingPreviewFileItems,
    getPendingUploadFileItems,
} from './GalleryEditor.utils';
import {
    DEFAULT_GALLERY_EDITOR_ADD_FILE_ICON,
    DEFAULT_GALLERY_EDITOR_ALLOW_DRAG_AND_DROP,
    DEFAULT_GALLERY_EDITOR_DOUBLE_FILE_DIALOG_MESSAGE,
    DEFAULT_GALLERY_EDITOR_FILE_MIN_WIDTH,
} from './GalleryEditor.constants';

const GalleryEditor = forwardRef<GalleryEditorRef, GalleryEditorProps>(
    (
        {
            allowDragAndDrop = DEFAULT_GALLERY_EDITOR_ALLOW_DRAG_AND_DROP,
            addFileIcon = DEFAULT_GALLERY_EDITOR_ADD_FILE_ICON,
            doubleFileDialogMessage = DEFAULT_GALLERY_EDITOR_DOUBLE_FILE_DIALOG_MESSAGE,
            fileMinWidth = DEFAULT_GALLERY_EDITOR_FILE_MIN_WIDTH,
            files,
            maxFiles,
            onAdd,
            onFileCountChange,
            onRemove,
            shouldLoadImages = true,
        },
        ref,
    ) => {
        const [fileItems, setFileItems] = useState<InternalFileItem[]>(() =>
            mapExternalFilesIntoInternalItems(files),
        );

        const handleClear = useCallback(() => {
            setFileItems([]);
        }, []);

        const handlePreviewUrlCallback = useCallback(
            (previewUrl: string, file: InternalFileItem) => {
                setFileItems((prevState) =>
                    prevState.map((prevFile) => {
                        if (prevFile.id === file.id) {
                            return { ...prevFile, previewUrl };
                        }

                        return prevFile;
                    }),
                );
            },
            [],
        );

        const callDuplicateFileDialog = useCallback(() => {
            createDialog({ type: DialogType.ALERT, text: doubleFileDialogMessage });
        }, [doubleFileDialogMessage]);

        const handleUploadFileCallback = useCallback(
            (file: InternalFileItem, uploadedFile: Video | Image) => {
                setFileItems((prevState) => {
                    const duplicateItem = prevState.find(
                        (prevFile) => prevFile.uploadedFile?.url === uploadedFile.url,
                    );

                    const updatedState = prevState.map((prevFile) => {
                        if (prevFile.uploadedFile?.url === uploadedFile.url) {
                            callDuplicateFileDialog();

                            return undefined;
                        }

                        if (prevFile.id === file.id) {
                            if (typeof onAdd === 'function' && !duplicateItem) {
                                onAdd({
                                    file: uploadedFile,
                                    id: file.id,
                                });
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
                setFileItems((prevState) => {
                    const newFileItems: InternalFileItem[] = [];

                    filesToAdd.forEach((file) => {
                        if (file && !filterDuplicateFile({ files: prevState, newFile: file })) {
                            newFileItems.push({
                                id: uuidv4(),
                                file,
                                state: 'none',
                            });
                        }
                    });

                    const limitedFileItems = maxFiles
                        ? newFileItems.slice(0, Math.max(maxFiles - prevState.length, 0))
                        : newFileItems;

                    return [...prevState, ...limitedFileItems];
                });
            },
            [maxFiles],
        );

        const handleDeleteFile = useCallback(
            (id?: string) => {
                let fileToDelete: FileItem | undefined;

                setFileItems((prevState) =>
                    prevState.filter((file) => {
                        if (file.id === id && file.uploadedFile) {
                            fileToDelete = { file: file.uploadedFile, id };
                        }

                        return file.id !== id;
                    }),
                );

                if (fileToDelete && typeof onRemove === 'function') {
                    onRemove(fileToDelete);
                }
            },
            [onRemove],
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

        useImperativeHandle(
            ref,
            () => ({
                clear: handleClear,
            }),
            [handleClear],
        );

        useEffect(() => {
            if (typeof onFileCountChange === 'function') {
                onFileCountChange(fileItems.length);
            }
        }, [fileItems.length, onFileCountChange]);

        const filesToGeneratePreview = useMemo(
            () => getPendingPreviewFileItems(fileItems),
            [fileItems],
        );
        const filesToUpload = useMemo(() => getPendingUploadFileItems(fileItems), [fileItems]);

        useEffect(() => {
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
        }, [
            filesToGeneratePreview,
            filesToUpload,
            handlePreviewUrlCallback,
            handleUploadFileCallback,
        ]);

        useEffect(() => {
            const externalFileItems = mapExternalFilesIntoInternalItems(files);

            setFileItems((prevState) => {
                return mergeExternalFilesWithInternalState(prevState, externalFileItems);
            });
        }, [files]);

        const galleryItems = useMemo(() => {
            const items = fileItems.map((file) => (
                <GalleryEditorItem
                    key={file.id}
                    fileItem={file}
                    onClick={handleOpenFiles}
                    handleDeleteFile={handleDeleteFile}
                    shouldLoadImages={shouldLoadImages}
                />
            ));

            if (maxFiles && maxFiles <= fileItems.length) {
                return items;
            }

            return [
                ...items,
                <AddFile key="add_file" addFileIcon={addFileIcon} onAdd={handleAddFiles} />,
            ];
        }, [
            addFileIcon,
            fileItems,
            handleAddFiles,
            handleDeleteFile,
            handleOpenFiles,
            maxFiles,
            shouldLoadImages,
        ]);

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
    },
);

GalleryEditor.displayName = 'GalleryEditor';

export default GalleryEditor;
