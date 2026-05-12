import { FilterButtonsProps } from '../components/filter-buttons/FilterButtons';
import { CheckboxProps } from '../components/checkbox/Checkbox';
import { ComboBoxProps } from '../components/combobox/ComboBox.types';

/**
 * Search configuration for the `Filter` component.
 */
export interface SearchConfig {
    /**
     * Callback invoked whenever the search input changes.
     */
    onSearchChange: (search: string) => void;
    /**
     * Current search value.
     */
    searchValue: string;
}

/**
 * Item configuration used by the sort dropdown.
 */
export interface SortItem {
    /**
     * Display text of the item.
     */
    text: string;
    /**
     * Stable value or identifier of the item.
     */
    id: string | number;
}

/**
 * Sort configuration for the `Filter` component.
 */
export interface SortConfig {
    /**
     * Callback invoked when a sort item is selected.
     */
    onSortChange: (item: SortItem) => void;
    /**
     * Currently selected sort item.
     */
    selectedItem: SortItem;
    /**
     * Available sort items.
     */
    items: SortItem[];
}

/**
 * Checkbox configuration for the `Filter` component.
 */
export type CheckboxConfig = CheckboxProps;

/**
 * Filter button group configuration for the `Filter` component.
 */
export type FilterButtonConfig = FilterButtonsProps;

/**
 * Combobox configuration used by `FilterContent`.
 */
export type ComboboxConfig = ComboBoxProps & { label: string };

/**
 * Ref interface for the `Filter` component.
 */
export type FilterRef = {
    /**
     * Hides the filter popup.
     */
    hide: VoidFunction;
    /**
     * Shows the filter popup.
     */
    show: VoidFunction;
};

/**
 * Different layout modes supported by the `Filter` component.
 */
export enum FilterType {
    ONLY_SEARCH,
    ONLY_FILTER,
    ONLY_SORT,
    ONLY_CHECKBOX,
    ONLY_COMBOBOX,
    MULTIPLE,
}
