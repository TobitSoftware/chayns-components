import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
    DefaultEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    Priority,
} from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';
import PersonFinderWrapper, {
    PersonFinderWrapperProps,
    PersonFinderRef,
} from './person-finder-wrapper/PersonFinderWrapper';
import { AreaProvider, useContainer } from '@chayns-components/core';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE];

export type PersonFinderProps = PersonFinderWrapperProps & {
    /**
     * Sites an Persons that are selected by default.
     */
    defaultEntries?: DefaultEntry[];
    /**
     * Entry ids to exclude from the results
     */
    excludedEntryIds?: PersonFinderEntry['id'][];
    /**
     * Determines the priority level for displaying friends in search results.
     */
    friendsPriority?: Priority;
};

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
            excludedEntryIds,
        },
        ref,
    ) => {
        const personFinderRef = useRef<HTMLDivElement>(null);
        const innerRef = useRef<PersonFinderRef>(null);

        const newContainer = useContainer({ ref: personFinderRef, container });

        useImperativeHandle(ref, () => ({
            clear: () => innerRef.current?.clear(),
        }));

        return (
            <PersonFinderProvider
                friendsPriority={friendsPriority}
                defaultEntries={defaultEntries}
                filterTypes={filterTypes}
                excludedEntryIds={excludedEntryIds}
            >
                <AreaProvider shouldChangeColor={false} shouldDisableListItemPadding>
                    <div className="beta-chayns-person-finder" ref={personFinderRef}>
                        <PersonFinderWrapper
                            ref={innerRef}
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
