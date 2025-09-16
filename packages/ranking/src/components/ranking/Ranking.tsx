import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { StyledRanking } from './Ranking.styles';
import { IRankingEntry } from '../../types/ranking';
import { Accordion, AccordionGroup, Icon } from '@chayns-components/core';
import RankingEntry from './ranking-entry/RankingEntry';

export type RankingProps = {
    /**
     *
     */
    entries: IRankingEntry[];
    /**
     *
     */
    friendPersonIds: string[];
    /**
     *
     * @param personId
     */
    onFriendAdd?: (personId: string) => void;
    /**
     *
     * @param personId
     */
    onFriendRemove?: (personId: string) => void;
    /**
     *
     */
    onFriendVisibleChange?: () => void;
    /**
     *
     * @param value
     */
    onSearchChange?: (value: string) => void;
    /**
     *
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
    title = 'Rangliste',
    entries,
    onFriendRemove,
    onFriendAdd,
    shouldShowOnlyFriends,
    friendPersonIds,
    onSearchChange,
    searchValue,
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

    return useMemo(
        () => (
            <StyledRanking>
                <Accordion
                    title={title}
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
                </Accordion>
            </StyledRanking>
        ),
        [
            content,
            handleSearchChange,
            onFriendVisibleChange,
            searchValue,
            shouldShowOnlyFriends,
            title,
        ],
    );
};

Ranking.displayName = 'Ranking';

export default Ranking;
