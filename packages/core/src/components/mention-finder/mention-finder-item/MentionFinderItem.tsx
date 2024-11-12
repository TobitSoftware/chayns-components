import React, { FC, useCallback } from 'react';
import type { MentionMember } from '../MentionFinder';
import {
    StyledMentionFinderItem,
    StyledMentionFinderItemContent,
    StyledMentionFinderItemContentInfo,
    StyledMentionFinderItemContentName,
    StyledMentionFinderItemImage,
} from './MentionFinderItem.styles';

export type MentionFinderItemProps = {
    isActive: boolean;
    member: MentionMember;
    onClick: (member: MentionMember) => void;
    onHover: (member: MentionMember) => void;
};

const MentionFinderItem: FC<MentionFinderItemProps> = ({ isActive, member, onClick, onHover }) => {
    const handleItemClick = useCallback(() => onClick(member), [member, onClick]);

    const handleItemMouseEnter = useCallback(() => onHover(member), [member, onHover]);

    return (
        <StyledMentionFinderItem
            className="prevent-lose-focus"
            onClick={handleItemClick}
            onMouseEnter={handleItemMouseEnter}
            $isActive={isActive}
        >
            <StyledMentionFinderItemImage
                src={member.imageUrl}
                $shouldShowRoundImage={member.shouldShowRoundImage}
            />
            <StyledMentionFinderItemContent>
                <StyledMentionFinderItemContentName>
                    {member.name}
                </StyledMentionFinderItemContentName>
                <StyledMentionFinderItemContentInfo>
                    {member.info}
                </StyledMentionFinderItemContentInfo>
            </StyledMentionFinderItemContent>
        </StyledMentionFinderItem>
    );
};

MentionFinderItem.displayName = 'MentionFinderItem';

export default MentionFinderItem;
