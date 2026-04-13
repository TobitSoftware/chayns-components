import { ReactNode } from 'react';

export type NavigationLayoutItemReorderPlacement = 'before' | 'after' | 'inside';

export interface NavigationLayoutItemLocation {
    parentIds: NavigationLayoutItem['id'][];
    index: number;
}

export interface NavigationLayoutItemReorderSource extends NavigationLayoutItemLocation {
    itemId: NavigationLayoutItem['id'];
}

export interface NavigationLayoutItemReorderTarget extends NavigationLayoutItemLocation {
    itemId?: NavigationLayoutItem['id'];
    placement: NavigationLayoutItemReorderPlacement;
}

export interface NavigationLayoutItemReorderEvent {
    groupId: NavigationLayoutGroup['id'];
    itemId: NavigationLayoutItem['id'];
    source: NavigationLayoutItemReorderSource;
    target: NavigationLayoutItemReorderTarget;
}

export interface NavigationLayoutProps {
    children: ReactNode;
    config?: NavigationLayoutConfig;
    groups: NavigationLayoutGroup[];
    sidebarTopContent?: ReactNode;
    sidebarBottomContent?: ReactNode;
    selectedItemId?: NavigationLayoutItem['id'];
    onItemClick?: (
        id: NavigationLayoutItem['id'],
        parentIds?: NavigationLayoutItem['id'][],
    ) => void;
    onItemReorder?: (event: NavigationLayoutItemReorderEvent) => void;
    headerContent: ReactNode;
    onSidebarOpen?: VoidFunction;
    onSidebarClose?: VoidFunction;
    shouldShowCollapsedLabel?: boolean;
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
