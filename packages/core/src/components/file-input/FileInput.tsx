import { createDialog, DialogType } from 'chayns-api';
import { AnimatePresence } from 'framer-motion';
import React, { DragEvent, FC, ReactElement, useCallback, useMemo, useState } from 'react';
import type { FileInputFileItem, ImageDialogResult } from '../../types/fileInput';
import { filterDuplicateFile, filterDuplicateFileUrls, isValidFileType } from '../../utils/file';
import { selectFiles } from '../../utils/fileDialog';
import Icon from '../icon/Icon';
import List from '../list/List';
import FileListItem from './file-list/FileListItem';
import {
    StyledFileInput,
    StyledFileInputContainer,
    StyledFileInputText,
    StyledFileInputWrapper,
    StyledMotionFileInputList,
    StyledUploadedFilesList,
} from './FileInput.styles';

export type FileInputProps = {
    /**
     * Already uploaded files to display.
     */
    files?: FileInputFileItem[];
    /**
     * An array of icons that should be displayed inside the FileInput
     */
    fileSelectionIcons?: string[];
    /**
     * The text that should be displayed inside the FileInput.
     */
    fileSelectionPlaceholder?: string;
    /**
     * The filetypes that could be selected. Example for multiple types: 'image/*, video/*'.
     */
    fileTypes?: string;
    /**
     * The icon of the image selection.
     */
    imageSelectIcons?: string[];
    /**
     * If set, pictures can be select via Pixabay.
     */
    imageSelectPlaceholder?: string;
    /**
     * The maximum amount of Files that can be uploaded.
     */
    maxFiles?: number;
    /**
     * A function to be executed when files are added.
     */
    onAdd?: (files: File[] | string[]) => void;
    /**
     * Function to be executed when the maximum amount of Files are reached.
     */
    onMaxFilesReached?: () => void;
    /**
     * A function to be executed when a file is removed.
     */
    onRemove?: (file: File | FileInputFileItem | string) => void;
};

type DialogInput = {
    upload: boolean;
    buttons: {
        text: string;
        buttonType: number;
    }[];
    initialView: string;
};

const FileInput: FC<FileInputProps> = ({
    fileSelectionIcons = ['fa fa-upload'],
    imageSelectIcons = ['ts-image'],
    fileTypes,
    onMaxFilesReached,
    maxFiles,
    onRemove,
    files,
    onAdd,
    fileSelectionPlaceholder = 'Dateien hinzufügen',
    imageSelectPlaceholder,
}) => {
    const [internalFiles, setInternalFiles] = useState<File[]>([]);
    const [internalImages, setInternalImages] = useState<string[]>([]);

    const handleAddImages = useCallback(
        (images: string[]) => {
            const newImages: string[] = [];

            images.forEach((image) => {
                if (!filterDuplicateFileUrls({ files: internalImages, newFile: image })) {
                    newImages.push(image);
                }
            });

            let tmp = newImages;

            if (maxFiles) {
                tmp = newImages.slice(
                    0,
                    maxFiles -
                        (internalFiles.length + internalImages.length + (files?.length ?? 0)),
                );
            }

            if (tmp.length > 0 && typeof onAdd === 'function') {
                onAdd(tmp);
            }

            setInternalImages((prevState) => [...prevState, ...tmp]);
        },
        [files?.length, internalFiles.length, internalImages, maxFiles, onAdd],
    );

    const handleAddFiles = useCallback(
        (newFiles: File[]) => {
            const newFileItems: File[] = [];

            newFiles.forEach((file) => {
                if (fileTypes && !isValidFileType({ file, types: fileTypes })) {
                    return;
                }

                if (file && !filterDuplicateFile({ files: internalFiles, newFile: file })) {
                    newFileItems.push(file);
                }
            });

            let tmp = newFileItems;

            if (maxFiles) {
                tmp = newFileItems.slice(
                    0,
                    maxFiles -
                        (internalFiles.length + internalImages.length + (files?.length ?? 0)),
                );
            }

            if (tmp.length > 0 && typeof onAdd === 'function') {
                onAdd(tmp);
            }

            setInternalFiles((prevState) => [...prevState, ...tmp]);
        },
        [fileTypes, files?.length, internalFiles, internalImages.length, maxFiles, onAdd],
    );

    const handleDeleteFile = useCallback(
        (fileName?: string) => {
            let fileToDelete: File | FileInputFileItem | string | undefined;

            const filteredFiles = internalFiles.filter((file) => {
                const { name } = file;

                if (name === fileName) {
                    fileToDelete = file;
                }

                return name !== fileName;
            });

            setInternalFiles(filteredFiles);

            if (!fileToDelete) {
                const filteredImages = internalImages.filter((image) => {
                    if (image === fileName) {
                        fileToDelete = image;
                    }

                    return image !== fileName;
                });

                setInternalImages(filteredImages);
            }

            if (!fileToDelete) {
                files?.forEach((file) => {
                    if (file.url === fileName || file.name === fileName) {
                        fileToDelete = file;
                    }
                });
            }

            if (!fileToDelete || typeof onRemove !== 'function') {
                return;
            }

            onRemove(fileToDelete);
        },
        [files, internalFiles, internalImages, onRemove],
    );

    const isDisabled = useMemo(() => {
        if (maxFiles) {
            if (internalFiles.length + internalImages.length >= maxFiles) {
                if (typeof onMaxFilesReached === 'function') {
                    onMaxFilesReached();
                }

                return true;
            }
        }

        return false;
    }, [internalFiles.length, internalImages.length, maxFiles, onMaxFilesReached]);

    const handleImageSelectionClick = useCallback(async () => {
        if (isDisabled) {
            return;
        }

        const { buttonType, result } = (await createDialog({
            dialogInput: {
                upload: true,
                buttons: [
                    { text: 'hello', buttonType: 1 },
                    { text: 'can', buttonType: -1 },
                ],
                initialView: 'pixabay',
            },
            type: DialogType.MODULE,
            system: {
                url: 'https://tapp.chayns-static.space/api/dialog-image-editor/v1/remoteEntry.js',
                scope: 'dialog_image_editor',
                module: './ImageEditorEntry',
            },
            buttons: [],
        }).open()) as ImageDialogResult;

        if (buttonType === 1 && result?.url) {
            handleAddImages([result.url]);
        }
    }, [handleAddImages, isDisabled]);

    const handleFileSelectionClick = useCallback(async () => {
        if (isDisabled) {
            return;
        }

        const newFiles = await selectFiles({
            multiple: true,
            type: fileTypes,
        });

        handleAddFiles(newFiles);
    }, [fileTypes, handleAddFiles, isDisabled]);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const draggedFiles = Array.from(e.dataTransfer.files);

            handleAddFiles(draggedFiles);
        },
        [handleAddFiles],
    );

    const content = useMemo(() => {
        const combinedFiles = [...internalImages, ...internalFiles];

        const items: ReactElement[] = combinedFiles.map((file) => (
            <StyledMotionFileInputList
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                key={typeof file === 'string' ? file : file.name}
                transition={{ duration: 0.25, type: 'tween' }}
            >
                <FileListItem
                    fileType={typeof file !== 'string' ? file.type : undefined}
                    fileName={typeof file !== 'string' ? file.name : undefined}
                    fileSize={typeof file !== 'string' ? file.size : undefined}
                    url={typeof file === 'string' ? file : undefined}
                    onRemove={handleDeleteFile}
                />
            </StyledMotionFileInputList>
        ));

        return items;
    }, [handleDeleteFile, internalFiles, internalImages]);

    const uploadedFiles = useMemo(() => {
        const items: ReactElement[] = [];

        const cutFiles = maxFiles ? files?.splice(0, maxFiles) : files;

        cutFiles?.forEach(({ url, id, name }) => {
            items.push(
                <StyledMotionFileInputList
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    key={id}
                    transition={{ duration: 0.25, type: 'tween' }}
                >
                    <FileListItem url={url} onRemove={handleDeleteFile} fileName={name} />
                </StyledMotionFileInputList>,
            );
        });

        return items;
    }, [files, handleDeleteFile, maxFiles]);

    return useMemo(
        () => (
            <StyledFileInput>
                <StyledFileInputWrapper $isDisabled={isDisabled}>
                    <StyledFileInputContainer
                        onClick={() => void handleFileSelectionClick()}
                        onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                        onDrop={(e: DragEvent<HTMLDivElement>) => void handleDrop(e)}
                    >
                        <Icon icons={fileSelectionIcons} />
                        <StyledFileInputText>{fileSelectionPlaceholder}</StyledFileInputText>
                    </StyledFileInputContainer>
                    {imageSelectPlaceholder && (
                        <StyledFileInputContainer
                            $isImageSelection
                            onClick={() => void handleImageSelectionClick()}
                        >
                            <Icon icons={imageSelectIcons} />
                            <StyledFileInputText>{imageSelectPlaceholder}</StyledFileInputText>
                        </StyledFileInputContainer>
                    )}
                </StyledFileInputWrapper>
                <List>
                    <AnimatePresence initial={false}>{content}</AnimatePresence>
                </List>
                {uploadedFiles.length > 0 && (
                    <StyledUploadedFilesList $shouldShowBorder={content.length > 0}>
                        <List>
                            <AnimatePresence initial={false}>{uploadedFiles}</AnimatePresence>
                        </List>
                    </StyledUploadedFilesList>
                )}
            </StyledFileInput>
        ),
        [
            isDisabled,
            fileSelectionIcons,
            fileSelectionPlaceholder,
            imageSelectPlaceholder,
            imageSelectIcons,
            content,
            uploadedFiles,
            handleFileSelectionClick,
            handleDrop,
            handleImageSelectionClick,
        ],
    );
};

FileInput.displayName = 'FileInput';

export default FileInput;
