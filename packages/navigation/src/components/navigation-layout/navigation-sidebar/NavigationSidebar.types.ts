import { NavigationLayoutProps } from '../NavigationLayout.types';

export interface NavigationSidebarProps {
    color: string;
    topContent: NavigationLayoutProps['sidebarTopContent'];
    minWidth: number;
    maxWidth: number;
    groups: NavigationLayoutProps['groups'];
    selectedItemId: NavigationLayoutProps['selectedItemId'];
    onItemClick?: NavigationLayoutProps['onItemClick'];
}
