import { ReactNode } from 'react';

export interface CommunicationListProps {
    sortType?: SortType;
    items: CommunicationListItem[];
    emptyMessage: string;
    isLoading?: boolean;
    onLoadMore?: VoidFunction;
    itemRenderer: (index: number, id: CommunicationListItem['id']) => ReactNode;
}

export enum SortType {
    ALPHABETIC = 'ALPHABETIC',
    DATE = 'DATE',
}

export interface CommunicationListItem {
    id: string;
    sortKey: string;
}

export enum DisplayItemType {
    ITEM = 'ITEM',
    HEADING = 'HEADING',
    SKELETON_ITEM = 'SKELETON_ITEM',
    SKELETON_HEADING = 'SKELETON_HEADING',
}

export interface DisplayItem {
    id: string;
    type: DisplayItemType;
}
