import React, {
    type ChangeEvent,
    forwardRef,
    type ReactElement,
    ReactPortal,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { type ContextMenuCoordinates, Icon, TagInput } from '@chayns-components/core';
import { v4 as uuidV4 } from 'uuid';
import {
    PersonEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    SiteEntry,
} from '../../../types/personFinder';
import { StyledPersonFinder, StyledPersonFinderLeftElement } from './PersonFinderWrapper.styles';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
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
    container?: Element | null;
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

        console.log('TEST 4', ref);

        const [portal, setPortal] = useState<ReactPortal>();
        const [width, setWidth] = useState(0);
        const [shouldShowBody, setShouldShowBody] = useState(false);
        const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
            x: 0,
            y: 0,
        });

        const tagInputRef = useRef<TagInputRef>(null);
        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const uuid = useMemo(() => uuidV4(), []);

        const leftElement = leftElementProp ?? (
            <StyledPersonFinderLeftElement>
                <Icon icons={['fa fa-search']} />
            </StyledPersonFinderLeftElement>
        );

        useEffect(() => {
            if (boxRef.current) {
                const { x, y } = boxRef.current.getBoundingClientRect();

                setInternalCoordinates({
                    x,
                    y,
                });
            }
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
            if (boxRef.current && container) {
                const {
                    left: comboBoxLeft,
                    top: comboBoxTop,
                    height: bodyHeight,
                } = boxRef.current.getBoundingClientRect();

                const { left, top } = container.getBoundingClientRect();

                const x = comboBoxLeft - left + container.scrollLeft;
                const y = comboBoxTop - top + container.scrollTop;

                setInternalCoordinates({
                    x,
                    y: y + bodyHeight,
                });

                setShouldShowBody(true);
            }
        }, [container]);

        const handleClear = useCallback(() => {
            console.log('TEST');

            if (typeof setTags !== 'function') {
                return;
            }

            console.log('TEST 1');

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

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                if (typeof updateSearch === 'function') {
                    updateSearch(event.target.value);
                }
            },
            [updateSearch],
        );

        /**
         * This hook calculates the width
         */
        useEffect(() => {
            const input = document.getElementById(`person_finder_input--${uuid}`);

            const getInputWidth = () => {
                if (input) {
                    setWidth(input.offsetWidth);
                }
            };

            if (input) {
                new ResizeObserver(getInputWidth).observe(input);
            }
        }, [uuid]);

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
                clear: () => handleClear(),
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
                                coordinates={internalCoordinates}
                                width={width}
                                ref={contentRef}
                                onAdd={handleAdd}
                                onRemove={handleRemove}
                                filterTypes={filterTypes}
                            />
                        )}
                    </AnimatePresence>,
                    container,
                ),
            );
        }, [
            container,
            filterTypes,
            handleAdd,
            handleRemove,
            internalCoordinates,
            shouldShowBody,
            width,
        ]);

        return (
            <StyledPersonFinder ref={boxRef} onFocus={handleOpen} key={`person-finder-${uuid}`}>
                <div id={`person_finder_input--${uuid}`}>
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
                </div>
                {portal}
            </StyledPersonFinder>
        );
    },
);

PersonFinderWrapper.displayName = 'PersonFinderWrapper';

export default PersonFinderWrapper;
