import React, { FC, useCallback } from 'react';
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
    StyledPersonFinderGroupErrorMessage,
    StyledPersonFinderGroupName,
    StyledPersonFinderGroupWaitCursor,
} from './PersonFinderGroup.styles';
import { usePersonFinder } from '../../../../PersonFinderProvider';
import PersonFinderItem from './person-finder-item/PersonFinderItem';

export type PersonFinderGroupProps = {
    filterKey: PersonFinderFilterTypes;
    entries: PersonFinderEntry[];
    count: number;
    search: string;
    shouldShowGroupName: boolean;
    onAdd: (id: string) => void;
};

const PersonFinderGroup: FC<PersonFinderGroupProps> = ({
    entries,
    search,
    filterKey,
    count,
    shouldShowGroupName,
    onAdd,
}) => {
    const { loadMore, loadingState: loadingStateFromState } = usePersonFinder();

    const groupName = getGroupName(filterKey);

    const loadingState = loadingStateFromState
        ? (loadingStateFromState[filterKey] ?? LoadingState.None)
        : LoadingState.None;

    const waitCursor =
        entries.length === 0 && loadingState === LoadingState.Pending ? (
            <StyledPersonFinderGroupWaitCursor>
                <SmallWaitCursor />
            </StyledPersonFinderGroupWaitCursor>
        ) : null;

    const errorMessage =
        entries.length === 0 && loadingState === LoadingState.Error ? (
            <StyledPersonFinderGroupErrorMessage>
                Es konnten keine {groupName} zu der Suche &#34;
                {search}&#34; gefunden werden.
            </StyledPersonFinderGroupErrorMessage>
        ) : null;

    const handleLoadMore = useCallback(() => {
        if (typeof loadMore === 'function') {
            loadMore(filterKey);
        }
    }, [filterKey, loadMore]);

    return (
        <StyledPersonFinderGroup>
            {shouldShowGroupName && (
                <StyledPersonFinderGroupName className="person-finder-group-name">
                    {groupName}
                </StyledPersonFinderGroupName>
            )}
            {waitCursor}
            {errorMessage}
            {entries.length > 0 && (
                <List>
                    {entries.map((entry) => (
                        <PersonFinderItem
                            key={`person-finder-entry--${entry.id}`}
                            entry={entry}
                            onAdd={onAdd}
                        />
                    ))}
                </List>
            )}
            {entries.length < count && (
                <StyledPersonFinderGroupButtonWrapper>
                    <Button
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
