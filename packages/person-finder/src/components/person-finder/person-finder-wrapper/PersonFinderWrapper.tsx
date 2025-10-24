import {
    DropdownBodyWrapper,
    DropdownDirection,
    Icon,
    type Tag,
    TagInput,
    type TagInputRef,
} from '@chayns-components/core';
import { useDevice } from 'chayns-api';
import React, {
    type ChangeEvent,
    forwardRef,
    type ReactElement,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';
import {
    PersonEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    Priority,
    SiteEntry,
} from '../../../types/personFinder';
import { StyledPersonFinder, StyledPersonFinderLeftElement } from './PersonFinderWrapper.styles';
import PersonFinderBody from './person-finder-body/PersonFinderBody';
import { usePersonFinder } from '../../PersonFinderProvider';

export type PersonFinderRef = {
    clear: () => void;
};

export type PersonFinderWrapperProps = {
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
     * Determines the priority level for displaying friends in search results.
     */
    friendsPriority?: Priority;
    /**
     * Whether the dropdown should be hidden after adding an entry. By default, it is not hidden.
     */
    shouldHideResultsOnAdd?: boolean;
};

const PersonFinderWrapper = forwardRef<PersonFinderRef, PersonFinderWrapperProps>(
    (
        {
            container,
            dropdownDirection,
            filterTypes,
            leftElement: leftElementProp,
            maxEntries = Infinity,
            onAdd,
            onDropdownHide,
            onDropdownShow,
            friendsPriority,
            onRemove,
            placeholder,
            shouldAllowMultiple,
            shouldHideResultsOnAdd,
        },
        ref,
    ) => {
        const { data, updateSearch, setTags, tags, search } = usePersonFinder();

        const [isFocused, setIsFocused] = useState(false);
        const [shouldShowBody, setShouldShowBody] = useState(false);

        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const keyRef = useRef(`person-finder-${uuidV4()}`);
        const tagInputRef = useRef<TagInputRef>(null);

        const { isTouch } = useDevice();

        const leftElement = leftElementProp ?? (
            <StyledPersonFinderLeftElement>
                <Icon icons={['fa fa-search']} />
            </StyledPersonFinderLeftElement>
        );

        const handleTagInputBlur = useCallback(() => {
            setIsFocused(false);
        }, []);

        const handleTagInputFocus = useCallback(() => {
            setIsFocused(true);
        }, []);

        const handleRemove = useCallback(
            (id: string) => {
                if (typeof setTags !== 'function') {
                    return;
                }

                setTags((prevState) => prevState.filter((entry) => entry.id !== id));

                if (typeof onRemove === 'function') {
                    onRemove(id);
                }
            },
            [onRemove, setTags],
        );

        const handleClose = useCallback(() => {
            setShouldShowBody(false);
        }, []);

        const handleOpen = useCallback(() => {
            setShouldShowBody(true);
        }, []);

        const handleClear = useCallback(() => {
            if (typeof setTags !== 'function') {
                return;
            }

            tagInputRef.current?.resetValue();

            setTags([]);
        }, [setTags]);

        const handleDropdownOutsideClick = useCallback(() => {
            tagInputRef.current?.blur();

            return isFocused && isTouch;
        }, [isFocused, isTouch]);

        const handleAdd = useCallback(
            (id: string) => {
                if (typeof setTags !== 'function') {
                    return;
                }

                const selectedEntry = Object.values(data ?? {})
                    .flat()
                    .map(({ entries }) => entries)
                    .flat()
                    .find(
                        (entry) =>
                            (typeof entry.id === 'string' ? entry.id : entry.id.toString()) === id,
                    );

                if (!selectedEntry) {
                    return;
                }

                const { name, firstName, lastName } = selectedEntry as PersonEntry & SiteEntry;

                const tag: Tag = {
                    id,
                    text: name ?? `${(firstName as string) ?? ''} ${(lastName as string) ?? ''}`,
                };

                setTags((prevState) => {
                    if (prevState.some((t) => t.id === id) || prevState.length >= maxEntries) {
                        return prevState;
                    }

                    tagInputRef.current?.resetValue();

                    if (typeof onAdd === 'function') {
                        onAdd(selectedEntry);
                    }

                    if (shouldHideResultsOnAdd) {
                        setShouldShowBody(false);
                    }

                    return [...prevState, tag];
                });
            },
            [data, maxEntries, onAdd, setTags, shouldHideResultsOnAdd],
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                if (typeof updateSearch === 'function') {
                    updateSearch(event.target.value);
                }
            },
            [updateSearch],
        );

        useImperativeHandle(
            ref,
            () => ({
                clear: () => handleClear(),
            }),
            [handleClear],
        );

        useEffect(() => {
            if (shouldShowBody) {
                if (typeof onDropdownShow === 'function') {
                    onDropdownShow();
                }
            } else if (typeof onDropdownHide === 'function') {
                onDropdownHide();
            }
        }, [onDropdownHide, onDropdownShow, shouldShowBody]);

        const showBody = useMemo(() => {
            if (
                filterTypes?.length === 1 &&
                (filterTypes.includes(PersonFinderFilterTypes.SITE) ||
                    (filterTypes.includes(PersonFinderFilterTypes.PERSON) &&
                        friendsPriority !== Priority.HIGH))
            ) {
                return shouldShowBody && !!search && search?.length > 2;
            }

            return shouldShowBody;
        }, [filterTypes, friendsPriority, search, shouldShowBody]);

        return (
            <StyledPersonFinder ref={boxRef} onFocus={handleOpen} key={keyRef.current}>
                <TagInput
                    leftElement={leftElement}
                    onBlur={handleTagInputBlur}
                    onChange={handleChange}
                    onFocus={handleTagInputFocus}
                    onRemove={handleRemove}
                    placeholder={placeholder}
                    ref={tagInputRef}
                    shouldAllowMultiple={shouldAllowMultiple}
                    shouldPreventEnter
                    tags={tags}
                />
                {boxRef.current && (
                    <DropdownBodyWrapper
                        anchorElement={boxRef.current}
                        container={container}
                        direction={dropdownDirection}
                        onClose={handleClose}
                        onOutsideClick={handleDropdownOutsideClick}
                        shouldShowDropdown={showBody}
                    >
                        <PersonFinderBody
                            filterTypes={filterTypes}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                            ref={contentRef}
                        />
                    </DropdownBodyWrapper>
                )}
            </StyledPersonFinder>
        );
    },
);

PersonFinderWrapper.displayName = 'PersonFinderWrapper';

export default PersonFinderWrapper;
