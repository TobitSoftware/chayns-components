import type { MouseEvent, ReactNode } from 'react';

export enum ContextMenuAlignment {
    TopLeft,
    BottomLeft,
    TopRight,
    BottomRight,
    TopCenter,
    BottomCenter,
}

export type ContextMenuCoordinates = {
    x: number;
    y: number;
};

export type ContextMenuItem = {
    icons?: string[] | ReactNode;
    key: string;
    onClick: (event?: MouseEvent<HTMLDivElement>) => Promise<void> | void;
    isSelected?: boolean;
    text: string;
    shouldShowSpacer?: boolean;
};

export type ContextMenuProps = {
    /**
     * Optional custom alignment used instead of calculating it using the
     * alignment within the page. The available alignment can be taken from the
     * ContextMenuAlignment enum.
     */
    alignment?: ContextMenuAlignment;
    /**
     * The element over which the content of the `ContextMenu` should be displayed. The default is an ellipsis icon.
     */
    children?: ReactNode;
    /**
     * The element where the content of the `ContextMenu` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * Optional own coordinates to be used instead of calculating the alignment
     * based on the alignment of the children.
     */
    coordinates?: ContextMenuCoordinates;
    /**
     * The headline of the contextmenu.
     */
    headline?: string;
    /**
     * The items that will be displayed in the content of the `ContextMenu`. Custom icon elements only works on desktop.
     */
    items: ContextMenuItem[];
    /**
     * Function to be executed when the content of the Context menu has been hidden.
     */
    onHide?: VoidFunction;
    /**
     * Function to be executed when the content of the Context menu has been shown.
     */
    onShow?: VoidFunction;
    /**
     * Whether the popup should be closed if its clicked.
     */
    shouldCloseOnPopupClick?: boolean;
    /**
     * Whether the arrow of the popup should be hidden.
     */
    shouldHidePopupArrow?: boolean;
    /**
     * Whether the hover effect should be shown.
     */
    shouldShowHoverEffect?: boolean;
    /**
     * Whether the click should be disabled.
     */
    shouldDisableClick?: boolean;
    /**
     * The z-index of the popup.
     */
    zIndex?: number;
};

export interface ContextMenuRef {
    hide: VoidFunction;
    show: VoidFunction;
}
