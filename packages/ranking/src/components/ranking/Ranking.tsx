import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { StyledRanking, StyledRankingLoadMoreButton } from './Ranking.styles';
import { IRankingEntry } from '../../types/ranking';
import { Accordion, AccordionContent, AccordionGroup, Button, Icon } from '@chayns-components/core';
import RankingEntry from './ranking-entry/RankingEntry';
import { TextStringProviderSSR, Translation } from '@chayns/textstrings';
import textStrings from '../../constants/textStrings';

export type RankingProps = {
    /**
     * Array of ranking entries to be displayed in the ranking list.
     */
    entries: IRankingEntry[];
    /**
     * Array of personIds that represent the user's friends.
     */
    friendPersonIds: string[];
    /**
     * Whether new data is loading.
     */
    isLoadingData?: boolean;
    /**
     * Callback function triggered when a friend is added to the friends list.
     * @param personId - The ID of the person to be added as friend
     */
    onFriendAdd?: (personId: string) => void;
    /**
     * Callback function triggered when a friend is removed from the friends list.
     * @param personId - The ID of the person to be removed from friends
     */
    onFriendRemove?: (personId: string) => void;
    /**
     * Callback function triggered when the visibility of friends is toggled.
     */
    onFriendVisibleChange?: () => void;
    /**
     * Callback function when the load more button is clicked.
     */
    onLoadMore?: () => void;
    /**
     * Callback function triggered when the search input value changes.
     * @param value - The current search input value
     */
    onSearchChange?: (value: string) => void;
    /**
     * The current value of the search input field.
     */
    searchValue?: string;
    /**
     * Whether only the friends of the user should be displayed (filtering and fetching the correct data is done by you).
     */
    shouldShowOnlyFriends?: boolean;
    /**
     * The title of the top Accordion.
     */
    title?: string;
};

const Ranking: FC<RankingProps> = ({
    title,
    entries,
    onFriendRemove,
    onFriendAdd,
    shouldShowOnlyFriends,
    friendPersonIds,
    isLoadingData,
    onSearchChange,
    searchValue,
    onLoadMore,
    onFriendVisibleChange,
}) => {
    const content = useMemo(
        () =>
            entries.map(({ content: entryContent, rank, personId, points, name, icons }) => (
                <RankingEntry
                    key={`ranking-entry--${personId}`}
                    rank={rank}
                    personId={personId}
                    name={name}
                    icons={icons}
                    points={points}
                    content={entryContent}
                    onFriendAdd={onFriendAdd}
                    onFriendRemove={onFriendRemove}
                    isFriend={friendPersonIds?.includes(personId)}
                />
            )),
        [entries, friendPersonIds, onFriendAdd, onFriendRemove],
    );

    const handleSearchChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (typeof onSearchChange === 'function') {
                onSearchChange(event.target.value);
            }
        },
        [onSearchChange],
    );

    const ts = textStrings.ranking;

    return useMemo(
        () => (
            <TextStringProviderSSR libraries="chayns-components-v5-ranking" id="ranking">
                <StyledRanking>
                    <Accordion
                        titleElement={title ?? <Translation textString={ts.title} />}
                        onSearchChange={handleSearchChange}
                        searchValue={searchValue}
                        rightElement={
                            <Icon
                                icons={shouldShowOnlyFriends ? ['fas fa-star'] : ['far fa-star']}
                                size={15}
                                onClick={onFriendVisibleChange}
                            />
                        }
                    >
                        <AccordionGroup>{content}</AccordionGroup>
                        {typeof onLoadMore === 'function' && (
                            <AccordionContent>
                                <StyledRankingLoadMoreButton>
                                    <Button
                                        onClick={onLoadMore}
                                        shouldShowWaitCursor={isLoadingData}
                                    >
                                        <Translation textString={ts.button.loadMore} />
                                    </Button>
                                </StyledRankingLoadMoreButton>
                            </AccordionContent>
                        )}
                    </Accordion>
                </StyledRanking>
            </TextStringProviderSSR>
        ),
        [
            content,
            handleSearchChange,
            isLoadingData,
            onFriendVisibleChange,
            onLoadMore,
            searchValue,
            shouldShowOnlyFriends,
            title,
        ],
    );
};

Ranking.displayName = 'Ranking';

export default Ranking;
