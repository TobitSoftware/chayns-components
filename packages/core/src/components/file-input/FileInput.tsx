import { AnimatePresence } from 'framer-motion';
import React, {
    DragEvent,
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { filterDuplicateFile } from '../../utils/file';
import { selectFiles } from '../../utils/fileDialog';
import Icon from '../icon/Icon';
import List from '../list/List';
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
     * The maximum amount of Files that can be uploaded.
     */
    maxFiles?: number;
    /**
     * A function to be executed when files are added.
     */
    onAdd?: (files: File[]) => void;
    /**
     * Function to be executed when the maximum amount of Files are reached.
     */
    onMaxFilesReached?: () => void;
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
    onMaxFilesReached,
    maxFiles,
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

    const isDisabled = useMemo(() => {
        if (maxFiles) {
            if (internalFiles.length >= maxFiles) {
                if (typeof onMaxFilesReached === 'function') {
                    onMaxFilesReached();
                }

                return true;
            }
        }

        return false;
    }, [internalFiles.length, maxFiles, onMaxFilesReached]);

    const handleClick = useCallback(async () => {
        if (isDisabled) {
            return;
        }

        const files = await selectFiles({
            multiple: true,
        });

        handleAddFiles(files);
    }, [handleAddFiles, isDisabled]);

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
                    isDisabled={isDisabled}
                    onClick={() => void handleClick()}
                    onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                    onDrop={(e: DragEvent<HTMLDivElement>) => void handleDrop(e)}
                >
                    <Icon icons={icons} />
                    <StyledFileInputText>{placeholder}</StyledFileInputText>
                </StyledFileInputContainer>
                <List>
                    <AnimatePresence initial={false}>{content}</AnimatePresence>
                </List>
            </StyledFileInput>
        ),
        [content, handleClick, handleDrop, icons, isDisabled, placeholder]
    );
};

FileInput.displayName = 'FileInput';

export default FileInput;
