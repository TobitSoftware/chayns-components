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
import type { Image, OnChange, UploadedFile } from '../../types/files';

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
    const [newFiles, setNewFiles] = useState<File[]>();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>();

    // console.log('uploadedFiles', uploadedFiles);

    /**
     * Upload files
     */
    const uploadFiles = useCallback(
        async (filesToUpload: File[]) => {
            if (!filesToUpload) {
                return;
            }

            // console.log('files', filesToUpload);

            const videos = filesToUpload.filter(({ type }) => type.includes('video/'));
            const images = filesToUpload.filter(({ type }) => type.includes('image/'));
            let newUploadedFiles: UploadedFile[] = [];

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
            const imageResult: Promise<Image>[] = images.map((image) =>
                imageUpload({
                    accessToken,
                    isAuthenticated,
                    file: image,
                    personId,
                })
            );

            newUploadedFiles = newUploadedFiles.concat(await Promise.all(imageResult));

            console.log('UPLOADED', newUploadedFiles);
            console.log('UPLOADE2D', newUploadedFiles.length);
            setUploadedFiles(newUploadedFiles);
        },
        [accessToken, isAuthenticated, personId]
    );

    /**
     * Upload files by props
     */
    useEffect(() => {
        if (!files) {
            return;
        }

        uploadFiles(files);

        // ToDo ignore
    }, []);

    /**
     * This function adds new data to the existing data list
     */
    const handleAdd = useCallback(
        (filesAdd: File[]) => {
            if (!filesAdd) {
                return;
            }

            uploadFiles(filesAdd);
            onChange({ files: uploadedFiles ?? [] });
        },
        [onChange, uploadFiles, uploadedFiles]
    );

    const handleGalleryFiles = useCallback(
        (addedFiles: File[]) => {
            if (!addedFiles) {
                return;
            }

            // console.log('W', addedFiles);

            const filteredGalleryFiles = addedFiles.filter(({ size }) => size / 1024 / 1024 < 64);

            if (addedFiles.length !== filteredGalleryFiles.length) {
                return;
            }

            handleAdd(filteredGalleryFiles);
        },
        [handleAdd]
    );

    /**
     * Open a dialog to select files
     */
    const openSelectDialog = useCallback(async () => {
        const selectedFiles: File[] = await selectFile({
            multiple: true,
            type: 'image/*, video/*',
        });

        // console.log('E', selectedFiles);

        if (selectedFiles && selectedFiles.length > 0) {
            const filesToArray = [...selectedFiles];

            handleGalleryFiles(filesToArray);
        }
    }, [handleGalleryFiles]);

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

        // console.log('T', uploadedFiles);

        // console.log('Ttr', uploadedFiles?.length);
        if (uploadedFiles) {
            // console.log('T2', uploadedFiles[0]);
            // console.log('T22', uploadedFiles);
            // ToDo update onClick for delete
            for (let i = 0; i === uploadedFiles.length; i++) {
                const file = uploadedFiles[i];
                // console.log('fileeee', file);
            }
            uploadedFiles.forEach((file) => {
                // console.log('fileeee', file);
                if ('thumbnailUrl' in file) {
                    items.push(
                        <StyledGalleryItem>
                            <StyledGalleryItemDelete />
                            <StyledGalleryItemVideo poster={file.thumbnailUrl}>
                                <source src={file.url} type="video/mp4" />
                            </StyledGalleryItemVideo>
                        </StyledGalleryItem>
                    );
                } else {
                    items.push(
                        <StyledGalleryItem>
                            <StyledGalleryItemDelete />
                            <StyledGalleryItemImage src={file.url} />
                        </StyledGalleryItem>
                    );
                }
            });
        }

        // console.log('items', items);

        items.push(
            <StyledGalleryItem>
                <StyledGalleryItemAdd onClick={openSelectDialog}>Test</StyledGalleryItemAdd>
            </StyledGalleryItem>
        );

        return items;
    }, [openSelectDialog, uploadedFiles]);

    // console.log(galleryItems);

    return <StyledGallery>{galleryItems}</StyledGallery>;
};

Gallery.displayName = 'Gallery';

export default Gallery;
