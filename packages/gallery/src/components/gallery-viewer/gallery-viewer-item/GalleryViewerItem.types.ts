import type { FileItem } from '@chayns-components/core';

/**
 * Props for a dedicated read-only gallery tile.
 */
export interface GalleryViewerItemProps {
    /**
     * Provides the uploaded media that should be rendered.
     * @description
     * The viewer item renders only already known media and never deals with upload-specific transient state.
     * @example
     * <GalleryViewerItem fileItem={file} onClick={handleOpen} />
     */
    fileItem: FileItem;
    /**
     * Defines the aspect ratio that should be reserved for the tile.
     * @description
     * Use this prop to reserve a deterministic tile height for stable read-only rendering.
     * @default 1
     * @example
     * <GalleryViewerItem fileItem={file} onClick={handleOpen} ratio={1.5} />
     * @optional
     */
    ratio?: number;
    /**
     * Provides the total item count when the last visible tile should show a remaining-items overlay.
     * @description
     * When this prop is set on the last visible viewer tile, the tile displays the `+n` overlay for hidden items.
     * @example
     * <GalleryViewerItem fileItem={file} onClick={handleOpen} remainingItemsLength={5} />
     * @optional
     */
    remainingItemsLength?: number;
    /**
     * Is called when the tile is selected.
     * @description
     * The viewer uses this callback to open the selected file inside the slideshow flow.
     * @example
     * <GalleryViewerItem fileItem={file} onClick={handleOpen} />
     */
    onClick: (file: FileItem) => void;
}
