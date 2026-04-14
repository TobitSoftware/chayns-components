import { NavigationLayoutProps } from '../NavigationLayout.types';

/**
 * Internal props used to render the navigation sidebar.
 */
export interface NavigationSidebarProps {
    /**
     * Color used for icons, text highlights and separators.
     */
    color: string;
    /**
     * Optional content rendered above the item groups.
     */
    topContent: NavigationLayoutProps['sidebarTopContent'];
    /**
     * Optional content rendered below the item groups.
     */
    bottomContent: NavigationLayoutProps['sidebarBottomContent'];
    /**
     * Collapsed sidebar width.
     */
    minWidth: number;
    /**
     * Expanded sidebar width.
     */
    maxWidth: number;
    /**
     * Grouped navigation items shown in the sidebar.
     */
    groups: NavigationLayoutProps['groups'];
    /**
     * Currently selected item id.
     */
    selectedItemId?: NavigationLayoutProps['selectedItemId'];
    /**
     * Called when an item is clicked.
     */
    onItemClick?: NavigationLayoutProps['onItemClick'];
    /**
     * Called when the sidebar snaps open.
     */
    onSidebarOpen?: NavigationLayoutProps['onSidebarOpen'];
    /**
     * Called when the sidebar snaps closed.
     */
    onSidebarClose?: NavigationLayoutProps['onSidebarClose'];
    /**
     * Enables collapsed labels for top-level items.
     */
    shouldShowCollapsedLabel?: NavigationLayoutProps['shouldShowCollapsedLabel'];
    /**
     * Enables the mobile layout behaviour.
     */
    isMobile?: NavigationLayoutProps['isMobile'];
}
