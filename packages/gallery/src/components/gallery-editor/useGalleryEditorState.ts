import {
    Image,
    uploadFile,
    Video,
    type FileItem,
    type InternalFileItem,
} from '@chayns-components/core';
import { createDialog, DialogType } from 'chayns-api';
import { type DragEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterDuplicateFile, generatePreviewUrl, generateVideoThumbnail } from '../../utils/file';
import { openFiles } from '../../utils/gallery';
import {
    getPendingPreviewFileItems,
    getPendingUploadFileItems,
    mapExternalFilesIntoInternalItems,
    mergeExternalFilesWithInternalState,
} from './GalleryEditor.utils';

type UseGalleryEditorStateOptions = {
    allowDragAndDrop: boolean;
    doubleFileDialogMessage: string;
    files?: FileItem[];
    maxFiles?: number;
    onAdd?: (file: FileItem) => void;
    onFileCountChange?: (fileCount: number) => void;
    onRemove?: (file: FileItem) => void;
};

type GalleryEditorStateResult = {
    fileItems: InternalFileItem[];
    handleAddFiles: (filesToAdd: File[]) => void;
    handleClear: () => void;
    handleDeleteFile: (id?: string) => void;
    handleDrop: (event: DragEvent<HTMLDivElement>) => void;
    handleOpenFiles: (file: InternalFileItem) => void;
};

const useGalleryEditorState = ({
    allowDragAndDrop,
    doubleFileDialogMessage,
    files,
    maxFiles,
    onAdd,
    onFileCountChange,
    onRemove,
}: UseGalleryEditorStateOptions): GalleryEditorStateResult => {
    const [fileItems, setFileItems] = useState<InternalFileItem[]>(() =>
        mapExternalFilesIntoInternalItems(files),
    );

    const callDuplicateFileDialog = useCallback(() => {
        createDialog({ type: DialogType.ALERT, text: doubleFileDialogMessage });
    }, [doubleFileDialogMessage]);

    const handlePreviewUrlCallback = useCallback((previewUrl: string, file: InternalFileItem) => {
        setFileItems((prevState) =>
            prevState.map((prevFile) =>
                prevFile.id === file.id ? { ...prevFile, previewUrl } : prevFile,
            ),
        );
    }, []);

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
                            onAdd({ file: uploadedFile, id: file.id });
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

    const filesToGeneratePreview = useMemo(
        () => getPendingPreviewFileItems(fileItems),
        [fileItems],
    );
    const filesToUpload = useMemo(() => getPendingUploadFileItems(fileItems), [fileItems]);

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
            let uploadedFile: Image | Video | undefined;

            setFileItems((prevState) => {
                uploadedFile = prevState.find((file) => file.id === id)?.uploadedFile;

                return prevState.filter((file) => file.id !== id);
            });

            if (uploadedFile && typeof onRemove === 'function') {
                onRemove({ file: uploadedFile, id });
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

    const handleClear = useCallback(() => {
        setFileItems([]);
    }, []);

    useEffect(() => {
        if (typeof onFileCountChange === 'function') {
            onFileCountChange(fileItems.length);
        }
    }, [fileItems.length, onFileCountChange]);

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
                prevState.map((prevFile) =>
                    prevFile.id === file.id ? { ...prevFile, state: 'uploading' } : prevFile,
                ),
            );

            void uploadFile({
                fileToUpload: file,
                callback: (uploadedFile) => handleUploadFileCallback(file, uploadedFile),
            });
        });
    }, [filesToGeneratePreview, filesToUpload, handlePreviewUrlCallback, handleUploadFileCallback]);

    useEffect(() => {
        const externalFileItems = mapExternalFilesIntoInternalItems(files);

        setFileItems((prevState) =>
            mergeExternalFilesWithInternalState(prevState, externalFileItems),
        );
    }, [files]);

    return {
        fileItems,
        handleAddFiles,
        handleClear,
        handleDeleteFile,
        handleDrop,
        handleOpenFiles,
    };
};

export default useGalleryEditorState;
