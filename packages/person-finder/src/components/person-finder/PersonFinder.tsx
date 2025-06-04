import React, { forwardRef, useRef } from 'react';
import { DefaultEntry, PersonFinderFilterTypes, Priority } from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';
import PersonFinderWrapper, {
    PersonFinderWrapperProps,
    PersonFinderWrapperRef,
} from './person-finder-wrapper/PersonFinderWrapper';
import { AreaProvider, useContainer } from '@chayns-components/core';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE];

export type PersonFinderProps = PersonFinderWrapperProps & {
    /**
     * Sites an Persons that are selected by default.
     */
    defaultEntries?: DefaultEntry[];
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
            defaultEntries,
            onAdd,
            leftElement,
        },
        ref,
    ) => {
        const personFinderRef = useRef<HTMLDivElement>(null);

        const newContainer = useContainer({ ref: personFinderRef, container });

        return (
            <PersonFinderProvider friendsPriority={friendsPriority} defaultEntries={defaultEntries}>
                <AreaProvider shouldChangeColor={false} shouldDisableListItemPadding>
                    <div className="beta-chayns-person-finder" ref={personFinderRef}>
                        <PersonFinderWrapper
                            ref={ref}
                            container={newContainer}
                            filterTypes={filterTypes}
                            maxEntries={maxEntries}
                            onAdd={onAdd}
                            leftElement={leftElement}
                            onRemove={onRemove}
                            placeholder={placeholder}
                            shouldAllowMultiple={shouldAllowMultiple}
                        />
                    </div>
                </AreaProvider>
            </PersonFinderProvider>
        );
    },
);

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
