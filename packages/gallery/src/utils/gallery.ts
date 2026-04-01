import type { FileItem, InternalFileItem } from '@chayns-components/core';
import {
    MediaType,
    openImage,
    openMedia,
    type OpenImageItem,
    type OpenMediaItem,
    openVideo,
} from 'chayns-api';
import { GalleryViewMode } from '../types/gallery';

const DEFAULT_MEDIA_RATIO = 1;

export const mapFilesToInternalItems = (files?: FileItem[]): InternalFileItem[] =>
    (files ?? []).map((file, index) => ({
        id: getGalleryViewerKey(file, index),
        uploadedFile: file.file,
        file: undefined,
        state: 'uploaded',
        previewUrl: undefined,
    }));

export const getGalleryViewerKey = (fileItem: FileItem, index: number): string =>
    fileItem.id ?? fileItem.file.id ?? fileItem.file.url ?? `gallery-item-${index}`;

export const getGalleryRatio = (fileItems: FileItem[]): number => {
    switch (fileItems.length) {
        case 0:
            return DEFAULT_MEDIA_RATIO;
        case 1:
            return Math.max(fileItems[0]?.file.ratio ?? DEFAULT_MEDIA_RATIO, 1);
        case 2:
            return 2;
        case 3:
            return 3;
        default:
            return DEFAULT_MEDIA_RATIO;
    }
};

export const getReadOnlyItemRatio = ({
    fileItems,
    index,
    viewMode,
}: {
    fileItems: FileItem[];
    index: number;
    viewMode: GalleryViewMode;
}): number => {
    const itemCount = fileItems.length;

    if (viewMode !== GalleryViewMode.GRID) {
        return DEFAULT_MEDIA_RATIO;
    }

    if (itemCount === 1) {
        // A square fallback keeps virtualization stable when upstream data does not provide a ratio.
        return Math.max(fileItems[0]?.file.ratio ?? DEFAULT_MEDIA_RATIO, DEFAULT_MEDIA_RATIO);
    }

    if (itemCount === 2 && (index === 0 || index === 1)) {
        return 0.5;
    }

    if ((index === 0 && itemCount > 2) || (itemCount === 3 && (index === 1 || index === 2))) {
        return 1.5;
    }

    return DEFAULT_MEDIA_RATIO;
};

export const openFiles = (fileItems: InternalFileItem[], file: InternalFileItem) => {
    let startIndex = 0;

    try {
        startIndex = fileItems.findIndex((item) => item.id === file.id);

        const items: OpenMediaItem[] = fileItems.map((item) => ({
            url: item.uploadedFile?.url.replace('_0.mp4', '.mp4') ?? '',
            mediaType:
                item.uploadedFile && 'thumbnailUrl' in item.uploadedFile
                    ? MediaType.VIDEO
                    : MediaType.IMAGE,
        }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        void openMedia({ items, startIndex });
    } catch (_) {
        if (file.uploadedFile && 'thumbnailUrl' in file.uploadedFile) {
            void openVideo({ url: file.uploadedFile.url });

            return;
        }

        const imageFiles: OpenImageItem[] = [];

        fileItems.forEach(({ uploadedFile }) => {
            if (uploadedFile && !('thumbnailUrl' in uploadedFile)) {
                imageFiles.push({ url: uploadedFile.url });
            }
        });

        startIndex = imageFiles.findIndex((item) => item.url === file.uploadedFile?.url);

        const startFile = imageFiles.shift();

        if (!startFile) {
            return;
        }

        void openImage({ items: [startFile, ...imageFiles], startIndex });
    }
};

export const openKnownFiles = (fileItems: FileItem[], file: FileItem) => {
    const activeFileKey = getGalleryViewerKey(file, fileItems.indexOf(file));
    let startIndex = 0;

    try {
        startIndex = fileItems.findIndex(
            (item, index) => getGalleryViewerKey(item, index) === activeFileKey,
        );

        const items: OpenMediaItem[] = fileItems.map((item) => ({
            url: item.file.url.replace('_0.mp4', '.mp4'),
            mediaType: 'thumbnailUrl' in item.file ? MediaType.VIDEO : MediaType.IMAGE,
        }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        void openMedia({ items, startIndex });
    } catch (_) {
        if ('thumbnailUrl' in file.file) {
            void openVideo({ url: file.file.url });

            return;
        }

        const imageFiles: OpenImageItem[] = [];

        fileItems.forEach((item) => {
            if (!('thumbnailUrl' in item.file)) {
                imageFiles.push({ url: item.file.url });
            }
        });

        startIndex = imageFiles.findIndex((item) => item.url === file.file.url);

        const startFile = imageFiles.shift();

        if (!startFile) {
            return;
        }

        void openImage({ items: [startFile, ...imageFiles], startIndex });
    }
};
