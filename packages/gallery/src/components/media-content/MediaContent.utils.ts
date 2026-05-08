import type { FileItem, Image, Video } from '@chayns-components/core';

export type GalleryMediaFile = FileItem['file'];

export const isVideoFile = (file: GalleryMediaFile): file is Video => 'thumbnailUrl' in file;

export const getMediaSourceUrl = (file: GalleryMediaFile): string =>
    file.url.replace('_0.mp4', '.mp4');

export const getMediaPreviewUrl = (
    file: GalleryMediaFile,
    previewUrl?: string,
): string | undefined => {
    if (previewUrl) {
        return previewUrl;
    }

    if (isVideoFile(file)) {
        return file.thumbnailUrl;
    }

    return (file as Image).meta?.preview;
};
