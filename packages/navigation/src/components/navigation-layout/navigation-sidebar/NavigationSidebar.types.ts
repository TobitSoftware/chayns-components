import { NavigationLayoutProps } from '../NavigationLayout.types';

export interface NavigationSidebarProps {
    color: string;
    topContent: NavigationLayoutProps['sidebarTopContent'];
    bottomContent: NavigationLayoutProps['sidebarBottomContent'];
    minWidth: number;
    maxWidth: number;
    groups: NavigationLayoutProps['groups'];
    selectedItemId: NavigationLayoutProps['selectedItemId'];
    onItemClick?: NavigationLayoutProps['onItemClick'];
    onSidebarOpen?: NavigationLayoutProps['onSidebarOpen'];
    onSidebarClose?: NavigationLayoutProps['onSidebarClose'];
    shouldShowCollapsedLabel?: NavigationLayoutProps['shouldShowCollapsedLabel'];
    isMobile?: NavigationLayoutProps['isMobile'];
}
