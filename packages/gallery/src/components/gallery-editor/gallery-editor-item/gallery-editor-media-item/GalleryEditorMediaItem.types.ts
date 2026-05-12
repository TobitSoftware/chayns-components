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
     * Controls whether the media renderer may load the final uploaded source immediately.
     * @description
     * When disabled, the shared media renderer keeps showing the preview until the parent gallery allows the final load.
     * @default true
     * @optional
     */
    shouldLoadImages?: boolean;
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
    /**
     * Provides an optional preview source that can be shown before the final uploaded media loads.
     * @description
     * This is typically the local base64 preview generated while the file is still being uploaded.
     * @optional
     */
    previewUrl?: string;
}
