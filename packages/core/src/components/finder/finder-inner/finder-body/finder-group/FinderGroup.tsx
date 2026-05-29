import React, { MouseEvent, useMemo } from 'react';
import { FinderGroupProps } from './FinderGroup.types';
import {
    StyledFinderGroup,
    StyledFinderGroupButtonWrapper,
    StyledFinderGroupErrorMessage,
    StyledFinderGroupName,
    StyledFinderGroupWaitCursor,
} from './FinderGroup.styles';
import { useFinderContext } from '../../../Finder.context';
import { useFinderFilter } from '../FinderBody.hooks';
import { LoadingState } from '../../../Finder.types';
import Button from '../../../../button/Button';
import SmallWaitCursor from '../../../../small-wait-cursor/SmallWaitCursor';
import List from '../../../../list/List';

const handlePreventDefault = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
};

const FinderGroup = <E extends { id: string | number }>({
    entries,
    filterKey,
    shouldDisplayName,
    count,
}: FinderGroupProps<E>) => {
    const {
        loadMore,
        itemRenderer,
        searchString,
        loadingState: loadingStateFromState,
    } = useFinderContext();

    const { getGroupName } = useFinderFilter();

    const groupName = getGroupName(filterKey);

    const loadingState = loadingStateFromState
        ? (loadingStateFromState[filterKey] ?? LoadingState.None)
        : LoadingState.None;

    const errorMessage = useMemo(() => {
        if (loadingState === LoadingState.Pending) {
            return undefined;
        }

        if (searchString.length > 3 && entries.length === 0) {
            return `Es konnten keine ${groupName} zu der Suche "${searchString}" gefunden werden.`;
        }

        return undefined;
    }, [entries.length, groupName, loadingState, searchString]);

    return (
        <StyledFinderGroup onClick={handlePreventDefault}>
            {shouldDisplayName && (
                <StyledFinderGroupName className="finder-group-name">
                    {groupName}
                </StyledFinderGroupName>
            )}
            {entries.length > 0 && <List>{entries.map((entry) => itemRenderer(entry))}</List>}
            {entries.length === 0 && loadingState === LoadingState.Pending && (
                <StyledFinderGroupWaitCursor>
                    <SmallWaitCursor shouldHideBackground />
                </StyledFinderGroupWaitCursor>
            )}
            {typeof errorMessage === 'string' && (
                <StyledFinderGroupErrorMessage>{errorMessage}</StyledFinderGroupErrorMessage>
            )}
            {entries.length < count && (
                <StyledFinderGroupButtonWrapper>
                    <Button
                        key={`more-button--${filterKey}`}
                        shouldShowWaitCursor={loadingState === LoadingState.Pending}
                        onClick={() => loadMore(filterKey)}
                    >
                        Mehr
                    </Button>
                </StyledFinderGroupButtonWrapper>
            )}
        </StyledFinderGroup>
    );
};

FinderGroup.displayName = 'FinderGroup';

export default FinderGroup;
