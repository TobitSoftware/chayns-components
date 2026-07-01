import { ReactNode } from 'react';

export interface CommunicationListProps {
    /**
     * Determines how the items are grouped and sorted.
     * @description
     * Controls the sorting strategy applied before the list is rendered.
     * Depending on the selected value, the component also inserts matching section headings.
     * @optional
     * @default SortType.DATE
     */
    sortType?: SortType;
    /**
     * Raw list data that is transformed into concrete UI items by the renderer.
     * @description
     * Contains the minimal item metadata required for sorting and rendering.
     * The actual visual representation is delegated to `itemRenderer`.
     */
    items: CommunicationListItem[];
    /**
     * Message shown when the list is empty.
     * @description
     * Defines the fallback text rendered when no items are available and loading is disabled.
     * Use a clear message that helps users understand the empty state.
     */
    emptyMessage: string;
    /**
     * Enables skeleton items and optional loading behavior at the end of the list.
     * @description
     * Use this while data is being loaded or additional items are requested.
     * When enabled, the component renders placeholder rows to communicate loading progress.
     * @optional
     * @default false
     */
    isLoading?: boolean;
    /**
     * Called when the end of the virtualized list is reached.
     * @description
     * Use this callback to implement infinite loading or pagination.
     * It is triggered when the user scrolls close enough to the end of the rendered data.
     * @optional
     */
    onLoadMore?: VoidFunction;
    /**
     * Renders a list item based on its ID.
     * @description
     * Receives the current display index and the item ID that should be rendered.
     * Return the React node representing the actual row content.
     */
    itemRenderer: (index: number, id: CommunicationListItem['id']) => ReactNode;
}

export enum SortType {
    ALPHABETIC = 'ALPHABETIC',
    DATE = 'DATE',
}

export interface CommunicationListItem {
    /**
     * Unique identifier of the item passed to the renderer.
     * @description
     * Used to map display entries back to their actual content.
     * The value should stay stable across renders.
     */
    id: string;
    /**
     * Sorting or grouping key, for example a name or ISO date.
     * @description
     * The meaning of this value depends on the selected `sortType`.
     * For date sorting, provide a parseable timestamp; for alphabetic sorting, provide a label-like value.
     */
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
