import {
    NavigationLayoutGroup,
    NavigationLayoutItem,
    NavigationLayoutProps,
} from '../NavigationLayout.types';

export interface NavigationSidebarProps {
    color: string;
    topContent: NavigationLayoutProps['sidebarTopContent'];
    minWidth: number;
    maxWidth: number;
    groups: NavigationLayoutProps['groups'];
    selectedItemId: NavigationLayoutProps['selectedItemId'];
    onItemClick?: NavigationLayoutProps['onItemClick'];
}

export type NavigationSidebarGroup = NavigationLayoutGroup;

export type NavigationSidebarItem = NavigationLayoutItem;

export interface NavigationSidebarGroupDividerProps {}

export interface NavigationSidebarGroupListProps {
    groups: NavigationSidebarGroup[];
    selectedItemId: NavigationSidebarProps['selectedItemId'];
    onItemClick?: NavigationSidebarProps['onItemClick'];
}

export interface NavigationSidebarGroupProps {
    group: NavigationSidebarGroup;
    selectedItemId: NavigationSidebarProps['selectedItemId'];
    onItemClick?: NavigationSidebarProps['onItemClick'];
}

export interface NavigationSidebarItemProps {
    item: NavigationSidebarItem;
    parentIds?: NavigationSidebarItem['id'][];
    selectedItemId: NavigationSidebarProps['selectedItemId'];
    onItemClick?: NavigationSidebarProps['onItemClick'];
}
