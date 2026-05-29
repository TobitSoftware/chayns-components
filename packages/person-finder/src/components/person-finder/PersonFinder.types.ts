import { PropsWithChildren, ReactElement } from 'react';
import { DropdownDirection, FinderContext, FinderFilter } from '@chayns-components/core';

export interface PersonFinderProps {
    /**
     * The element where the content of the `PersonFinder` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The direction in which the dropdown should be displayed. By default, it is displayed below the input.
     */
    dropdownDirection?: DropdownDirection;
    /**
     * The filter options of the component.
     */
    filterTypes?: PersonFinderFilterTypes[];
    /**
     * Determines the priority level for displaying friends in search results.
     */
    friendsPriority?: Priority;
    /**
     * An element that should be displayed on the left side of the input.
     */
    leftElement?: ReactElement;
    /**
     * The maximum number of entries that can be selected.
     */
    maxEntries?: number;
    /**
     * Function to be executed if a person or site is added.
     */
    onAdd?: (entry: PersonFinderEntry) => void;
    /**
     * Function to be executed if the dropdown is hidden.
     */
    onDropdownHide?: () => void;
    /**
     * Function to be executed if the dropdown is shown.
     */
    onDropdownShow?: () => void;
    /**
     * Function to be executed if a person or site is removed.
     */
    onRemove?: (id: PersonFinderEntry['id']) => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * Whether multiple persons and sites should be selected.
     */
    shouldAllowMultiple?: boolean;
    /**
     * Whether the dropdown should be hidden after adding an entry. By default, it is not hidden.
     */
    shouldHideResultsOnAdd?: boolean;
    /**
     * Whether the `PersonFinder` should be rendered inline without a dropdown.
     * @description
     * If set to `true`, the `PersonFinder` will display the results below the input field, without
     * using a dropdown. This is useful for scenarios where the `PersonFinder` is part of a larger
     * form and should always be visible.
     * @default false
     * @example
     * <PersonFinder shouldRenderInline />
     * @optional
     */
    shouldRenderInline?: boolean;
    /**
     * Whether the remove action should be disabled.
     */
    shouldDisableRemove?: boolean;
    /**
     * Determines whether persons are searched and sorted from the user's perspective or from a site's perspective.
     */
    relationMode?: RelationMode;
    /**
     * Sites and persons that are selected by default.
     */
    defaultEntries?: DefaultEntry[];
    /**
     * Entry ids to exclude from the results
     */
    excludedEntryIds?: PersonFinderEntry['id'][];
    /**
     * Whether the own user should be shown in the results. By default, it is not shown.
     */
    shouldShowOwnUser?: boolean;
    /**
     * Optional filter to search member of uac group. Only works with groups of the current Site and if the user is manager.
     */
    uacFilter?: UACFilter[];
    /**
     * A list of entries that should be searched.
     */
    entries?: PersonEntry[];
}

export interface PersonFinderProviderProps extends PropsWithChildren {
    friendsPriority: Priority;
    filterTypes: PersonFinderFilterTypes[];
    defaultEntries?: DefaultEntry[];
    excludedEntryIds?: PersonFinderEntry['id'][];
    maxEntries?: number;
    onAdd?: (entry: PersonFinderEntry) => void;
    onRemove?: (id: PersonFinderEntry['id']) => void;
    shouldShowOwnUser?: boolean;
    shouldHideResultsOnAdd?: boolean;
    uacFilter?: UACFilter[];
    entries?: PersonEntry[];
    relationMode?: RelationMode;
}

export enum PersonFinderFilterTypes {
    PERSON = 'person',
    SITE = 'site',
    UAC = 'uac',
}

export enum Priority {
    HIGH,
    NORMAL,
}

export interface PersonFinderFilter extends FinderFilter {
    key: PersonFinderFilterTypes;
}

export enum RelationMode {
    PERSON = 'person',
    SITE = 'site',
}

export interface PersonFinderData {
    searchString: string;
    count: number;
    skip: number;
    entries: PersonFinderEntry[];
}

export type PersonFinderDataMap = {
    [K in PersonFinderFilterTypes]?: PersonFinderData;
};

export interface UACFilter {
    groupId: number;
}

export enum LoadingState {
    None = 'none',
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export interface PersonFinderContextValue extends FinderContext<PersonFinderEntry> {
    data: PersonFinderDataMap;
    filter: PersonFinderFilter[];
    friends?: PersonEntry[];
    addFriend?: (personId: string) => void;
    removeFriend?: (personId: string) => void;
}

export type LoadingStateMap = { [K in PersonFinderFilterTypes]?: LoadingState };

export interface DefaultEntry {
    id: string;
    name: string;
}

export type PersonFinderEntry = PersonEntry | SiteEntry | UACEntry;

export interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
    isVerified: boolean;
    type: PersonFinderFilterTypes.PERSON;
    lastOnlineTime?: Date;
}

export interface SiteEntry {
    id: string;
    url: string;
    name: string;
    type: PersonFinderFilterTypes.SITE;
}

export interface UACEntry {
    id: number;
    name: string;
    isSystemGroup: boolean;
}

export interface SiteEntryResult {
    name: string;
    siteId: string;
    locationId: number;
    lastLogin: number | null;
    score: number;
    domain: string;
}

export interface PersonEntryResult {
    personId: string;
    userId: number;
    firstName: string;
    lastName: string;
    relationCount: number;
    score: number;
    signOfLife: Date;
    verified: boolean;
}

export type ThrottledFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): ReturnType<T>;
    cancel: () => void;
    flush: () => void;
};
