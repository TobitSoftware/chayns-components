import React, { DragEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { FileItem, Image, Video } from '../types/file';
import { filterDuplicateFile, generatePreviewUrl } from '../utils/file';
import { uploadFile } from '../utils/upload';
import AddFile from './add-file/AddFile';
import GalleryItem from './gallery-item/GalleryItem';
import {
    StyledGallery,
    StyledGalleryEditModeWrapper,
    StyledGalleryItemWrapper,
} from './Gallery.styles';

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
     *  Images and videos which should be displayed
     */
    files?: FileItem[];
    /**
     *  Function to be executed when files are added
     */
    onAdd?: (files: FileItem[]) => void;
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
    files,
    onAdd,
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
    const handleUploadFileCallback = (file: FileItem, UploadedFile: Video | Image) => {
        setFileItems((prevState) =>
            prevState.map((prevFile) => {
                if (prevFile.id === file.id) {
                    return {
                        ...prevFile,
                        uploadedFile: UploadedFile,
                        id: UploadedFile.id,
                        state: 'uploaded',
                    };
                }
                return prevFile;
            })
        );
    };

    /**
     * This function returns the fileItems if some files are updated
     */
    useEffect(() => {
        if (onAdd) {
            onAdd(fileItems);
        }
    }, [fileItems, onAdd]);

    /**
     * Prepares files for previewUrl and upload
     */
    useEffect(() => {
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
    }, [accessToken, fileItems, personId]);

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

            files.forEach((file) => {
                newFileItems.push({
                    id: uuidv4(),
                    uploadedFile: file.uploadedFile,
                    file: file.file,
                    state: file.uploadedFile ? 'uploaded' : 'none',
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

            if (!fileToDelete || !onRemove) {
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
        // // If the length is 1, the ratio or at least 1 is returned
        // fileItems.length === 1 ? Math.max(fileItems[0]?.uploadedFile?.ratio ?? 1, 1) : 1,
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
                <GalleryItem fileItem={file} isEditMode handleDeleteFile={handleDeleteFile} />
            ));

            items.push(<AddFile onAdd={handleAddFiles} />);

            return items;
        }

        const shortedFiles = fileItems.slice(0, 4);

        return shortedFiles.map((file, index) => (
            <GalleryItem
                fileItem={file}
                isEditMode={false}
                handleDeleteFile={handleDeleteFile}
                remainingItemsLength={
                    combinedFilesLength > 4 && index === 3 ? combinedFilesLength : undefined
                }
            />
        ));
    }, [fileItems, isEditMode, handleAddFiles, handleDeleteFile]);

    return useMemo(
        () => (
            <StyledGallery>
                {isEditMode ? (
                    <StyledGalleryEditModeWrapper
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
        [isEditMode, galleryContent, ratio, columns, fileItems.length, handleDrop]
    );
};

Gallery.displayName = 'Gallery';

export default Gallery;
