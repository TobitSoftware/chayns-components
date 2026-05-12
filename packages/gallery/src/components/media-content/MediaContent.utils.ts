import type { FileItem, Video } from '@chayns-components/core';

export type GalleryMediaFile = FileItem['file'];
export type MediaContentSize = {
    height: number;
    width: number;
};

const IMAGE_SERVICE_ORIGINS = new Set(['https://tsimg.cloud', 'https://tsimg.space']);
const IMAGE_SERVICE_PARAM_PATTERN = /^(?:m(?:scale|crop|shortedgescale)|[whsbd]\d+)$/i;
const IMAGE_SERVICE_RESIZE_OVERSCAN = 1.25;

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

    return file.meta?.preview;
};

/**
 * Checks whether the given URL belongs to the chayns image service.
 */
export const isImageServiceUrl = (url: string): boolean => {
    try {
        return IMAGE_SERVICE_ORIGINS.has(new URL(url).origin);
    } catch {
        return false;
    }
};

/**
 * Detects whether the given image-service URL already contains resize parameters.
 */
export const hasImageServiceTransformParameters = (url: string): boolean => {
    if (!isImageServiceUrl(url)) {
        return false;
    }

    try {
        const urlObject = new URL(url);
        const fileName = urlObject.pathname.split('/').pop();

        if (!fileName) {
            return false;
        }

        const extensionIndex = fileName.lastIndexOf('.');
        const nameWithoutExtension =
            extensionIndex > -1 ? fileName.slice(0, extensionIndex) : fileName;
        const parameterSegment = nameWithoutExtension.split('_').pop();

        if (!parameterSegment || parameterSegment === nameWithoutExtension) {
            return false;
        }

        return parameterSegment
            .split('-')
            .every((parameter) => IMAGE_SERVICE_PARAM_PATTERN.test(parameter));
    } catch {
        return false;
    }
};

const getImageServiceParameterSegment = (size: MediaContentSize, devicePixelRatio: number) => {
    const scaleFactor =
        Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1;
    const width = Math.max(1, Math.ceil(size.width * scaleFactor * IMAGE_SERVICE_RESIZE_OVERSCAN));
    const height = Math.max(
        1,
        Math.ceil(size.height * scaleFactor * IMAGE_SERVICE_RESIZE_OVERSCAN),
    );

    return `w${width}-h${height}`;
};

/**
 * Expands a chayns image-service URL to a display-appropriate size when no transform is present.
 */
export const getResponsiveImageServiceUrl = (
    url: string,
    size?: MediaContentSize,
    devicePixelRatio = 1,
): string => {
    if (!size || hasImageServiceTransformParameters(url) || !isImageServiceUrl(url)) {
        return url;
    }

    try {
        const urlObject = new URL(url);
        const pathSegments = urlObject.pathname.split('/');
        const fileName = pathSegments.pop();

        if (!fileName) {
            return url;
        }

        const extensionIndex = fileName.lastIndexOf('.');
        const extension = extensionIndex > -1 ? fileName.slice(extensionIndex) : '';
        const fileBaseName = extensionIndex > -1 ? fileName.slice(0, extensionIndex) : fileName;

        pathSegments.push(
            `${fileBaseName}_${getImageServiceParameterSegment(size, devicePixelRatio)}${extension}`,
        );
        urlObject.pathname = pathSegments.join('/');

        return urlObject.toString();
    } catch {
        return url;
    }
};
