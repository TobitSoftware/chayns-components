import { FilterButtonsProps } from '../components/filter-buttons/FilterButtons';

export interface SearchConfig {
    onSearchChange: (search: string) => void;
    searchValue: string;
}

export interface SortItem {
    text: string;
    id: string | number;
}

export interface SortConfig {
    onSortChange: (item: SortItem) => void;
    selectedItem: SortItem;
    items: SortItem[];
}

export type FilterButtonConfig = FilterButtonsProps;
