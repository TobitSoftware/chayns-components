import { ReactNode } from 'react';

export interface CommunicationContentProps {
    /**
     * Primary area, for example a communication list or main view.
     * @description
     * Represents the main content area that remains visible while the detail panel is opened.
     * This is typically the master view in a master-detail layout.
     */
    children: ReactNode;
    /**
     * Detail content that is shown either as a side panel or as an overlay.
     * @description
     * Contains the secondary content associated with the current selection.
     * The component decides whether to render it inline or as an overlay based on the available width.
     */
    content: ReactNode;
    /**
     * Determines whether the detail content should be visible.
     * @description
     * Controls whether the side or overlay content is rendered at all.
     * This is useful for toggling the detail pane based on the current selection state.
     * @optional
     * @default false
     */
    shouldShowContent?: boolean;
    /**
     * Width in pixels below which the detail content is displayed as an overlay.
     * @description
     * Defines the responsive breakpoint between side-panel and overlay behavior.
     * Smaller container widths switch the component into overlay mode.
     * @optional
     * @default 700
     */
    breakPoint?: number;
    /**
     * Configuration for the desktop side panel.
     * @description
     * Allows customizing the resizable side content area used in non-overlay mode.
     * Use this to control the initial, minimum, and maximum width.
     * @optional
     */
    sideContentConfig?: SideContentConfig;
    /**
     * Configuration for the mobile overlay.
     * @description
     * Adjusts sizing constraints for the overlay presentation used on smaller widths.
     * This helps fine-tune the drag and snap behavior of the detail pane.
     * @optional
     */
    overlayContentConfig?: OverlayContentConfig;
    /**
     * Callback fired after finishing a resize drag on the side panel.
     * @description
     * Receives the final width of the desktop side content after dragging ends.
     * Use this to persist layout preferences or update surrounding UI state.
     * @optional
     */
    onDragEnd?: (width: number) => void;
}

export interface SideContentConfig {
    /**
     * Initial width of the side panel in pixels.
     * @description
     * Sets the starting width used when the side content is first rendered.
     * This value is only relevant in non-overlay mode.
     * @optional
     * @default 360
     */
    initialWidth?: number;
    /**
     * Minimum width of the side panel in pixels.
     * @description
     * Prevents the resizable side content from becoming too narrow.
     * This helps preserve usability while dragging.
     * @optional
     * @default 280
     */
    minWidth?: number;
    /**
     * Maximum width of the side panel in pixels.
     * @description
     * Restricts how wide the desktop detail pane can grow during resizing.
     * Use this to preserve space for the main content area.
     * @optional
     * @default 520
     */
    maxWidth?: number;
}

export interface OverlayContentConfig {
    /**
     * Minimum height of the overlay in pixels.
     * @description
     * Defines the collapsed or lowest allowed overlay height.
     * This value also acts as the initial overlay height.
     * @optional
     * @default 26
     */
    minHeight?: number;
    /**
     * Offset from the top edge that remains free when the overlay is fully expanded.
     * @description
     * Reserves vertical space above the overlay at its maximum height.
     * Use this to keep important UI elements visible while the overlay is open.
     * @optional
     * @default 0
     */
    topOffset?: number;
}
