import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

// Styles
import {
    StyledGallery,
    StyledGalleryItem,
    StyledGalleryItemAdd,
    StyledGalleryItemDelete,
    StyledGalleryItemImage,
    StyledGalleryItemVideo,
} from './Gallery.styles';

// Functions
import { postVideo } from '../../api/video/post';
import { imageUpload } from '../../utils/imageUpload';
import { selectFile } from '../../utils/selectFile';

// Types
import type { ImageUploadResult, OnChange, UploadedFile } from '../../types/files';

export type GalleryProps = {
    /**
     * AccessToken of the user
     */
    accessToken: string;
    /**
     * Images & videos which should be displayed
     */
    files: File[];
    /**
     * If user is authenticated
     */
    isAuthenticated: boolean;
    /**
     *  Function to be executed when files are added or removed
     */
    onChange: ({ files }: OnChange) => void;
    /**
     * PersonId of the user
     */
    personId: string;
};

const Gallery: FC<GalleryProps> = ({ accessToken, files, isAuthenticated, onChange, personId }) => {
    const [newFiles] = useState<File[]>(files);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>();

    console.log('updatetFiles', uploadedFiles);

    /**
     * Upload files
     */
    const uploadFiles = useCallback(
        (filesToUpload: File[]) => {
            if (!filesToUpload) {
                return;
            }

            console.log(filesToUpload[0]);

            const videos = filesToUpload[0].filter(({ type }) => type.includes('video/'));
            const images = filesToUpload[0].filter(({ type }) => type.includes('image/'));
            const newUploadedFiles: UploadedFile[] = [];

            // Upload videos
            videos.forEach((video) => {
                void postVideo({ accessToken, file: video }).then(({ data }) => {
                    if (!data) {
                        return;
                    }

                    newUploadedFiles.push(data);
                });
            });

            // Upload images
            images.forEach((image) => {
                void imageUpload({
                    accessToken,
                    isAuthenticated,
                    file: image,
                    personId,
                }).then((result: ImageUploadResult) => {
                    if (
                        typeof result?.base === 'string' &&
                        typeof result.key === 'string' &&
                        typeof result.meta?.preview === 'string'
                    ) {
                        newUploadedFiles.push({ url: `${result.base}/${result.key}` });
                    }
                });
            });

            setUploadedFiles(newUploadedFiles);
        },
        [accessToken, isAuthenticated, personId]
    );

    /**
     * Upload first files
     */
    useEffect(() => {
        if (!newFiles) {
            return;
        }

        uploadFiles(newFiles);

        // ToDo ignore
    }, []);

    const handleGalleryFiles = useCallback(
        (addedFiles: File[]) => {
            const filteredGalleryFiles = addedFiles.filter(({ size }) => size / 1024 / 1024 < 64);

            if (addedFiles.length !== filteredGalleryFiles.length) {
                return;
            }

            uploadFiles(filteredGalleryFiles);
        },
        [uploadFiles]
    );

    /**
     * This function adds new data to the existing data list
     */
    const handleAdd = useCallback(
        (file: File) => {
            if (!file) {
                return;
            }

            uploadFiles([file]);
            onChange({ files: uploadedFiles ?? [] });
        },
        [onChange, uploadFiles, uploadedFiles]
    );

    /**
     * Open a dialog to select files
     */
    const openSelectDialog = useCallback(async () => {
        const selectedFiles: FileList | undefined = await selectFile({
            multiple: true,
            type: 'image/*, video/*',
        });

        console.log(selectedFiles);

        if (selectedFiles && selectedFiles.length > 0) {
            handleAdd(Object.values(selectedFiles));
        }
    }, [handleAdd]);

    /**
     * This function deletes a selected file from the data list
     */
    const handleDelete = useCallback((file: File) => {
        if (!file) {
            return;
        }

        // ToDo filter 'uploadedFiles' for removed file

        onChange({ files: uploadedFiles ?? [] });
    }, []);

    const galleryItems = useMemo(() => {
        const items: ReactElement[] = [];

        if (uploadedFiles) {
            // ToDo update onClick for delete
            uploadedFiles.forEach((file) => {
                if ('thumbnailUrl' in file) {
                    items.push(
                        <StyledGalleryItem>
                            <StyledGalleryItemDelete onClick={handleDelete(file)} />
                            <StyledGalleryItemVideo poster={file.thumbnailUrl}>
                                <source src={file.url} type="video/mp4" />
                            </StyledGalleryItemVideo>
                        </StyledGalleryItem>
                    );
                } else {
                    items.push(
                        <StyledGalleryItem>
                            <StyledGalleryItemDelete onClick={(file) => handleDelete(file)} />
                            <StyledGalleryItemImage src={file.url} />
                        </StyledGalleryItem>
                    );
                }
            });
        }

        items.push(
            <StyledGalleryItem>
                <StyledGalleryItemAdd onClick={openSelectDialog}>Test</StyledGalleryItemAdd>
            </StyledGalleryItem>
        );

        return items;
    }, [handleDelete, openSelectDialog, uploadedFiles]);

    console.log(galleryItems);

    return <StyledGallery>{galleryItems}</StyledGallery>;
};

Gallery.displayName = 'Gallery';

export default Gallery;
