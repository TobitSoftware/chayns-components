import React, { FC, MouseEvent } from 'react';
import { StyledPersonFinderItem } from './PersonFinderItem.styles';
import { Icon, ListItem, Theme } from '@chayns-components/core';
import { PersonEntry, SiteEntry } from '../../../../../../types/personFinder';
import { useFriends, usePersonFinderItem } from '../../../../../../hooks/personFinder';
import { usePersonFinder } from '../../../../../PersonFinderProvider';
import { useTheme } from 'styled-components';

export interface PersonFinderItemProps {
    entry: PersonEntry | SiteEntry;
    onAdd: (id: string) => void;
}

const PersonFinderItem: FC<PersonFinderItemProps> = ({ entry, onAdd }) => {
    const { id } = entry;

    const { isSite, imageUrl, title, subtitle, titleElement } = usePersonFinderItem(entry);
    const { isFriend, addFriend, removeFriend } = useFriends(id);
    const { tags } = usePersonFinder();
    const theme = useTheme() as Theme;

    const handleIconClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (isFriend) {
            if (typeof removeFriend === 'function') {
                removeFriend(id);
            }
        } else if (typeof addFriend === 'function') {
            addFriend(id);
        }
    };

    const rightElements = (
        <Icon
            icons={[`${isFriend ? 'fas' : 'far'} fa-star`]}
            color={isFriend ? theme['yellow-3'] : undefined}
            onClick={handleIconClick}
        />
    );

    return (
        <StyledPersonFinderItem
            onClick={() => onAdd(id)}
            $isSelected={tags && tags.map((tag) => tag.id).includes(id)}
        >
            <ListItem
                title={title}
                subtitle={subtitle}
                images={[imageUrl]}
                titleElement={titleElement}
                shouldShowRoundImageOrIcon={!isSite}
                rightElements={!isSite ? rightElements : undefined}
                shouldForceHover
            />
        </StyledPersonFinderItem>
    );
};

PersonFinderItem.displayName = 'PersonFinderItem';

export default PersonFinderItem;
