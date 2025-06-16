import React, {
    type ChangeEvent,
    forwardRef,
    type ReactElement,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { DropdownBodyWrapper, Icon, TagInput } from '@chayns-components/core';
import { v4 as uuidV4 } from 'uuid';
import {
    PersonEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    SiteEntry,
} from '../../../types/personFinder';
import { StyledPersonFinder, StyledPersonFinderLeftElement } from './PersonFinderWrapper.styles';
import PersonFinderBody from './person-finder-body/PersonFinderBody';
import { usePersonFinder } from '../../PersonFinderProvider';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';
import { TagInputRef } from '@chayns-components/core/lib/types/components/tag-input/TagInput';

export type PersonFinderRef = {
    clear: () => void;
};

export type PersonFinderWrapperProps = {
    /**
     * The element where the content of the `PersonFinder` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The filter options of the component.
     */
    filterTypes?: PersonFinderFilterTypes[];
    /**
     * An element that should be displayed on the left side of the input.
     */
    leftElement?: ReactElement;
    /**
     * The maximum amount of entries that can be selected.
     */
    maxEntries?: number;
    /**
     * Function to be executed if a person or site is added.
     */
    onAdd?: (entry: PersonFinderEntry) => void;
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
};

const PersonFinderWrapper = forwardRef<PersonFinderRef, PersonFinderWrapperProps>(
    (
        {
            shouldAllowMultiple,
            placeholder,
            filterTypes,
            container,
            onAdd,
            onRemove,
            maxEntries = Infinity,
            leftElement: leftElementProp,
        },
        ref,
    ) => {
        const { data, updateSearch, setTags, tags } = usePersonFinder();

        const [shouldShowBody, setShouldShowBody] = useState(false);

        const tagInputRef = useRef<TagInputRef>(null);
        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const uuid = useMemo(() => uuidV4(), []);

        const leftElement = leftElementProp ?? (
            <StyledPersonFinderLeftElement>
                <Icon icons={['fa fa-search']} />
            </StyledPersonFinderLeftElement>
        );

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

        const handleAdd = useCallback(
            (id: string) => {
                if (typeof setTags !== 'function') {
                    return;
                }

                const selectedEntry = Object.values(data ?? {})
                    .flat()
                    .map(({ entries }) => entries)
                    .flat()
                    .find((entry) => entry.id === id);

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

                    return [...prevState, tag];
                });
            },
            [data, maxEntries, onAdd, setTags],
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

        return (
            <StyledPersonFinder ref={boxRef} onFocus={handleOpen} key={`person-finder-${uuid}`}>
                <TagInput
                    ref={tagInputRef}
                    placeholder={placeholder}
                    leftElement={leftElement}
                    shouldAllowMultiple={shouldAllowMultiple}
                    shouldPreventEnter
                    onRemove={handleRemove}
                    onChange={handleChange}
                    tags={tags}
                />
                {boxRef.current && (
                    <DropdownBodyWrapper
                        anchorElement={boxRef.current}
                        shouldShowDropdown={shouldShowBody}
                        container={container}
                        onClose={handleClose}
                    >
                        <PersonFinderBody
                            ref={contentRef}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                            filterTypes={filterTypes}
                        />
                    </DropdownBodyWrapper>
                )}
            </StyledPersonFinder>
        );
    },
);

PersonFinderWrapper.displayName = 'PersonFinderWrapper';

export default PersonFinderWrapper;
