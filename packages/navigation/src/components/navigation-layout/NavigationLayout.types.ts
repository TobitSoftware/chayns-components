import { ReactNode } from 'react';

export interface NavigationLayoutProps {
    children: ReactNode;
    config?: NavigationLayoutConfig;
    groups: NavigationLayoutGroup[];
    sidebarTopContent?: ReactNode;
    selectedItemId?: NavigationLayoutItem['id'];
    onItemClick?: (
        id: NavigationLayoutItem['id'],
        parentIds?: NavigationLayoutItem['id'][],
    ) => void;
}

export interface NavigationLayoutConfig {
    headerHeight?: number;
    backgroundColor?: string;
    backgroundImage?: string;
    color?: string;
    sidebarMinWidth?: number;
    sidebarMaxWidth?: number;
}

export interface NavigationLayoutItem {
    id: string;
    label: string;
    icons?: string[];
    imageUrl?: string;
    isDisabled?: boolean;
    children?: NavigationLayoutItem[];
}

export interface NavigationLayoutGroup {
    id: string;
    isReorderable?: boolean;
    isPinned?: boolean;
    items: NavigationLayoutItem[];
}
