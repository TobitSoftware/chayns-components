import type { InternalFileItem } from '@chayns-components/core';

/**
 * Props for a preview tile while a file is uploading.
 */
export interface GalleryEditorPreviewItemProps {
    /**
     * Provides the internal file item that contains the preview URL.
     * @description
     * This item is expected to describe a local upload that already has a generated preview image.
     * @example
     * <GalleryEditorPreviewItem fileItem={fileItem} ratio={1} />
     */
    fileItem: InternalFileItem;
    /**
     * Defines the aspect ratio that should be reserved for the preview.
     * @description
     * The preview keeps this ratio reserved while the upload is still in progress.
     * @example
     * <GalleryEditorPreviewItem fileItem={fileItem} ratio={1.5} />
     */
    ratio: number;
}
