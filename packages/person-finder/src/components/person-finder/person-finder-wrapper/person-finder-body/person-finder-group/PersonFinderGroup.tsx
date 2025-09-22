import React, { FC, MouseEvent, useCallback } from 'react';
import { Button, List, SmallWaitCursor } from '@chayns-components/core';
import {
    LoadingState,
    PersonFinderEntry,
    PersonFinderFilterTypes,
} from '../../../../../types/personFinder';
import { getGroupName } from '../../../../../utils/personFinder';
import {
    StyledPersonFinderGroup,
    StyledPersonFinderGroupButtonWrapper,
    StyledPersonFinderGroupName,
    StyledPersonFinderGroupWaitCursor,
} from './PersonFinderGroup.styles';
import { usePersonFinder } from '../../../../PersonFinderProvider';
import PersonFinderItem from './person-finder-item/PersonFinderItem';
import { useErrorMessage, useOnlyFriends } from '../../../../../hooks/personFinder';
import PersonFinderSmallItem from './person-finder-small-item/PersonFinderSmallItem';

export type PersonFinderGroupProps = {
    filterKey: PersonFinderFilterTypes;
    entries: PersonFinderEntry[];
    count: number;
    search: string;
    shouldShowGroupName: boolean;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
};

const PersonFinderGroup: FC<PersonFinderGroupProps> = ({
    entries,
    search,
    filterKey,
    count,
    shouldShowGroupName,
    onAdd,
    onRemove,
}) => {
    const { loadMore, loadingState: loadingStateFromState } = usePersonFinder();
    const areOnlyFriendsGiven =
        useOnlyFriends(entries) || filterKey === PersonFinderFilterTypes.UAC;

    const groupName = getGroupName(filterKey);

    const loadingState = loadingStateFromState
        ? (loadingStateFromState[filterKey] ?? LoadingState.None)
        : LoadingState.None;

    const shouldShowLoadMoreButton = entries.length < count;

    const waitCursor =
        (entries.length === 0 || areOnlyFriendsGiven) && loadingState === LoadingState.Pending ? (
            <StyledPersonFinderGroupWaitCursor>
                <SmallWaitCursor shouldHideBackground />
            </StyledPersonFinderGroupWaitCursor>
        ) : null;

    const errorMessage = useErrorMessage({
        areOnlyFriendsGiven,
        entries,
        loadingState,
        search,
        groupName,
    });

    const handleLoadMore = useCallback(() => {
        if (typeof loadMore === 'function') {
            loadMore(filterKey);
        }
    }, [filterKey, loadMore]);

    const handlePreventDefault = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <StyledPersonFinderGroup onClick={handlePreventDefault}>
            {shouldShowGroupName && (
                <StyledPersonFinderGroupName className="person-finder-group-name">
                    {groupName}
                </StyledPersonFinderGroupName>
            )}
            {entries.length > 0 && (
                <List>
                    {entries.map((entry) =>
                        typeof entry.id === 'number' ? (
                            <PersonFinderSmallItem
                                key={`person-finder-entry--${entry.id}`}
                                entry={entry}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        ) : (
                            <PersonFinderItem
                                key={`person-finder-entry--${entry.id}`}
                                entry={entry}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        ),
                    )}
                </List>
            )}
            {waitCursor}
            {errorMessage}
            {shouldShowLoadMoreButton && (
                <StyledPersonFinderGroupButtonWrapper key={`more-button-wrapper--${filterKey}`}>
                    <Button
                        key={`more-button--${filterKey}`}
                        shouldShowWaitCursor={loadingState === LoadingState.Pending}
                        onClick={handleLoadMore}
                    >
                        Mehr {getGroupName(filterKey)}
                    </Button>
                </StyledPersonFinderGroupButtonWrapper>
            )}
        </StyledPersonFinderGroup>
    );
};

PersonFinderGroup.displayName = 'PersonFinderGroup';

export default PersonFinderGroup;
