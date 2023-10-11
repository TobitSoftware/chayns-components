import { uploadFile } from '@chayns-components/core';
import type { FileItem, Image, Video } from '@chayns-components/core/lib/types/file'; // TODO: Check why absolute import is needed
import React, { DragEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterDuplicateFile, generatePreviewUrl, generateVideoThumbnail } from '../utils/file';
import AddFile from './add-file/AddFile';
import GalleryItem from './gallery-item/GalleryItem';
import {
    StyledGallery,
    StyledGalleryEditModeWrapper,
    StyledGalleryItemWrapper,
} from './Gallery.styles';
import { MediaType, openMedia, OpenMediaItem } from 'chayns-api';
import { getFileAsArrayBuffer } from '@chayns-components/core/lib/utils/fileDialog';

export type GalleryProps = {
    /**
     * AccessToken of the user
     */
    accessToken: string;
    /**
     * Whether drag and drop is allowed or not
     */
    allowDragAndDrop?: boolean;
    /**
     *  Whether images and videos can be edited
     */
    isEditMode?: boolean;
    /**
     * The minimum width of a file in the edit mode
     */
    fileMinWidth?: number;
    /**
     *  Images and videos which should be displayed
     */
    files?: FileItem[];
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
     * PersonId of the user
     */
    personId: string;
};

const Gallery: FC<GalleryProps> = ({
    accessToken,
    allowDragAndDrop = false,
    isEditMode = false,
    fileMinWidth = 100,
    files,
    onAdd,
    onFileCountChange,
    onRemove,
    personId,
}) => {
    const [fileItems, setFileItems] = useState<FileItem[]>([]);

    /**
     * This function adds a previewUrl to fileItems
     */
    const handlePreviewUrlCallback = (previewUrl: string, file: FileItem) => {
        setFileItems((prevState) =>
            prevState.map((prevFile) => {
                if (prevFile.id === file.id) {
                    return { ...prevFile, previewUrl };
                }
                return prevFile;
            })
        );
    };

    /**
     * This function adds uploaded files to fileItems
     */
    const handleUploadFileCallback = useCallback(
        (file: FileItem, UploadedFile: Video | Image) => {
            setFileItems((prevState) =>
                prevState.map((prevFile) => {
                    if (prevFile.id === file.id) {
                        if (typeof onAdd === 'function') {
                            onAdd({
                                ...prevFile,
                                uploadedFile: UploadedFile,
                                state: 'uploaded',
                            });
                        }

                        return {
                            ...prevFile,
                            uploadedFile: UploadedFile,
                            state: 'uploaded',
                        };
                    }
                    return prevFile;
                })
            );
        },
        [onAdd]
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
        try {
            const testFile = fileItems[0] && fileItems[0].file;

            if (testFile) {
                void getFileAsArrayBuffer(testFile).then((result: string | ArrayBuffer) => {
                    console.log('Files are uploading - useEffect', result);
                });
            }
        } catch (e) {
            console.error('2: Failed to test get file as array buffer', e);
        }

        const filesToGeneratePreview = fileItems.filter(
            (file) => file.file && !file.previewUrl && (file.state === 'none' || !file.state)
        );

        const filesToUpload = fileItems.filter(
            (file) => !file.uploadedFile && file.state !== 'uploading'
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
                })
            );

            void uploadFile({
                fileToUpload: file,
                personId,
                accessToken,
                callback: (UploadedFile) => handleUploadFileCallback(file, UploadedFile),
            });
        });
    }, [accessToken, fileItems, handleUploadFileCallback, personId]);

    /**
     * This function formats and adds files to fileItems
     */
    const handleAddFiles = useCallback(
        (filesToAdd: File[]) => {
            const newFileItems: FileItem[] = [];

            filesToAdd.forEach((file) => {
                if (file && !filterDuplicateFile({ files: fileItems, newFile: file })) {
                    newFileItems.push({
                        id: uuidv4(),
                        file,
                        state: 'none',
                    });
                }
            });

            setFileItems((prevState) => [...prevState, ...newFileItems]);
        },
        [fileItems]
    );

    /**
     * This function adds external files to fileItems
     */
    useEffect(() => {
        if (files) {
            const newFileItems: FileItem[] = [];

            try {
                const testFile = newFileItems[0] && newFileItems[0].file;

                if (testFile) {
                    void getFileAsArrayBuffer(testFile).then((result) => {
                        console.log('File is set into Component', result);
                    });
                }
            } catch (e) {
                console.error('1: Failed to test get file as array buffer', e);
            }

            files.forEach((file) => {
                newFileItems.push({
                    id: uuidv4(),
                    uploadedFile: file.uploadedFile,
                    file: file.file,
                    state: file.uploadedFile ? 'uploaded' : 'none',
                    previewUrl: file.uploadedFile ? file.uploadedFile.url : undefined,
                });
            });

            setFileItems((prevState) => [...prevState, ...newFileItems]);
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

                if (fileId === id) {
                    fileToDelete = file;
                }

                return fileId !== id;
            });

            setFileItems(filteredFiles);

            if (!fileToDelete || typeof onRemove !== 'function') {
                return;
            }

            onRemove(fileToDelete);
        },
        [fileItems, onRemove]
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
        [allowDragAndDrop, handleAddFiles]
    );

    /**
     * Opens the files in a slideShow
     */
    const openFiles = useCallback(
        (file: FileItem) => {
            const startIndex = fileItems.findIndex((item) => item.id === file.id);

            const items: OpenMediaItem[] = fileItems.map((item) => ({
                url: item.uploadedFile?.url.replace('_0.mp4', '.mp4') ?? '',
                mediaType: item.file?.type.includes('video/') ? MediaType.VIDEO : MediaType.IMAGE,
            }));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            void openMedia({ items, startIndex });
        },
        [fileItems]
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

    /**
     * Returns the number of columns
     */
    const columns = useMemo(() => {
        const combinedFilesLength = fileItems.length;

        if (combinedFilesLength <= 1) {
            return '';
        }

        return `repeat(${combinedFilesLength === 3 ? 3 : 2}, 1fr)`;
    }, [fileItems.length]);

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

            items.push(<AddFile key="add_file" onAdd={handleAddFiles} />);

            return items;
        }

        const shortedFiles = fileItems.slice(0, 4);

        return shortedFiles.map((file, index) => (
            <GalleryItem
                key={file.id}
                fileItem={file}
                isEditMode={false}
                handleDeleteFile={handleDeleteFile}
                onClick={openFiles}
                remainingItemsLength={
                    combinedFilesLength > 4 && index === 3 ? combinedFilesLength : undefined
                }
            />
        ));
    }, [fileItems, isEditMode, handleAddFiles, openFiles, handleDeleteFile]);

    return useMemo(
        () => (
            <StyledGallery>
                {isEditMode ? (
                    <StyledGalleryEditModeWrapper
                        fileMinWidth={fileMinWidth}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => void handleDrop(e)}
                    >
                        {galleryContent}
                    </StyledGalleryEditModeWrapper>
                ) : (
                    <StyledGalleryItemWrapper
                        ratio={ratio}
                        columns={columns}
                        uploadedFileLength={fileItems.length}
                    >
                        {galleryContent}
                    </StyledGalleryItemWrapper>
                )}
            </StyledGallery>
        ),
        [isEditMode, fileMinWidth, galleryContent, ratio, columns, fileItems.length, handleDrop]
    );
};

Gallery.displayName = 'Gallery';

export default Gallery;
