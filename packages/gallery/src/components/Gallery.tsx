import React, { DragEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import type { ExternalFile, UploadedFile } from '../types/files';
import { filterDuplicateFiles, uploadFiles } from '../utils/file';
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
    files?: ExternalFile[];
    /**
     *  Function to be executed when files are added
     */
    onAdd?: (files: UploadedFile[]) => void;
    /**
     *  Function to be executed when a file is removed
     */
    onRemove?: (file: UploadedFile) => void;
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
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [externalFiles, setExternalFiles] = useState<UploadedFile[]>([]);

    const combinedFiles = useMemo(
        () => [...externalFiles, ...uploadedFiles],
        [externalFiles, uploadedFiles]
    );

    /**
     * Merge external files with uploaded files
     */
    useEffect(() => {
        if (!files || !Array.isArray(files)) {
            return;
        }

        const newExternalFiles: UploadedFile[] = files.map((file) => {
            if ('thumbnailUrl' in file) {
                return {
                    id: file.id,
                    url: file.url,
                    thumbnailUrl: file.url,
                };
            }

            return {
                id: file.id,
                url: file.url,
            };
        });

        setExternalFiles(newExternalFiles);
    }, [files]);

    /**
     * This function deletes a selected file from the file list
     */
    const handleDeleteFile = useCallback(
        (url: string) => {
            let fileToDelete: UploadedFile | undefined;

            const externalFileToDelete = externalFiles.find((file) => file.url === url);

            if (externalFileToDelete && typeof onRemove === 'function') {
                onRemove(externalFileToDelete);

                return;
            }

            const filteredFiles = uploadedFiles.filter((file) => {
                const fileUrl = file.url;

                if (fileUrl === url) {
                    fileToDelete = file;
                }

                return fileUrl !== url;
            });

            setUploadedFiles(filteredFiles);

            if (!fileToDelete || !onRemove) {
                return;
            }

            onRemove(fileToDelete);
        },
        [externalFiles, onRemove, uploadedFiles]
    );

    /**
     * This function handles the drag and drop
     */
    const handleDrop = useCallback(
        async (e: DragEvent<HTMLDivElement>) => {
            if (!allowDragAndDrop) {
                return;
            }

            e.preventDefault();
            const draggedFiles = Array.from(e.dataTransfer.files);

            const updatedFiles = await uploadFiles({
                accessToken,
                filesToUpload: draggedFiles,
                personId,
            });

            const { newUniqueFiles } = filterDuplicateFiles({
                oldFiles: uploadedFiles,
                newFiles: updatedFiles,
            });

            setUploadedFiles((prevState) => [...prevState, ...newUniqueFiles]);

            if (!onAdd) {
                return;
            }

            onAdd(newUniqueFiles);
        },
        [accessToken, allowDragAndDrop, onAdd, personId, uploadedFiles]
    );

    /**
     * Returns the ratio of the single file
     */
    const ratio = useMemo(
        () =>
            // If the length is 1, the ratio or at least 1 is returned
            combinedFiles.length === 1 ? Math.max(combinedFiles[0]?.ratio ?? 1, 1) : 1,
        [combinedFiles]
    );

    /**
     * Returns the number of columns
     */
    const columns = useMemo(() => {
        const combinedFilesLength = combinedFiles.length;

        if (combinedFilesLength <= 1) {
            return '';
        }

        return `repeat(${combinedFilesLength === 3 ? 3 : 2}, 1fr)`;
    }, [combinedFiles]);

    const galleryContent = useMemo(() => {
        const combinedFilesLength = combinedFiles.length;

        if (isEditMode) {
            const items = combinedFiles.map((file) => (
                <GalleryItem
                    uploadedFile={file}
                    isEditMode
                    ratio={ratio}
                    handleDeleteFile={handleDeleteFile}
                />
            ));

            items.push(
                <AddFile
                    setUploadedFiles={setUploadedFiles}
                    uploadedFiles={uploadedFiles}
                    onAdd={onAdd}
                    personId={personId}
                    accessToken={accessToken}
                />
            );

            return items;
        }

        const shortedFiles = combinedFiles.slice(0, 4);

        return shortedFiles.map((file, index) => (
            <GalleryItem
                uploadedFile={file}
                isEditMode={false}
                ratio={ratio}
                handleDeleteFile={handleDeleteFile}
                remainingItemsLength={
                    combinedFilesLength > 4 && index === 3 ? combinedFilesLength : undefined
                }
            />
        ));
    }, [
        combinedFiles,
        isEditMode,
        uploadedFiles,
        onAdd,
        personId,
        accessToken,
        ratio,
        handleDeleteFile,
    ]);

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
                        columns={columns}
                        uploadedFileLength={combinedFiles.length}
                    >
                        {galleryContent}
                    </StyledGalleryItemWrapper>
                )}
            </StyledGallery>
        ),
        [isEditMode, galleryContent, columns, combinedFiles.length, handleDrop]
    );
};

Gallery.displayName = 'Gallery';

export default Gallery;
