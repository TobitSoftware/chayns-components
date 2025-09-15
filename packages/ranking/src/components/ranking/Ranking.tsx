import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { StyledRanking } from './Ranking.styles';
import { IRankingEntry } from '../../types/ranking';
import { Accordion, AccordionGroup, Icon } from '@chayns-components/core';
import RankingEntry from './ranking-entry/RankingEntry';

export type RankingProps = {
    title?: string;
    entries: IRankingEntry[];
    onFriendAdd?: (personId: string) => void;
    onFriendRemove?: (personId: string) => void;
    friendPersonIds: string[];
    shouldShowOnlyFriends?: boolean;
    onSearchChange?: (value: string) => void;
    searchValue?: string;
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
}) => {
    const content = useMemo(
        () =>
            entries.map(({ content: entryContent, rank, personId, points, name, icons }) => (
                <RankingEntry
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
                        />
                    }
                >
                    <AccordionGroup>{content}</AccordionGroup>
                </Accordion>
            </StyledRanking>
        ),
        [content, handleSearchChange, searchValue, shouldShowOnlyFriends, title],
    );
};

Ranking.displayName = 'Ranking';

export default Ranking;
