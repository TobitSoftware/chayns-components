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

type DialogInput = {
    upload: boolean;
};

export type FileSelectProps = {
    fileSelectionIcons?: string[];
    fileSelectionPlaceholder?: string;
    fileTypes?: string;
    imageSelectIcons?: string[];
    imageSelectPlaceholder?: string;
    isDisabled?: boolean;
    maxFileSizeInMB?: number;
    onAdd?: (files: File[] | string[]) => void;
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
}) => {
    const handleAddImages = useCallback(
        (images: string[]) => {
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

    const handleImageSelectionClick = useCallback(async () => {
        if (isDisabled) return;

        const { buttonType, result } = (await createDialog<DialogInput>({
            dialogInput: { upload: true },
            type: DialogType.MODULE,
            system: {
                url: 'https://tapp.chayns-static.space/api/dialog-image-editor/v1/remoteEntry.js',
                scope: 'dialog_image_editor',
                module: './ImageEditorEntry',
            },
            buttons: [],
        }).open()) as ImageDialogResult;

        if (buttonType === 1 && result?.url) handleAddImages([result.url]);
    }, [handleAddImages, isDisabled]);

    const handleFileSelectionClick = useCallback(async () => {
        if (isDisabled) return;

        const newFiles = await selectFiles({ multiple: true, type: fileTypes, maxFileSizeInMB });

        handleAddFiles(newFiles);
    }, [fileTypes, handleAddFiles, isDisabled, maxFileSizeInMB]);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();

            const draggedFiles = Array.from(e.dataTransfer.files).filter((file) => {
                if (fileTypes && !isValidFileType({ file, types: fileTypes })) {
                    return false;
                }

                if (maxFileSizeInMB && file.size > maxFileSizeInMB * 1024 * 1024) {
                    return false;
                }
                return true;
            });

            handleAddFiles(draggedFiles);
        },
        [handleAddFiles, fileTypes, maxFileSizeInMB],
    );

    return useMemo(
        () => (
            <StyledFileSelect>
                <StyledFileSelectWrapper $isDisabled={isDisabled}>
                    <StyledFileSelectContainer
                        onClick={() => void handleFileSelectionClick}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <Icon icons={fileSelectionIcons} />
                        <StyledFileSelectText>{fileSelectionPlaceholder}</StyledFileSelectText>
                    </StyledFileSelectContainer>
                    {imageSelectPlaceholder && (
                        <StyledFileSelectContainer
                            $isImageSelection
                            onClick={() => void handleImageSelectionClick}
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
