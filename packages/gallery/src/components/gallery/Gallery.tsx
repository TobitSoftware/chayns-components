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
import type { Image, OnChange, UploadedFile, Video } from '../../types/files';

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
    const [items, setItems] = useState<ReactElement[]>([]);

    /**
     * Upload files
     */
    const uploadFiles = useCallback(
        async (filesToUpload: File[]) => {
            if (!filesToUpload) {
                return;
            }

            const videos = filesToUpload.filter(({ type }) => type.includes('video/'));
            const images = filesToUpload.filter(({ type }) => type.includes('image/'));
            let newUploadedFiles: UploadedFile[] = [];

            // Upload videos
            const videoResult: Promise<Video>[] = videos.map((video) =>
                postVideo({ accessToken, file: video })
            );

            newUploadedFiles = newUploadedFiles.concat(await Promise.all(videoResult));

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

        void uploadFiles(files);

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

            void uploadFiles(filesAdd);
            onChange({ files: uploadedFiles ?? [] });
        },
        [onChange, uploadFiles, uploadedFiles]
    );

    const handleGalleryFiles = useCallback(
        (addedFiles: File[]) => {
            if (!addedFiles) {
                return;
            }

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

        if (selectedFiles && selectedFiles.length > 0) {
            const filesToArray = [...selectedFiles];

            handleGalleryFiles(filesToArray);
        }
    }, [handleGalleryFiles]);

    /**
     * This function deletes a selected file from the data list
     */
    const handleDelete = useCallback((event) => {
        console.log('Event', event);

        // ToDo filter 'items' to remove file

        // onChange({ files: uploadedFiles ?? [] });
    }, []);

    const galleryItems = useMemo(() => {
        let newItems: ReactElement[] = items;

        if (uploadedFiles) {
            // ToDo update onClick for delete
            uploadedFiles.forEach((file) => {
                if ('thumbnailUrl' in file) {
                    const newItem = (
                        <StyledGalleryItem key={file.id}>
                            <StyledGalleryItemDelete onClick={(event) => console.log(event)}>
                                X
                            </StyledGalleryItemDelete>
                            <StyledGalleryItemVideo poster={file.thumbnailUrl}>
                                <source src={file.url} type="video/mp4" />
                            </StyledGalleryItemVideo>
                        </StyledGalleryItem>
                    );

                    newItems.push(newItem);
                } else {
                    // console.log(newItems.filter(({ key }) => key !== file.key));
                    const newItem = (
                        <StyledGalleryItem key={file.key}>
                            <StyledGalleryItemDelete />
                            <StyledGalleryItemImage
                                draggable={false}
                                src={`${file.base}/${file.key}`}
                            />
                        </StyledGalleryItem>
                    );

                    newItems.push(newItem);
                }
            });
        }

        newItems = newItems.filter(({ key }) => key !== 'addButton');

        const newItem = (
            <StyledGalleryItem key="addButton">
                <StyledGalleryItemAdd onClick={openSelectDialog}>+</StyledGalleryItemAdd>
            </StyledGalleryItem>
        );

        newItems.push(newItem);
        setItems(newItems);

        return newItems;
        // Ignore items because items state is changed here
    }, [openSelectDialog, uploadedFiles]);

    console.log('ITEMS', galleryItems);

    return <StyledGallery>{galleryItems}</StyledGallery>;
};

Gallery.displayName = 'Gallery';

export default Gallery;
