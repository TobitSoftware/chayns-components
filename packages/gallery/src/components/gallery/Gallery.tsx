import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { postVideo } from '../../api/video/post';
import { imageUpload } from '../../utils/imageUpload';
import { selectFile } from '../../utils/selectFile';
import {
    StyledGallery,
    StyledGalleryItem,
    StyledGalleryItemAdd,
    StyledGalleryItemDeleteButton,
    StyledGalleryItemImage,
    StyledGalleryItemVideo,
} from './Gallery.styles';

// Types
import { Icon } from '@chayns-components/core';
import type { Image, OnChange, UploadedFile, Video } from '../../types/files';
import { filterDuplicates } from '../../utils/filter';

export type GalleryProps = {
    /**
     * AccessToken of the user
     */
    accessToken: string;
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

const Gallery: FC<GalleryProps> = ({ accessToken, isAuthenticated, onChange, personId }) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>();

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
            // ToDo fix type of api call
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

            if (!uploadedFiles) {
                setUploadedFiles(newUploadedFiles);

                return;
            }

            setUploadedFiles(filterDuplicates(uploadedFiles, newUploadedFiles));
        },
        [accessToken, isAuthenticated, personId, uploadedFiles]
    );

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

    /**
     * This function handles the incoming files by size
     */
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
    const handleDelete = useCallback(
        (key: number | string) => {
            const filteredFiles = uploadedFiles?.filter((file) => {
                if ('thumbnailUrl' in file) {
                    return file.id !== key;
                }
                return file.key !== key;
            });

            setUploadedFiles(filteredFiles ?? []);

            onChange({ files: uploadedFiles ?? [] });
        },
        [onChange, uploadedFiles]
    );

    const galleryItems = useMemo(() => {
        const items: ReactElement[] = [];

        if (uploadedFiles) {
            uploadedFiles.forEach((file) => {
                items.push(
                    <StyledGalleryItem key={'thumbnailUrl' in file ? file.id : file.key}>
                        <StyledGalleryItemDeleteButton
                            onClick={() =>
                                handleDelete('thumbnailUrl' in file ? file.id : file.key)
                            }
                        >
                            <Icon size={20} icons={['ts-wrong']} />
                        </StyledGalleryItemDeleteButton>
                        {'thumbnailUrl' in file ? (
                            <StyledGalleryItemVideo poster={file.thumbnailUrl}>
                                <source src={file.url} type="video/mp4" />
                            </StyledGalleryItemVideo>
                        ) : (
                            <StyledGalleryItemImage
                                draggable={false}
                                src={`${file.base}/${file.key}`}
                            />
                        )}
                    </StyledGalleryItem>
                );
            });
        }

        items.push(
            <StyledGalleryItem key="addButton">
                <StyledGalleryItemAdd onClick={openSelectDialog}>
                    <Icon size={50} icons={['ts-gallery']} />
                </StyledGalleryItemAdd>
            </StyledGalleryItem>
        );

        return items;
    }, [handleDelete, openSelectDialog, uploadedFiles]);

    return <StyledGallery>{galleryItems}</StyledGallery>;
};

Gallery.displayName = 'Gallery';

export default Gallery;
