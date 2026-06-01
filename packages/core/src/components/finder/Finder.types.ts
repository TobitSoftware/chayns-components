import { Context, PropsWithChildren, type ReactElement, ReactNode } from 'react';
import { DropdownDirection } from '../../types/dropdown';
import { Tag } from '../../types/tagInput';

export interface FinderProps<
    E extends { id: string | number },
    P extends PropsWithChildren,
> extends FinderInnerProps {
    Context: Context<FinderContext<E> | null>;
    Provider: ReactElement<P>;
}

export interface FinderContext<E extends { id: string | number }> {
    // Data
    data: { [key: FinderFilter['key']]: FinderData<E> };
    updateData: (key: FinderFilter['key'], data: FinderData<E>) => void;

    // Tags
    tags: Tag[];
    setTags: (tags: Tag[]) => void;

    // Search
    searchString: string;
    setSearchString: (searchString: string) => void;

    // Filter
    filter: FinderFilter[];
    activeFilter: FinderFilter['key'][];
    setActiveFilter: (activeFilter: FinderFilter['key'][]) => void;

    // Loading
    loadMore: (key: FinderFilter['key']) => void;
    loadingState: { [key: FinderFilter['key']]: LoadingState };

    // Render
    itemRenderer: (item: E) => ReactNode;
    resetInputSignal: number;
    closeDropdownSignal: number;
}

export interface FinderInnerProps {
    /**
     *
     */
    inputType?: InputType;
    /**
     * The element where the content of the `Finder` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The direction in which the dropdown should be displayed. By default, it is displayed below the input.
     */
    dropdownDirection?: DropdownDirection;
    /**
     * An element that should be displayed on the left side of the input.
     */
    leftElement?: ReactElement;
    /**
     * Function to be executed if the dropdown is hidden.
     */
    onDropdownHide?: () => void;
    /**
     * Function to be executed if the dropdown is shown.
     */
    onDropdownShow?: () => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * Whether multiple persons and sites should be selected.
     */
    shouldAllowMultiple?: boolean;
    /**
     * Whether the `Finder` should be rendered inline without a dropdown.
     * @description
     * If set to `true`, the `Finder` will display the results below the input field, without
     * using a dropdown. This is useful for scenarios where the `Finder` is part of a larger
     * form and should always be visible.
     * @default false
     * @example
     * <Finder shouldRenderInline />
     * @optional
     */
    shouldRenderInline?: boolean;
    /**
     * Whether the remove action should be disabled.
     */
    shouldDisableRemove?: boolean;
}

export interface FinderData<E> {
    searchString: string;
    count: number;
    skip: number;
    entries: E[];
}

export interface FinderFilter {
    key: string;
    label: string;
}

export enum LoadingState {
    None = 'none',
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export enum InputType {
    Input = 'input',
    TagInput = 'tag-input',
}

export interface FinderRef {
    focus: () => void;
    blur: () => void;
    clear: () => void;
}
