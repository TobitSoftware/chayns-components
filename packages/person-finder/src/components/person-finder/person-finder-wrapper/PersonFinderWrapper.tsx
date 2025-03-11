import React, {
    forwardRef,
    ReactPortal,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Icon, TagInput } from '@chayns-components/core';
import {
    PersonEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    Priority,
    SiteEntry,
} from '../../../types/personFinder';
import { StyledPersonFinder, StyledPersonFinderLeftElement } from './PersonFinderWrapper.styles';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import PersonFinderBody from './person-finder-body/PersonFinderBody';
import { usePersonFinder } from '../../PersonFinderProvider';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';
import { TagInputRef } from '@chayns-components/core/lib/types/components/tag-input/TagInput';

export type PersonFinderWrapperRef = {
    clear: () => void;
};

export type PersonFinderWrapperProps = {
    /**
     * The element where the content of the `PersonFinder` should be rendered via React Portal.
     */
    container?: Element | null;
    /**
     * The filter options of the component.
     */
    filterTypes?: PersonFinderFilterTypes[];
    /**
     * Determines the priority level for displaying friends in search results.
     */
    friendsPriority?: Priority;
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

const PersonFinderWrapper = forwardRef<PersonFinderWrapperRef, PersonFinderWrapperProps>(
    (
        {
            shouldAllowMultiple,
            placeholder,
            filterTypes,
            container,
            onAdd,
            onRemove,
            friendsPriority,
            maxEntries = Infinity,
        },
        ref,
    ) => {
        const { data } = usePersonFinder();

        const [portal, setPortal] = useState<ReactPortal>();
        const [width, setWidth] = useState(0);
        const [tags, setTags] = useState<Tag[]>([]);
        const [shouldShowBody, setShouldShowBody] = useState(false);

        const tagInputRef = useRef<TagInputRef>(null);
        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const leftElement = (
            <StyledPersonFinderLeftElement>
                <Icon icons={['fa fa-search']} />
            </StyledPersonFinderLeftElement>
        );

        const handleRemove = (id: string) => {
            setTags((prevState) => prevState.filter((entry) => entry.id !== id));

            if (typeof onRemove === 'function') {
                onRemove(id);
            }
        };

        const handleClose = useCallback(() => {
            setShouldShowBody(false);
        }, []);

        const handleOpen = useCallback(() => {
            setShouldShowBody(true);
        }, []);

        const handleClear = useCallback(() => {
            tagInputRef.current?.resetValue();

            setTags([]);
        }, []);

        const handleAdd = useCallback(
            (id: string) => {
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
                    text: name ?? `${firstName ?? ''} ${lastName ?? ''}`,
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
            [data, maxEntries, onAdd],
        );

        /**
         * This function closes the body
         */
        const handleOutsideClick = useCallback(
            (event: MouseEvent) => {
                if (
                    boxRef.current &&
                    !boxRef.current.contains(event.target as Node) &&
                    contentRef.current &&
                    !contentRef.current.contains(event.target as Node)
                ) {
                    handleClose();
                }
            },
            [handleClose],
        );

        /**
         * This hook calculates the width
         */
        useEffect(() => {
            const input = document.getElementById('person_finder_input');

            const getInputWidth = () => {
                if (input) {
                    setWidth(input.offsetWidth);
                }
            };

            if (input) {
                new ResizeObserver(getInputWidth).observe(input);
            }
        }, []);

        /**
         * This hook listens for clicks
         */
        useEffect(() => {
            document.addEventListener('click', handleOutsideClick);
            window.addEventListener('blur', () => handleClose());

            return () => {
                document.removeEventListener('click', handleOutsideClick);
                window.addEventListener('blur', () => handleClose());
            };
        }, [handleOutsideClick, handleClose]);

        useImperativeHandle(
            ref,
            () => ({
                clear: () => handleClear,
            }),
            [handleClear],
        );

        useEffect(() => {
            if (!container) {
                return;
            }

            setPortal(() =>
                createPortal(
                    <AnimatePresence initial={false}>
                        {shouldShowBody && (
                            <PersonFinderBody
                                width={width}
                                ref={contentRef}
                                onAdd={handleAdd}
                                filterTypes={filterTypes}
                            />
                        )}
                    </AnimatePresence>,
                    container,
                ),
            );
        }, [container, filterTypes, handleAdd, shouldShowBody, width]);

        return (
            <StyledPersonFinder ref={boxRef} onFocus={handleOpen}>
                <div id="person_finder_input">
                    <TagInput
                        ref={tagInputRef}
                        placeholder={placeholder}
                        leftElement={leftElement}
                        shouldAllowMultiple={shouldAllowMultiple}
                        shouldPreventEnter
                        onRemove={handleRemove}
                        tags={tags}
                    />
                </div>
                {portal}
            </StyledPersonFinder>
        );
    },
);

PersonFinderWrapper.displayName = 'PersonFinderWrapper';

export default PersonFinderWrapper;
