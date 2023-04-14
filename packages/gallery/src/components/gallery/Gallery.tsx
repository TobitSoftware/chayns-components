import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { imageUpload } from '../../api/image/imageUpload';
import { videoUpload } from '../../api/video/videoUpload';
import {
    convertFileListToArray,
    filterDuplicateFiles,
    getBaseAndRoute,
    selectFiles,
} from '../../utils/file';
import {
    StyledGallery,
    StyledGalleryItem,
    StyledGalleryItemAdd,
    StyledGalleryItemDeleteButton,
    StyledGalleryItemImage,
    StyledGalleryItemPlayIcon,
    StyledGalleryItemVideo,
    StyledGalleryItemVideoWrapper,
    StyledGalleryItemWrapper,
    StyledGalleryView,
    StyledGalleryViewGrid,
    StyledGalleryViewItem,
    StyledGalleryViewMoreItem,
    StyledGalleryViewMoreItemNumber,
} from './Gallery.styles';

// Types
import { Icon } from '@chayns-components/core';
import type { Files, Image, UploadedFile, Video } from '../../types/files';

export type GalleryProps = {
    /**
     * AccessToken of the user
     */
    accessToken: string;
    /**
     * Whether drag and drop is allowed or not
     */
    allowDragAndDrop: boolean;
    /**
     *  Whether images and videos can be edited
     */
    editMode?: boolean;
    /**
     *  Images and videos which should be displayed
     */
    files?: Files[];
    /**
     *  Function to be executed when files are added
     */
    onAdd?: (Files: UploadedFile[]) => void;
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
    editMode = false,
    files,
    onAdd,
    onRemove,
    personId,
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>();

    /**
     * Merge external files with uploaded files
     */
    useEffect(() => {
        const externalFiles: UploadedFile[] = [];

        if (!files || !Array.isArray(files)) {
            return;
        }

        files.forEach((file) => {
            if ('thumbnailUrl' in file) {
                externalFiles.push({
                    id: file.id,
                    url: file.url,
                    thumbnailUrl: file.url,
                });
            }

            const { base, route } = getBaseAndRoute(file.url);

            externalFiles.push({
                key: route,
                base,
            });
        });

        setUploadedFiles((prevState) =>
            prevState ? [...prevState, ...externalFiles] : [...externalFiles]
        );
    }, [files]);

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
                videoUpload({ accessToken, file: video })
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
                if (onAdd) {
                    onAdd(newUploadedFiles);
                }

                setUploadedFiles(newUploadedFiles);

                return;
            }

            const { newUniqueFiles } = filterDuplicateFiles(uploadedFiles, newUploadedFiles);

            if (onAdd) {
                onAdd(newUniqueFiles);
            }

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

            if (onRemove) {
                onRemove(deletedFile);
            }
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

    /**
     * This function shows a selected file
     */
    // const showFiles = useCallback((files: UploadedFile[], index: number) => {
    //     // if ('thumbnailUrl' in file) {
    //     //     // @ts-expect-error: Type is correct here
    //     //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    //     //     void chayns.openVideo(file.url);
    //     //
    //     //     return;
    //     // }
    //     const formattedFiles: string[] = [];
    //     onClick={() => showFiles(uploadedFiles, index)}
    //
    //     files.forEach((file) => {
    //         if ('thumbnailUrl' in file) {
    //             formattedFiles.push(file.url);
    //
    //             return;
    //         }
    //
    //         formattedFiles.push(`${file.base}/${file.key}`);
    //     });
    //     // @ts-expect-error: Type is correct here
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    //     void chayns.openImage([formattedFiles], index);
    //     // void chayns.openImage([`${file.base}/${file.key}`], 0);
    // }, []);

    /**
     * This function handles the drag and drop
     */
    const handleDrop = (e: {
        preventDefault: () => void;
        dataTransfer: { files: Iterable<File> | ArrayLike<File> };
    }) => {
        e.preventDefault();
        const draggedFiles = Array.from(e.dataTransfer.files);

        void uploadFiles(draggedFiles);
    };

    /**
     * Returns the ratio of the single file
     */
    const ratio = useMemo(() => {
        if (!uploadedFiles) {
            return 1;
        }

        const file = uploadedFiles[0];

        if (file && file.ratio && uploadedFiles.length === 1) {
            if (file.ratio > 1) {
                return file.ratio;
            }
        }

        return 1;
    }, [uploadedFiles]);

    /**
     * Returns the number of columns
     */
    const columns = useMemo(() => {
        if (!uploadedFiles) {
            return '';
        }

        if (uploadedFiles.length === 2) {
            return 'repeat(2, 1fr)';
        }

        if (uploadedFiles.length === 3) {
            return 'repeat(3, 1fr)';
        }

        if (uploadedFiles.length >= 4) {
            return 'repeat(2, 1fr)';
        }

        return '';
    }, [uploadedFiles]);

    const galleryItems = useMemo(() => {
        const items: ReactElement[] = [];

        if (editMode) {
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
                                    <StyledGalleryItemVideo
                                        ratio={ratio}
                                        poster={file.thumbnailUrl}
                                    >
                                        <source src={file.url} type="video/mp4" />
                                    </StyledGalleryItemVideo>
                                </StyledGalleryItemVideoWrapper>
                            ) : (
                                <StyledGalleryItemImage
                                    ratio={ratio}
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
        }

        if (!uploadedFiles) {
            return items;
        }

        if (uploadedFiles.length === 1) {
            const file = uploadedFiles[0];

            items.push(
                <StyledGalleryView>
                    <StyledGalleryViewItem>
                        {file && 'thumbnailUrl' in file ? (
                            <StyledGalleryItemVideoWrapper>
                                <StyledGalleryItemPlayIcon>
                                    <Icon size={40} icons={['fa fa-play']} />
                                </StyledGalleryItemPlayIcon>
                                <StyledGalleryItemVideo ratio={ratio} poster={file.thumbnailUrl}>
                                    <source src={file.url} type="video/mp4" />
                                </StyledGalleryItemVideo>
                            </StyledGalleryItemVideoWrapper>
                        ) : (
                            <StyledGalleryItemImage
                                ratio={ratio}
                                draggable={false}
                                src={`${file?.base ?? ''}/${file?.key ?? ''}`}
                                alt="Media"
                            />
                        )}
                    </StyledGalleryViewItem>
                </StyledGalleryView>
            );
        }

        if (uploadedFiles.length === 2 || uploadedFiles.length === 3) {
            items.push(
                <StyledGalleryViewGrid columns={columns}>
                    {uploadedFiles.map((file) => {
                        if ('thumbnailUrl' in file) {
                            return (
                                <StyledGalleryViewItem>
                                    <StyledGalleryItemVideoWrapper>
                                        <StyledGalleryItemPlayIcon>
                                            <Icon size={40} icons={['fa fa-play']} />
                                        </StyledGalleryItemPlayIcon>
                                        <StyledGalleryItemVideo
                                            ratio={ratio}
                                            poster={file.thumbnailUrl}
                                        >
                                            <source src={file.url} type="video/mp4" />
                                        </StyledGalleryItemVideo>
                                    </StyledGalleryItemVideoWrapper>
                                </StyledGalleryViewItem>
                            );
                        }

                        return (
                            <StyledGalleryItemImage
                                ratio={ratio}
                                draggable={false}
                                src={`${file.base}/${file.key}`}
                                alt="Media"
                            />
                        );
                    })}
                </StyledGalleryViewGrid>
            );
        }

        if (uploadedFiles.length >= 4) {
            if (uploadedFiles.length === 4) {
                items.push(
                    <StyledGalleryViewGrid columns={columns}>
                        {uploadedFiles.map((file) => {
                            if ('thumbnailUrl' in file) {
                                return (
                                    <StyledGalleryViewItem>
                                        <StyledGalleryItemVideoWrapper>
                                            <StyledGalleryItemPlayIcon>
                                                <Icon size={40} icons={['fa fa-play']} />
                                            </StyledGalleryItemPlayIcon>
                                            <StyledGalleryItemVideo
                                                ratio={ratio}
                                                poster={file.thumbnailUrl}
                                            >
                                                <source src={file.url} type="video/mp4" />
                                            </StyledGalleryItemVideo>
                                        </StyledGalleryItemVideoWrapper>
                                    </StyledGalleryViewItem>
                                );
                            }

                            return (
                                <StyledGalleryItemImage
                                    ratio={ratio}
                                    draggable={false}
                                    src={`${file.base}/${file.key}`}
                                    alt="Media"
                                />
                            );
                        })}
                    </StyledGalleryViewGrid>
                );

                return items;
            }

            const lastFile = uploadedFiles[3];

            items.push(
                <StyledGalleryViewGrid columns={columns}>
                    {uploadedFiles.slice(0, 3).map((file) => {
                        if ('thumbnailUrl' in file) {
                            return (
                                <StyledGalleryViewItem>
                                    <StyledGalleryItemVideoWrapper>
                                        <StyledGalleryItemPlayIcon>
                                            <Icon size={40} icons={['fa fa-play']} />
                                        </StyledGalleryItemPlayIcon>
                                        <StyledGalleryItemVideo
                                            ratio={ratio}
                                            poster={file.thumbnailUrl}
                                        >
                                            <source src={file.url} type="video/mp4" />
                                        </StyledGalleryItemVideo>
                                    </StyledGalleryItemVideoWrapper>
                                </StyledGalleryViewItem>
                            );
                        }

                        return (
                            <StyledGalleryItemImage
                                ratio={ratio}
                                draggable={false}
                                src={`${file.base}/${file.key}`}
                                alt="Media"
                            />
                        );
                    })}
                    <StyledGalleryViewItem>
                        <StyledGalleryViewMoreItem>
                            {lastFile && 'thumbnailUrl' in lastFile ? (
                                <StyledGalleryItemVideo
                                    ratio={ratio}
                                    poster={lastFile.thumbnailUrl}
                                >
                                    <source src={lastFile.url} type="video/mp4" />
                                </StyledGalleryItemVideo>
                            ) : (
                                <StyledGalleryItemImage
                                    ratio={ratio}
                                    draggable={false}
                                    src={`${lastFile?.base ?? ''}/${lastFile?.key ?? ''}`}
                                    alt="Media"
                                />
                            )}
                        </StyledGalleryViewMoreItem>
                        <StyledGalleryViewMoreItemNumber>
                            <p>{`+ ${uploadedFiles.length - 3}`}</p>
                        </StyledGalleryViewMoreItemNumber>
                    </StyledGalleryViewItem>
                </StyledGalleryViewGrid>
            );
        }

        return items;
    }, [columns, editMode, handleDelete, openSelectDialog, ratio, showFile, uploadedFiles]);

    return (
        <StyledGallery>
            {editMode ? (
                <StyledGalleryItemWrapper
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={allowDragAndDrop ? handleDrop : undefined}
                >
                    {galleryItems}
                </StyledGalleryItemWrapper>
            ) : (
                galleryItems
            )}
        </StyledGallery>
    );
};

Gallery.displayName = 'Gallery';

export default Gallery;
