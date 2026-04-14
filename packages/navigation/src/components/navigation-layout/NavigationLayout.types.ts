import { ReactNode } from 'react';

export type NavigationLayoutItemReorderPlacement = 'before' | 'after' | 'inside';

/**
 * Describes a location inside the item tree of a single navigation group.
 */
export interface NavigationLayoutItemLocation {
    /**
     * Ordered parent chain from root level to the direct parent.
     */
    parentIds: NavigationLayoutItem['id'][];
    /**
     * Zero-based index within the resolved level.
     */
    index: number;
}

/**
 * Describes the dragged item and its original position.
 */
export interface NavigationLayoutItemReorderSource extends NavigationLayoutItemLocation {
    itemId: NavigationLayoutItem['id'];
}

/**
 * Describes the resolved drop target inside the current group.
 */
export interface NavigationLayoutItemReorderTarget extends NavigationLayoutItemLocation {
    itemId?: NavigationLayoutItem['id'];
    placement: NavigationLayoutItemReorderPlacement;
}

/**
 * Payload emitted after a valid reorder interaction within a single group.
 */
export interface NavigationLayoutItemReorderEvent {
    groupId: NavigationLayoutGroup['id'];
    itemId: NavigationLayoutItem['id'];
    source: NavigationLayoutItemReorderSource;
    target: NavigationLayoutItemReorderTarget;
}

/**
 * Public props for the navigation layout shell.
 */
export interface NavigationLayoutProps {
    /**
     * Main content rendered next to the navigation sidebar.
     */
    children: ReactNode;
    /**
     * Visual configuration for header, sidebar and background.
     */
    config?: NavigationLayoutConfig;
    /**
     * Grouped navigation data rendered in the sidebar.
     */
    groups: NavigationLayoutGroup[];
    /**
     * Optional content rendered above the navigation items.
     */
    sidebarTopContent?: ReactNode;
    /**
     * Optional content rendered below the navigation items.
     */
    sidebarBottomContent?: ReactNode;
    /**
     * Currently selected item id.
     */
    selectedItemId?: NavigationLayoutItem['id'];
    /**
     * Called when a navigation item is clicked.
     */
    onItemClick?: (
        id: NavigationLayoutItem['id'],
        parentIds?: NavigationLayoutItem['id'][],
    ) => void;
    /**
     * Called after a successful reorder inside a single group.
     */
    onItemReorder?: (event: NavigationLayoutItemReorderEvent) => void;
    /**
     * Content rendered inside the fixed header.
     */
    headerContent: ReactNode;
    /**
     * Called when the sidebar snaps open.
     */
    onSidebarOpen?: VoidFunction;
    /**
     * Called when the sidebar snaps closed.
     */
    onSidebarClose?: VoidFunction;
    /**
     * Shows labels in collapsed mode via tooltip-like popups.
     */
    shouldShowCollapsedLabel?: boolean;
    /**
     * Enables the mobile layout variant.
     */
    isMobile?: boolean;
}

export interface SafeAreas {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

export interface NavigationLayoutConfig {
    headerHeight?: number;
    backgroundColor?: string;
    backgroundImage?: string;
    color?: string;
    sidebarMinWidth?: number;
    sidebarMaxWidth?: number;
    safeAreas?: SafeAreas;
}

export interface NavigationLayoutItem {
    id: string;
    label: string;
    icons?: string[];
    imageUrl?: string;
    imageElement?: ReactNode;
    isDisabled?: boolean;
    disabledReason?: string;
    children?: NavigationLayoutItem[];
}

export interface NavigationLayoutGroup {
    id: string;
    isReorderable?: boolean;
    isPinned?: boolean;
    items: NavigationLayoutItem[];
}
