import { Icon, List, selectFiles } from '@chayns-components/core';
import { AnimatePresence } from 'framer-motion';
import React, { DragEvent, FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { filterDuplicateFile } from '../utils/file';
import FileListItem from './file-list/FileListItem';
import {
    StyledFileInput,
    StyledFileInputContainer,
    StyledFileInputText,
    StyledMotionFileInputList,
} from './FileInput.styles';

export type FileInputProps = {
    /**
     * An array of icons that should be displayed inside the FileInput
     */
    icons?: string[];
    /**
     * A function to be executed when files are added.
     */
    onAdd?: (files: File[]) => void;
    /**
     * A function to be executed when a file is removed.
     */
    onRemove?: (file: File) => void;
    /**
     * The text that should be displayed inside the FileInput
     */
    placeholder?: string;
};

const FileInput: FC<FileInputProps> = ({
    icons = ['fa fa-upload'],
    onRemove,
    onAdd,
    placeholder = 'Dateien hinzufügen',
}) => {
    const [internalFiles, setInternalFiles] = useState<File[]>([]);

    const handleAddFiles = useCallback(
        (files: File[]) => {
            const newFileItems: File[] = [];

            files.forEach((file) => {
                if (file && !filterDuplicateFile({ files: internalFiles, newFile: file })) {
                    newFileItems.push(file);
                }
            });

            if (newFileItems.length > 0 && typeof onAdd === 'function') {
                onAdd(newFileItems);
            }

            setInternalFiles((prevState) => [...prevState, ...newFileItems]);
        },
        [internalFiles, onAdd]
    );

    const handleDeleteFile = useCallback(
        (fileName?: string) => {
            let fileToDelete: File | undefined;

            const filteredFiles = internalFiles.filter((file) => {
                const { name } = file;

                if (name === fileName) {
                    fileToDelete = file;
                }

                return name !== fileName;
            });

            setInternalFiles(filteredFiles);

            if (!fileToDelete || typeof onRemove !== 'function') {
                return;
            }

            onRemove(fileToDelete);
        },
        [internalFiles, onRemove]
    );

    const handleClick = useCallback(async () => {
        const files = await selectFiles({
            multiple: true,
        });

        handleAddFiles(files);
    }, [handleAddFiles]);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const draggedFiles = Array.from(e.dataTransfer.files);

            handleAddFiles(draggedFiles);
        },
        [handleAddFiles]
    );

    const content = useMemo(() => {
        const items: ReactElement[] = internalFiles.map((file) => (
            <StyledMotionFileInputList
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                key={file.name}
                transition={{ duration: 0.25, type: 'tween' }}
            >
                <FileListItem
                    fileType={file.type}
                    fileName={file.name}
                    fileSize={file.size}
                    onRemove={handleDeleteFile}
                />
            </StyledMotionFileInputList>
        ));

        return items;
    }, [handleDeleteFile, internalFiles]);

    return useMemo(
        () => (
            <StyledFileInput>
                <StyledFileInputContainer
                    onClick={() => void handleClick()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => void handleDrop(e)}
                >
                    <Icon icons={icons} />
                    <StyledFileInputText>{placeholder}</StyledFileInputText>
                </StyledFileInputContainer>
                <List>
                    <AnimatePresence initial={false}>{content}</AnimatePresence>
                </List>
            </StyledFileInput>
        ),
        [content, handleClick, handleDrop, icons, placeholder]
    );
};

FileInput.displayName = 'FileInput';

export default FileInput;
