import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
    DefaultEntry,
    PersonEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    Priority,
    UACFilter,
} from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';
import PersonFinderWrapper, {
    PersonFinderWrapperProps,
    PersonFinderRef,
} from './person-finder-wrapper/PersonFinderWrapper';
import { AreaProvider } from '@chayns-components/core';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE];

export type PersonFinderProps = PersonFinderWrapperProps & {
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
};

const PersonFinder = forwardRef<PersonFinderRef, PersonFinderProps>(
    (
        {
            container,
            dropdownDirection,
            defaultEntries,
            excludedEntryIds,
            uacFilter,
            entries,
            filterTypes = uacFilter || entries
                ? [PersonFinderFilterTypes.PERSON]
                : DEFAULT_FILTER_TYPES,
            friendsPriority = Priority.HIGH,
            leftElement,
            maxEntries,
            onAdd,
            onDropdownHide,
            onDropdownShow,
            onRemove,
            placeholder = 'Person oder Site finden',
            shouldAllowMultiple = true,
            shouldHideResultsOnAdd = !shouldAllowMultiple || false,
            shouldShowOwnUser = false,
            shouldRenderInline = false,
        },
        ref,
    ) => {
        const personFinderRef = useRef<HTMLDivElement>(null);
        const innerRef = useRef<PersonFinderRef>(null);

        useImperativeHandle(ref, () => ({
            clear: () => innerRef.current?.clear(),
        }));

        return (
            <PersonFinderProvider
                friendsPriority={friendsPriority}
                defaultEntries={defaultEntries}
                filterTypes={filterTypes}
                excludedEntryIds={excludedEntryIds}
                shouldShowOwnUser={shouldShowOwnUser}
                uacFilter={uacFilter}
                entries={entries}
            >
                <AreaProvider shouldChangeColor={false} shouldDisableListItemPadding>
                    <div className="beta-chayns-person-finder" ref={personFinderRef}>
                        <PersonFinderWrapper
                            ref={innerRef}
                            container={container}
                            dropdownDirection={dropdownDirection}
                            filterTypes={filterTypes}
                            maxEntries={maxEntries}
                            onAdd={onAdd}
                            onDropdownHide={onDropdownHide}
                            onDropdownShow={onDropdownShow}
                            leftElement={leftElement}
                            onRemove={onRemove}
                            placeholder={placeholder}
                            shouldAllowMultiple={shouldAllowMultiple}
                            shouldHideResultsOnAdd={shouldHideResultsOnAdd}
                            shouldRenderInline={shouldRenderInline}
                        />
                    </div>
                </AreaProvider>
            </PersonFinderProvider>
        );
    },
);

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
