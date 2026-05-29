import React, { type Context, forwardRef } from 'react';
import {
    AreaProvider,
    InputType,
    Finder,
    type FinderContext,
    FinderRef,
    getFinderProviderType,
} from '@chayns-components/core';
import {
    type PersonFinderEntry,
    type PersonFinderProps,
    type PersonFinderProviderProps,
    PersonFinderFilterTypes,
    Priority,
    RelationMode,
} from './PersonFinder.types';
import PersonFinderProvider, { PersonFinderContext } from './PersonFinder.context';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE];

const PersonFinder = forwardRef<FinderRef, PersonFinderProps>(
    (
        {
            container,
            dropdownDirection,
            defaultEntries,
            excludedEntryIds,
            relationMode = RelationMode.PERSON,
            uacFilter,
            entries,
            filterTypes = uacFilter || entries
                ? [PersonFinderFilterTypes.PERSON]
                : DEFAULT_FILTER_TYPES,
            friendsPriority = relationMode === RelationMode.SITE ? Priority.NORMAL : Priority.HIGH,
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
            shouldDisableRemove = false,
            shouldRenderInline = false,
        },
        ref,
    ) => (
        <AreaProvider shouldChangeColor={false} shouldDisableListItemPadding>
            <Finder<PersonFinderEntry, PersonFinderProviderProps>
                Context={
                    PersonFinderContext as unknown as Context<FinderContext<PersonFinderEntry> | null>
                }
                Provider={getFinderProviderType(
                    <PersonFinderProvider
                        friendsPriority={friendsPriority}
                        defaultEntries={defaultEntries}
                        filterTypes={filterTypes}
                        excludedEntryIds={excludedEntryIds}
                        maxEntries={maxEntries}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        shouldShowOwnUser={shouldShowOwnUser}
                        shouldHideResultsOnAdd={shouldHideResultsOnAdd}
                        uacFilter={uacFilter}
                        entries={entries}
                        relationMode={relationMode}
                    />,
                )}
                ref={ref}
                container={container}
                dropdownDirection={dropdownDirection}
                placeholder={placeholder}
                shouldAllowMultiple={shouldAllowMultiple}
                leftElement={leftElement}
                shouldRenderInline={shouldRenderInline}
                onDropdownHide={onDropdownHide}
                onDropdownShow={onDropdownShow}
                shouldDisableRemove={shouldDisableRemove}
                inputType={InputType.TagInput}
            />
        </AreaProvider>
    ),
);

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
