import type { MouseEvent, ReactNode } from 'react';

/**
 * Enum representing the possible alignments for the context menu.
 */
export enum ContextMenuAlignment {
    TopLeft,
    BottomLeft,
    TopRight,
    BottomRight,
    TopCenter,
    BottomCenter,
}

/**
 * Type representing the coordinates for positioning the context menu.
 */
export type ContextMenuCoordinates = {
    /** The x-coordinate. */
    x: number;
    /** The y-coordinate. */
    y: number;
};

/**
 * Type representing an item in the context menu.
 */
export type ContextMenuItem = {
    /** Optional icons for the item. Can be strings or React nodes. */
    icons?: string[] | ReactNode;
    /** Whether the item is selected. */
    isSelected?: boolean;
    /** Unique key for the item. */
    key: string;
    /** Function called when the item is clicked. */
    onClick: (event?: MouseEvent<HTMLDivElement>) => Promise<void> | void;
    /** Whether to show a spacer after the item. */
    shouldShowSpacer?: boolean;
    /** The text displayed for the item. */
    text: string;
};

/**
 * Props for the ContextMenu component.
 */
export type ContextMenuProps = {
    /**
     * Context menu alignment
     * @description Optional custom alignment used instead of calculating it using the alignment
     * within the page. The available alignments can be taken from the ContextMenuAlignment enum.
     * @example alignment={ContextMenuAlignment.TopLeft}
     * @optional
     */
    alignment?: ContextMenuAlignment;
    /**
     * Children element
     * @description The element over which the content of the ContextMenu should be displayed.
     * @example children={<Icon icons={['fa fa-paper-clip']} />
     * @default <Icon icons={['ts-ellipsis_v']} size={18} />
     * @optional
     */
    children?: ReactNode;
    /**
     * Container element
     * @description The element where the content of the ContextMenu should be rendered via React Portal.
     * @example container={document.body}
     * @optional
     */
    container?: Element;
    /**
     * Custom coordinates
     * @description Optional own coordinates to be used instead of calculating the alignment based
     * on the alignment of the children.
     * @example coordinates={{ x: 100, y: 200 }}
     * @optional
     */
    coordinates?: ContextMenuCoordinates;
    /**
     * Context menu headline
     * @description The headline of the context menu. If not provided, no headline will be displayed.
     * @example headline="Options"
     * @optional
     */
    headline?: string;
    /**
     * Menu items
     * @description The items that will be displayed in the content of the ContextMenu. Custom icon
     * elements only will be displayed on desktop devices.
     * @example items={[{ key: '1', text: 'Option 1', onClick: () => {} }]}
     */
    items: ContextMenuItem[];
    /**
     * Hide callback function
     * @description Function to be executed when the content of the Context menu has been hidden.
     * @example onHide={() => console.log('Menu hidden')}
     * @optional
     */
    onHide?: VoidFunction;
    /**
     * Show callback function
     * @description Function to be executed when the content of the Context menu has been shown.
     * @example onShow={() => console.log('Menu shown')}
     * @optional
     */
    onShow?: VoidFunction;
    /**
     * Close on popup click flag
     * @description Whether the popup should be closed if it is clicked.
     * @default true
     * @optional
     */
    shouldCloseOnPopupClick?: boolean;
    /**
     * Disable click flag
     * @description Whether the click should be disabled.
     * @default false
     * @optional
     */
    shouldDisableClick?: boolean;
    /**
     * Hide popup arrow flag
     * @description Whether the arrow of the popup should be hidden.
     * @default false
     * @optional
     */
    shouldHidePopupArrow?: boolean;
    /**
     * Show hover effect flag
     * @description Whether the hover effect should be shown.
     * @default false
     * @optional
     */
    shouldShowHoverEffect?: boolean;
    /**
     * Z-index value
     * @description The z-index of the popup.
     * @example zIndex={100}
     * @default 20
     * @optional
     */
    zIndex?: number;
};

/**
 * Ref interface for the ContextMenu component.
 */
export interface ContextMenuRef {
    /** Hides the context menu. */
    hide: VoidFunction;
    /** Shows the context menu. */
    show: VoidFunction;
}
