import type { FileItem } from '@chayns-components/core';

/**
 * Props for the low-level uploaded media renderer shared by viewer and editor.
 */
export interface MediaContentProps {
    /**
     * Provides the uploaded media item that should be rendered.
     * @description
     * This low-level renderer accepts already known image or video data and does not handle upload-specific state.
     * @example
     * <MediaContent file={file.file} onClick={handleOpen} ratio={1} />
     */
    file: FileItem['file'];
    /**
     * Defines the aspect ratio that should be reserved for the media.
     * @description
     * The surrounding tile uses this value to reserve a deterministic media height before the asset finishes loading.
     * @example
     * <MediaContent file={file.file} onClick={handleOpen} ratio={1.5} />
     */
    ratio: number;
    /**
     * Is called when the media tile is selected.
     * @description
     * Use this callback to react to clicks on the rendered image or video tile.
     * @example
     * <MediaContent file={file.file} onClick={() => console.log('open')} ratio={1} />
     */
    onClick: () => void;
    /**
     * Defines the size of the video play icon.
     * @description
     * This prop only affects rendered videos. Image tiles ignore it.
     * @default 50
     * @example
     * <MediaContent file={file.file} onClick={handleOpen} playIconSize={30} ratio={1} />
     * @optional
     */
    playIconSize?: number;
}
