import type {
    CheckboxConfig,
    ComboboxConfig,
    FilterButtonConfig,
    SearchConfig,
    SortConfig,
} from '../../../types/filter';

/**
 * Props for the `FilterContent` component.
 */
export type FilterContentProps = {
    /**
     * Search configuration for the optional search input.
     */
    searchConfig?: SearchConfig;
    /**
     * Configuration for the optional filter button group.
     */
    filterButtonConfig?: FilterButtonConfig;
    /**
     * Configuration for the optional sort combobox.
     */
    sortConfig?: SortConfig;
    /**
     * Configuration for the optional checkbox.
     */
    checkboxConfig?: CheckboxConfig;
    /**
     * Configuration for the optional labeled combobox.
     */
    comboboxConfig?: ComboboxConfig;
    /**
     * Whether the search input should receive focus when the filter opens.
     */
    shouldAutoFocus: boolean;
};
