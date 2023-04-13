import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { imageUpload } from '../../api/image/post';
import { postVideo } from '../../api/video/post';
import { convertFileListToArray, filterDuplicateFiles, selectFiles } from '../../utils/file';
import {
    StyledGallery,
    StyledGalleryItem,
    StyledGalleryItemAdd,
    StyledGalleryItemDeleteButton,
    StyledGalleryItemImage,
    StyledGalleryItemPlayIcon,
    StyledGalleryItemVideo,
    StyledGalleryItemVideoWrapper,
} from './Gallery.styles';

// Types
import { Icon } from '@chayns-components/core';
import type { Image, UploadedFile, Video } from '../../types/files';

export type GalleryProps = {
    /**
     * AccessToken of the user
     */
    accessToken: string;
    /**
     *  Function to be executed when files are added
     */
    onAdd: (Files: UploadedFile[]) => void;
    /**
     *  Function to be executed when a file is removed
     */
    onRemove: (file: UploadedFile) => void;
    /**
     * PersonId of the user
     */
    personId: string;
};

const Gallery: FC<GalleryProps> = ({ accessToken, onAdd, onRemove, personId }) => {
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
            const videoResult: Promise<Video>[] = videos.map((video) =>
                postVideo({ accessToken, file: video })
            );

            newUploadedFiles = newUploadedFiles.concat(await Promise.all(videoResult));
            newUploadedFiles = newUploadedFiles.flat();

            // Upload images
            const imageResult: Promise<Image>[] = images.map((image) =>
                imageUpload({
                    accessToken,
                    file: image,
                    personId,
                })
            );

            newUploadedFiles = newUploadedFiles.concat(await Promise.all(imageResult));

            if (!uploadedFiles) {
                onAdd(newUploadedFiles);

                setUploadedFiles(newUploadedFiles);

                return;
            }

            const { newUniqueFiles } = filterDuplicateFiles(uploadedFiles, newUploadedFiles);

            onAdd(newUniqueFiles);

            setUploadedFiles((prevState) =>
                prevState ? [...prevState, ...newUniqueFiles] : [...newUniqueFiles]
            );
        },
        [accessToken, onAdd, personId, uploadedFiles]
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
        },
        [uploadFiles]
    );

    /**
     * Open a dialog to select files
     */
    const openSelectDialog = useCallback(() => {
        void selectFiles({
            multiple: true,
            type: 'image/*, video/*',
        }).then((selectedFiles) => {
            if (selectedFiles && selectedFiles.length > 0) {
                const fileArray = convertFileListToArray(selectedFiles);

                // Filters files to use only under 64MB
                const filteredFileArray = fileArray.filter(({ size, type }) => {
                    const sizeInMB = size / 1024 / 1024;

                    if (type.includes('video/') && sizeInMB > 500) {
                        return false;
                    }

                    return !(type.includes('image/') && sizeInMB > 64);
                });

                if (fileArray.length !== filteredFileArray.length) {
                    // ToDo show dialog that some files are to big
                }

                if (filteredFileArray.length === 0) {
                    // ToDo show dialog that all files are to big

                    return;
                }

                handleAdd(filteredFileArray);
            }
        });
    }, [handleAdd]);

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

            const deletedFile = uploadedFiles?.find((file) => {
                if ('thumbnailUrl' in file) {
                    return file.id === key;
                }
                return file.key === key;
            });

            setUploadedFiles(filteredFiles ?? []);

            if (!deletedFile) {
                return;
            }

            onRemove(deletedFile);
        },
        [onRemove, uploadedFiles]
    );

    /**
     * This function shows a selected file
     */
    const showFile = useCallback((file: UploadedFile) => {
        if ('thumbnailUrl' in file) {
            // @ts-expect-error: Type is correct here
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            void chayns.openVideo(file.url);

            return;
        }

        // @ts-expect-error: Type is correct here
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        void chayns.openImage([`${file.base}/${file.key}`], 0);
    }, []);

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
                            <StyledGalleryItemVideoWrapper onClick={() => showFile(file)}>
                                <StyledGalleryItemPlayIcon>
                                    <Icon size={30} icons={['fa fa-play']} />
                                </StyledGalleryItemPlayIcon>
                                <StyledGalleryItemVideo poster={file.thumbnailUrl}>
                                    <source src={file.url} type="video/mp4" />
                                </StyledGalleryItemVideo>
                            </StyledGalleryItemVideoWrapper>
                        ) : (
                            <StyledGalleryItemImage
                                onClick={() => showFile(file)}
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
                    <Icon size={40} icons={['fa fa-plus']} />
                </StyledGalleryItemAdd>
            </StyledGalleryItem>
        );

        return items;
    }, [handleDelete, openSelectDialog, showFile, uploadedFiles]);

    return <StyledGallery>{galleryItems}</StyledGallery>;
};

Gallery.displayName = 'Gallery';

export default Gallery;
