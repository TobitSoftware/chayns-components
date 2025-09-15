import React, { FC, useCallback, useMemo } from 'react';
import {
    StyledRankingEntry,
    StyledRankingEntryElement,
    StyledRankingEntryElementLeft,
    StyledRankingEntryElementRight,
    StyledRankingEntryRightElement,
} from './RankingEntry.styles';
import { Accordion, Icon } from '@chayns-components/core';
import { IRankingEntry } from '../../../types/ranking';

export type RankingEntryProps = {
    onFriendAdd?: (personId: string) => void;
    onFriendRemove?: (personId: string) => void;
    isFriend?: boolean;
    content?: IRankingEntry['content'];
    rank: IRankingEntry['rank'];
    personId: IRankingEntry['personId'];
    points: IRankingEntry['points'];
    name: IRankingEntry['name'];
    icons: IRankingEntry['icons'];
};

const RankingEntry: FC<RankingEntryProps> = ({
    rank,
    name,
    personId,
    icons,
    points,
    isFriend,
    content,
    onFriendRemove,
    onFriendAdd,
}) => {
    const handleIconClick = useCallback(() => {
        if (isFriend && typeof onFriendRemove === 'function') {
            onFriendRemove(personId);
        } else if (typeof onFriendAdd === 'function') {
            onFriendAdd(personId);
        }
    }, [isFriend, onFriendAdd, onFriendRemove, personId]);

    const { title, rightElement } = useMemo(() => {
        const titleElement = (
            <span>
                <strong>{rank}. </strong>
                {name}
            </span>
        );

        const rightElements = (
            <StyledRankingEntryRightElement>
                {points}
                {icons && <Icon icons={icons} />}
                <Icon
                    icons={isFriend ? ['fas fa-star'] : ['far fa-star']}
                    size={15}
                    onClick={handleIconClick}
                />
            </StyledRankingEntryRightElement>
        );

        return { title: titleElement, rightElement: rightElements };
    }, [handleIconClick, icons, isFriend, name, points, rank]);

    return useMemo(
        () => (
            <StyledRankingEntry>
                {content ? (
                    <Accordion title="" titleElement={title} rightElement={rightElement}>
                        test
                    </Accordion>
                ) : (
                    <StyledRankingEntryElement>
                        <StyledRankingEntryElementLeft>{title}</StyledRankingEntryElementLeft>
                        <StyledRankingEntryElementRight>
                            {rightElement}
                        </StyledRankingEntryElementRight>
                    </StyledRankingEntryElement>
                )}
            </StyledRankingEntry>
        ),
        [content, rightElement, title],
    );
};

RankingEntry.displayName = 'RankingEntry';

export default RankingEntry;
