import {
    Image,
    uploadFile,
    Video,
    type FileItem,
    type InternalFileItem,
} from '@chayns-components/core';
import { createDialog, DialogType, MediaType, openMedia, OpenMediaItem } from 'chayns-api';
import React, { DragEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GalleryViewMode } from '../types/gallery';
import { filterDuplicateFile, generatePreviewUrl, generateVideoThumbnail } from '../utils/file';
import AddFile from './add-file/AddFile';
import GalleryItem from './gallery-item/GalleryItem';
import {
    StyledGallery,
    StyledGalleryEditModeWrapper,
    StyledGalleryItemWrapper,
} from './Gallery.styles';

export type GalleryProps = {
    /**
     * Whether drag and drop is allowed or not
     */
    allowDragAndDrop?: boolean;
    /**
     * The message that should be displayed if a File is already given.
     */
    doubleFileDialogMessage?: string;
    /**
     * The minimum width of a file in the edit mode
     */
    fileMinWidth?: number;
    /**
     *  Images and videos which should be displayed
     */
    files?: FileItem[];
    /**
     *  Whether images and videos can be edited
     */
    isEditMode?: boolean;
    /**
     * The maximum amount of images and videos that can be uploaded.
     */
    maxFiles?: number;
    /**
     *  Function to be executed when files are added and uploaded
     */
    onAdd?: (file: FileItem) => void;
    /**
     * Function to be executed when the count of files are changed. Needed to check if all files are uploaded
     */
    onFileCountChange?: (fileCount: number) => void;
    /**
     *  Function to be executed when a file is removed
     */
    onRemove?: (file: FileItem) => void;
    /**
     * The mode how the images should be displayed.
     */
    viewMode?: GalleryViewMode;
};

const Gallery: FC<GalleryProps> = ({
    allowDragAndDrop = false,
    doubleFileDialogMessage = 'Diese Datei ist bereits vorhanden',
    isEditMode = false,
    fileMinWidth = 100,
    files,
    maxFiles,
    onAdd,
    onFileCountChange,
    onRemove,
    viewMode = GalleryViewMode.GRID,
}) => {
    const [fileItems, setFileItems] = useState<InternalFileItem[]>([]);

    /**
     * This function adds a previewUrl to fileItems
     */
    const handlePreviewUrlCallback = (previewUrl: string, file: InternalFileItem) => {
        setFileItems((prevState) =>
            prevState.map((prevFile) => {
                if (prevFile.id === file.id) {
                    return { ...prevFile, previewUrl };
                }
                return prevFile;
            }),
        );
    };

    const callDuplicateFileDialog = useCallback(() => {
        createDialog({ type: DialogType.ALERT, text: doubleFileDialogMessage });
    }, [doubleFileDialogMessage]);

    /**
     * This function adds uploaded files to fileItems
     */
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
                                ({ uploadedFile: newUploadedFile }) =>
                                    newUploadedFile?.url === uploadedFile?.url,
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

                const tmp: InternalFileItem[] = [];

                updatedState.forEach((updatedFile) => {
                    if (updatedFile !== undefined) {
                        tmp.push(updatedFile as InternalFileItem);
                    }
                });

                return tmp ?? [];
            });
        },
        [callDuplicateFileDialog, onAdd],
    );

    /**
     * Returns the current count to check if all files are uploaded
     */
    useEffect(() => {
        if (typeof onFileCountChange === 'function') {
            onFileCountChange(fileItems.length);
        }
    }, [fileItems.length, onFileCountChange]);

    /**
     * Prepares files for previewUrl and upload
     */
    useEffect(() => {
        const filesToGeneratePreview = fileItems.filter(
            (file) => file.file && !file.previewUrl && (file.state === 'none' || !file.state),
        );

        const filesToUpload = fileItems.filter(
            (file) => !file.uploadedFile && file.state !== 'uploading',
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
                callback: (UploadedFile) => handleUploadFileCallback(file, UploadedFile),
            });
        });
    }, [fileItems, handleUploadFileCallback]);

    /**
     * This function formats and adds files to fileItems
     */
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

            let tmp = newFileItems;

            if (maxFiles) {
                tmp = newFileItems.slice(0, maxFiles - (fileItems.length + filesToAdd.length - 1));
            }

            setFileItems((prevState) => [...prevState, ...tmp]);
        },
        [fileItems, maxFiles],
    );

    /**
     * This function adds external files to fileItems
     */
    useEffect(() => {
        if (files) {
            const newFileItems: InternalFileItem[] = [];

            files.forEach((file) => {
                newFileItems.push({
                    id: file.id ?? uuidv4(),
                    uploadedFile: file.file,
                    file: undefined,
                    state: 'uploaded',
                    previewUrl: undefined,
                });
            });

            setFileItems((prevState) => {
                const updatedItems = prevState.map((prevItem) => {
                    const newItem = newFileItems.find(
                        (item) =>
                            item.uploadedFile &&
                            item.uploadedFile.url ===
                                (prevItem.uploadedFile && prevItem.uploadedFile.url),
                    );
                    return newItem || prevItem;
                });

                return updatedItems.concat(
                    newFileItems.filter(
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
        }
    }, [files]);

    /**
     * This function deletes a selected file from the file list
     */
    const handleDeleteFile = useCallback(
        (id?: string) => {
            let fileToDelete: FileItem | undefined;

            const filteredFiles = fileItems.filter((file) => {
                const fileId = file.id;

                if (fileId === id && file.uploadedFile) {
                    fileToDelete = { file: file.uploadedFile, id };
                }

                return fileId !== id;
            });

            setFileItems(filteredFiles);

            if (!fileToDelete || typeof onRemove !== 'function') {
                return;
            }

            onRemove(fileToDelete);
        },
        [fileItems, onRemove],
    );

    /**
     * This function handles the drag and drop
     */
    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            if (!allowDragAndDrop) {
                return;
            }

            e.preventDefault();
            const draggedFiles = Array.from(e.dataTransfer.files);

            handleAddFiles(draggedFiles);
        },
        [allowDragAndDrop, handleAddFiles],
    );

    /**
     * Opens the files in a slideShow
     */
    const openFiles = useCallback(
        (file: InternalFileItem) => {
            const startIndex = fileItems.findIndex((item) => item.id === file.id);

            const items: OpenMediaItem[] = fileItems.map((item) => ({
                url: item.uploadedFile?.url.replace('_0.mp4', '.mp4') ?? '',
                mediaType:
                    item.uploadedFile && 'thumbnailUrl' in item.uploadedFile
                        ? MediaType.VIDEO
                        : MediaType.IMAGE,
            }));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            void openMedia({ items, startIndex });
        },
        [fileItems],
    );

    /**
     * Returns the ratio of the single file
     */
    const ratio = useMemo(() => {
        switch (fileItems.length) {
            case 0:
                return 0;
            case 1:
                return Math.max(fileItems[0]?.uploadedFile?.ratio ?? 1, 1);
            case 2:
                return 2;
            case 3:
                return 3;
            default:
                return 1;
        }
    }, [fileItems]);

    const galleryContent = useMemo(() => {
        const combinedFilesLength = fileItems.length;

        if (isEditMode) {
            const items = fileItems.map((file) => (
                <GalleryItem
                    key={file.id}
                    fileItem={file}
                    isEditMode
                    onClick={openFiles}
                    handleDeleteFile={handleDeleteFile}
                />
            ));

            if (maxFiles && maxFiles <= combinedFilesLength) {
                return items;
            }

            items.push(<AddFile key="add_file" onAdd={handleAddFiles} />);

            return items;
        }

        const shortedFiles = fileItems.slice(0, 4);

        return shortedFiles.map((file, index) => {
            let imageRatio = 1;

            if (viewMode === GalleryViewMode.GRID) {
                if (combinedFilesLength === 2 && (index === 0 || index === 1)) {
                    imageRatio = 0.5;
                } else if (
                    (index === 0 && combinedFilesLength > 2) ||
                    (combinedFilesLength === 3 && (index === 1 || index === 2))
                ) {
                    imageRatio = 1.5;
                }
            }

            return (
                <GalleryItem
                    key={file.id}
                    fileItem={file}
                    isEditMode={false}
                    handleDeleteFile={handleDeleteFile}
                    onClick={openFiles}
                    ratio={imageRatio}
                    remainingItemsLength={
                        combinedFilesLength > 4 && index === 3 ? combinedFilesLength : undefined
                    }
                />
            );
        });
    }, [fileItems, isEditMode, maxFiles, handleAddFiles, openFiles, handleDeleteFile, viewMode]);

    return useMemo(
        () => (
            <StyledGallery>
                {isEditMode ? (
                    <StyledGalleryEditModeWrapper
                        $fileMinWidth={fileMinWidth}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => void handleDrop(e)}
                    >
                        {galleryContent}
                    </StyledGalleryEditModeWrapper>
                ) : (
                    <StyledGalleryItemWrapper
                        $ratio={ratio}
                        $uploadedFileLength={fileItems.length}
                        $viewMode={viewMode}
                    >
                        {galleryContent}
                    </StyledGalleryItemWrapper>
                )}
            </StyledGallery>
        ),
        [isEditMode, fileMinWidth, galleryContent, ratio, fileItems.length, viewMode, handleDrop],
    );
};

Gallery.displayName = 'Gallery';

export default Gallery;
