import React, { FC, useCallback, useMemo } from 'react';
import {
    StyledRankingEntry,
    StyledRankingEntryContent,
    StyledRankingEntryContentEntry,
    StyledRankingEntryContentEntryName,
    StyledRankingEntryContentEntryValue,
    StyledRankingEntryContentHeadline,
    StyledRankingEntryElement,
    StyledRankingEntryElementLeft,
    StyledRankingEntryElementRight,
    StyledRankingEntryRightElement,
    StyledRankingEntryRightElementPoints,
} from './RankingEntry.styles';
import { Accordion, AccordionContent, Icon } from '@chayns-components/core';
import { IRankingEntry, RankingContentEntry, RankingContentHeadline } from '../../../types/ranking';

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
    name: fullName,
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
                {fullName}
            </span>
        );

        const rightElements = (
            <StyledRankingEntryRightElement>
                <StyledRankingEntryRightElementPoints>
                    {points}
                </StyledRankingEntryRightElementPoints>
                {icons && <Icon icons={icons} />}
                <Icon
                    icons={isFriend ? ['fas fa-star'] : ['far fa-star']}
                    size={15}
                    onClick={handleIconClick}
                />
            </StyledRankingEntryRightElement>
        );

        return { title: titleElement, rightElement: rightElements };
    }, [handleIconClick, icons, isFriend, fullName, points, rank]);

    const entryContent = useMemo(() => {
        if (!content) return null;

        return (content as (RankingContentHeadline & RankingContentEntry)[]).map(
            ({ name, value, headline, id }) => {
                if (typeof headline === 'string') {
                    return (
                        <StyledRankingEntryContentHeadline key={id}>
                            {headline}
                        </StyledRankingEntryContentHeadline>
                    );
                }

                return (
                    <StyledRankingEntryContentEntry key={id}>
                        <StyledRankingEntryContentEntryName>
                            {name}
                        </StyledRankingEntryContentEntryName>
                        <StyledRankingEntryContentEntryValue>
                            {value}
                        </StyledRankingEntryContentEntryValue>
                    </StyledRankingEntryContentEntry>
                );
            },
        );
    }, [content]);

    return useMemo(
        () => (
            <StyledRankingEntry $shouldShowLines={!entryContent}>
                {entryContent ? (
                    <Accordion title="" titleElement={title} rightElement={rightElement}>
                        <AccordionContent>
                            <StyledRankingEntryContent>{entryContent}</StyledRankingEntryContent>
                        </AccordionContent>
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
        [entryContent, rightElement, title],
    );
};

RankingEntry.displayName = 'RankingEntry';

export default RankingEntry;
