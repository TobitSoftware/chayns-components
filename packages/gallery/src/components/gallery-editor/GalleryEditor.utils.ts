import type { FileItem, InternalFileItem } from '@chayns-components/core';

export const mapExternalFilesIntoInternalItems = (files?: FileItem[]): InternalFileItem[] =>
    (files ?? []).map((file, index) => ({
        id: file.id ?? file.file.id ?? file.file.url ?? `gallery-item-${index}`,
        uploadedFile: file.file,
        file: undefined,
        state: 'uploaded',
        previewUrl: undefined,
    }));

export const mergeExternalFilesWithInternalState = (
    internalItems: InternalFileItem[],
    externalItems: InternalFileItem[],
): InternalFileItem[] => {
    const mergedItems = internalItems.map((prevItem) => {
        const matchingItem = externalItems.find(
            (item) =>
                item.uploadedFile &&
                prevItem.uploadedFile &&
                item.uploadedFile.url === prevItem.uploadedFile.url,
        );

        return matchingItem || prevItem;
    });

    return mergedItems.concat(
        externalItems.filter(
            (newItem) =>
                !internalItems.some(
                    (prevItem) =>
                        prevItem.uploadedFile &&
                        newItem.uploadedFile &&
                        prevItem.uploadedFile.url === newItem.uploadedFile.url,
                ),
        ),
    );
};

export const getPendingPreviewFileItems = (fileItems: InternalFileItem[]) =>
    fileItems.filter(
        (file) => file.file && !file.previewUrl && (file.state === 'none' || !file.state),
    );

export const getPendingUploadFileItems = (fileItems: InternalFileItem[]) =>
    fileItems.filter((file) => file.file && !file.uploadedFile && file.state !== 'uploading');
