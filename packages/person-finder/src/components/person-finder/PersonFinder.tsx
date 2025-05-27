import React, { forwardRef, useRef } from 'react';
import { PersonFinderFilterTypes, Priority } from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';
import PersonFinderWrapper, {
    PersonFinderWrapperProps,
    PersonFinderWrapperRef,
} from './person-finder-wrapper/PersonFinderWrapper';
import { useContainer } from '@chayns-components/core';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE];

export type PersonFinderProps = PersonFinderWrapperProps & {
    /**
     * Determines the priority level for displaying friends in search results.
     */
    friendsPriority?: Priority;
};

export type PersonFinderRef = PersonFinderWrapperRef;

const PersonFinder = forwardRef<PersonFinderRef, PersonFinderProps>(
    (
        {
            container,
            filterTypes = DEFAULT_FILTER_TYPES,
            friendsPriority = Priority.HIGH,
            placeholder = 'Person oder Site finden',
            shouldAllowMultiple = true,
            maxEntries,
            onRemove,
            onAdd,
        },
        ref,
    ) => {
        const personFinderRef = useRef<HTMLDivElement>(null);

        const newContainer = useContainer({ ref: personFinderRef, container });

        return (
            <PersonFinderProvider friendsPriority={friendsPriority}>
                <div className="beta-chayns-person-finder" ref={personFinderRef}>
                    <PersonFinderWrapper
                        ref={ref}
                        container={newContainer}
                        filterTypes={filterTypes}
                        maxEntries={maxEntries}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        placeholder={placeholder}
                        shouldAllowMultiple={shouldAllowMultiple}
                    />
                </div>
            </PersonFinderProvider>
        );
    },
);

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
