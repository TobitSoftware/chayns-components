import React, { FC, ReactPortal, useCallback, useEffect, useRef, useState } from 'react';
import { Icon, TagInput } from '@chayns-components/core';
import { PersonEntry, PersonFinderFilterTypes, SiteEntry } from '../../../types/personFinder';
import { StyledPersonFinder, StyledPersonFinderLeftElement } from './PersonFinderWrapper.styles';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import PersonFinderBody from './person-finder-body/PersonFinderBody';
import { usePersonFinder } from '../../PersonFinderProvider';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';
import { TagInputRef } from '@chayns-components/core/lib/types/components/tag-input/TagInput';

export type PersonFinderWrapperProps = {
    /**
     *
     */
    shouldAllowMultiple?: boolean;
    /**
     *
     */
    filterTypes?: PersonFinderFilterTypes[];
    /**
     *
     */
    container?: Element | null;
};

const PersonFinderWrapper: FC<PersonFinderWrapperProps> = ({
    shouldAllowMultiple,
    filterTypes,
    container,
}) => {
    const { data } = usePersonFinder();

    const [portal, setPortal] = useState<ReactPortal>();
    const [width, setWidth] = useState(0);
    const [tags, setTags] = useState<Tag[]>([]);
    const [shouldShowBody, setShouldShowBody] = useState(true);

    const tagInputRef = useRef<TagInputRef>(null);

    const leftElement = (
        <StyledPersonFinderLeftElement>
            <Icon icons={['fa fa-search']} />
        </StyledPersonFinderLeftElement>
    );

    const handleRemove = (id: string) => {
        setTags((prevState) => prevState.filter((entry) => entry.id !== id));
    };

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

    const handleAdd = useCallback(
        (id: string) => {
            const selectedEntry = Object.values(data ?? {})
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

            tagInputRef.current?.resetValue();

            setTags((prevState) => {
                if (prevState.some((t) => t.id === id)) {
                    return prevState;
                }

                return [...prevState, tag];
            });
        },
        [data],
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
                            onBlur={() => setShouldShowBody(false)}
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
        <StyledPersonFinder onFocus={() => setShouldShowBody(true)}>
            <div id="person_finder_input">
                <TagInput
                    ref={tagInputRef}
                    placeholder="Person oder Site finden"
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
};

PersonFinderWrapper.displayName = 'PersonFinderWrapper';

export default PersonFinderWrapper;
