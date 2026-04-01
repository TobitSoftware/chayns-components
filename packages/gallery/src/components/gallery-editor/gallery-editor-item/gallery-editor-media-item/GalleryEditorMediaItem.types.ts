import type { InternalFileItem } from '@chayns-components/core';

/**
 * Props for a rendered uploaded media item.
 */
export interface GalleryEditorMediaItemProps {
    /**
     * Provides the uploaded media item that should be rendered.
     * @description
     * This item is expected to contain an `uploadedFile` because pending uploads are rendered by the preview component instead.
     * @example
     * <GalleryEditorMediaItem fileItem={fileItem} onClick={handleOpen} ratio={1} />
     */
    fileItem: InternalFileItem;
    /**
     * Is called when the media tile is selected.
     * @description
     * The editor uses this callback to open the uploaded media in the slideshow flow.
     * @example
     * <GalleryEditorMediaItem fileItem={fileItem} openSelectedFile={handleOpen} ratio={1} />
     */
    openSelectedFile: (file: InternalFileItem) => void;
    /**
     * Defines the aspect ratio that should be reserved for the media.
     * @description
     * The media tile keeps this ratio reserved so the editor grid remains visually stable.
     * @example
     * <GalleryEditorMediaItem fileItem={fileItem} openSelectedFile={handleOpen} ratio={1.5} />
     */
    ratio: number;
}
