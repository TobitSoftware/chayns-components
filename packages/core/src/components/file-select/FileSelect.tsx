import { createDialog, DialogType } from 'chayns-api';
import React, { DragEvent, FC, useCallback, useMemo } from 'react';
import type { ImageDialogResult } from '../../types/fileInput';
import { isValidFileType } from '../../utils/file';
import { selectFiles } from '../../utils/fileDialog';
import Icon from '../icon/Icon';
import {
    StyledFileSelect,
    StyledFileSelectContainer,
    StyledFileSelectText,
    StyledFileSelectWrapper,
} from './FileSelect.styles';

enum DialogView {
    PIXABAY = 'pixabay',
    EDITOR = 'editor',
}

type DialogInput = {
    upload: boolean;
    initialView: DialogView;
    imageArrayBuffer?: File;
};

export interface UploadedFile {
    url: string;
    size?: number;
    name?: string;
}

export type FileSelectProps = {
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
     * Whether the FileInput is disabled.
     */
    isDisabled?: boolean;
    /**
     * The maximum amount of Files that can be uploaded.
     */
    maxFiles?: number;
    /**
     * The maximum size of a file in MB.
     */
    maxFileSizeInMB?: number;
    /**
     * A function to be executed when files are added.
     */
    onAdd?: (files: File[] | UploadedFile[]) => void;
    /**
     * Whether the image upload should be prevented.
     */
    shouldPreventImageUpload?: boolean;
};

const FileSelect: FC<FileSelectProps> = ({
    fileSelectionIcons = ['fa fa-upload'],
    imageSelectIcons = ['ts-image'],
    fileTypes,
    isDisabled,
    maxFileSizeInMB,
    onAdd,
    fileSelectionPlaceholder = 'Dateien hochladen',
    imageSelectPlaceholder,
    shouldPreventImageUpload = false,
}) => {
    const handleAddImages = useCallback(
        (images: UploadedFile[]) => {
            if (typeof onAdd === 'function') {
                onAdd(images);
            }
        },
        [onAdd],
    );

    const handleAddFiles = useCallback(
        (newFiles: File[]) => {
            if (typeof onAdd === 'function') {
                onAdd(newFiles);
            }
        },
        [onAdd],
    );

    const handleOpenEditor = useCallback(
        async (file: File) => {
            const { buttonType, result } = (await createDialog<DialogInput>({
                dialogInput: {
                    upload: true,
                    initialView: DialogView.EDITOR,
                    imageArrayBuffer: file,
                },
                type: DialogType.MODULE,
                system: {
                    url: 'https://tapp.chayns-static.space/api/dialog-image-editor/v1/remoteEntry.js',
                    scope: 'dialog_image_editor',
                    module: './ImageEditorEntry',
                },
                buttons: [],
            }).open()) as ImageDialogResult;

            if (buttonType === 1 && result?.url)
                handleAddImages([
                    {
                        url: result.url,
                        size: file.size,
                        name: file.name,
                    },
                ]);
        },
        [handleAddImages],
    );

    const handleImageSelectionClick = useCallback(async () => {
        if (isDisabled) return;

        const { buttonType, result } = (await createDialog<DialogInput>({
            dialogInput: { upload: true, initialView: DialogView.PIXABAY },
            type: DialogType.MODULE,
            system: {
                url: 'https://tapp.chayns-static.space/api/dialog-image-editor/v1/remoteEntry.js',
                scope: 'dialog_image_editor',
                module: './ImageEditorEntry',
            },
            buttons: [],
        }).open()) as ImageDialogResult;

        if (buttonType === 1 && result?.url) handleAddImages([{ url: result.url }]);
    }, [handleAddImages, isDisabled]);

    const handleFileSelectionClick = useCallback(async () => {
        if (isDisabled) return;

        const newFiles = await selectFiles({ multiple: true, type: fileTypes, maxFileSizeInMB });

        if (
            newFiles.length === 1 &&
            newFiles[0] &&
            newFiles[0].type.startsWith('image') &&
            !shouldPreventImageUpload
        ) {
            void handleOpenEditor(newFiles[0]);

            return;
        }

        handleAddFiles(newFiles);
    }, [
        fileTypes,
        handleAddFiles,
        handleOpenEditor,
        isDisabled,
        maxFileSizeInMB,
        shouldPreventImageUpload,
    ]);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();

            const draggedFiles = Array.from(e.dataTransfer.files).filter((file) => {
                if (fileTypes && !isValidFileType({ file, types: fileTypes })) {
                    return false;
                }

                return !(maxFileSizeInMB && file.size > maxFileSizeInMB * 1024 * 1024);
            });

            if (
                draggedFiles.length === 1 &&
                draggedFiles[0] &&
                draggedFiles[0].type.startsWith('image') &&
                !shouldPreventImageUpload
            ) {
                void handleOpenEditor(draggedFiles[0]);

                return;
            }

            handleAddFiles(draggedFiles);
        },
        [shouldPreventImageUpload, handleAddFiles, fileTypes, maxFileSizeInMB, handleOpenEditor],
    );

    return useMemo(
        () => (
            <StyledFileSelect>
                <StyledFileSelectWrapper $isDisabled={isDisabled}>
                    <StyledFileSelectContainer
                        onClick={() => void handleFileSelectionClick()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <Icon icons={fileSelectionIcons} />
                        <StyledFileSelectText>{fileSelectionPlaceholder}</StyledFileSelectText>
                    </StyledFileSelectContainer>
                    {imageSelectPlaceholder && (
                        <StyledFileSelectContainer
                            $isImageSelection
                            onClick={() => void handleImageSelectionClick()}
                        >
                            <Icon icons={imageSelectIcons} />
                            <StyledFileSelectText>{imageSelectPlaceholder}</StyledFileSelectText>
                        </StyledFileSelectContainer>
                    )}
                </StyledFileSelectWrapper>
            </StyledFileSelect>
        ),
        [
            isDisabled,
            fileSelectionIcons,
            fileSelectionPlaceholder,
            imageSelectPlaceholder,
            imageSelectIcons,
            handleFileSelectionClick,
            handleDrop,
            handleImageSelectionClick,
        ],
    );
};

FileSelect.displayName = 'FileSelect';

export default FileSelect;
