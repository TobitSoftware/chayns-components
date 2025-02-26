import React, { FC, ReactPortal, useEffect, useState } from 'react';
import { Icon, TagInput } from '@chayns-components/core';
import { PersonFinderFilterTypes } from '../../../types/personFinder';
import { StyledPersonFinder, StyledPersonFinderLeftElement } from './PersonFinderWrapper.styles';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import PersonFinderBody from './person-finder-body/PersonFinderBody';

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
    const [portal, setPortal] = useState<ReactPortal>();
    const [width, setWidth] = useState(0);
    const [shouldShowBody, setShouldShowBody] = useState(true);

    const leftElement = (
        <StyledPersonFinderLeftElement>
            <Icon icons={['fa fa-search']} />
        </StyledPersonFinderLeftElement>
    );

    const handleRemove = (id: string) => {
        // ToDo remove with personId
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
                            filterTypes={filterTypes}
                        />
                    )}
                </AnimatePresence>,
                container,
            ),
        );
    }, [container, filterTypes, shouldShowBody, width]);

    return (
        <StyledPersonFinder onFocus={() => setShouldShowBody(true)}>
            <div id="person_finder_input">
                <TagInput
                    placeholder="Person oder Site finden"
                    leftElement={leftElement}
                    shouldAllowMultiple={shouldAllowMultiple}
                    onRemove={handleRemove}
                />
            </div>
            {portal}
        </StyledPersonFinder>
    );
};

PersonFinderWrapper.displayName = 'PersonFinderWrapper';

export default PersonFinderWrapper;
