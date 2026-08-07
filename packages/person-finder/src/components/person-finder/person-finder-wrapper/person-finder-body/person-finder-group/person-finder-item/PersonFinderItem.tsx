import {
    Icon,
    ListItem,
    Theme,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
import React, { FC, KeyboardEvent, MouseEvent, useRef } from 'react';
import { StyledPersonFinderItem } from './PersonFinderItem.styles';
import { PersonFinderEntry } from '../../../../../../types/personFinder';
import { useFriends, usePersonFinderItem } from '../../../../../../hooks/personFinder';
import { usePersonFinder } from '../../../../../PersonFinderProvider';
import { useTheme } from 'styled-components';
import { useUser } from 'chayns-api';

export type PersonFinderItemProps = {
    entry: PersonFinderEntry;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    shouldEnableKeyboardHighlighting?: boolean;
};

const PersonFinderItem: FC<PersonFinderItemProps> = ({
    entry,
    onAdd,
    onRemove,
    shouldEnableKeyboardHighlighting,
}) => {
    const { id: entryId } = entry;

    const id = typeof entryId === 'string' ? entryId : entryId.toString();

    const { isSite, imageUrl, title, subtitle, titleElement } = usePersonFinderItem(entry);
    const { isFriend, addFriend, removeFriend } = useFriends(id);
    const { tags } = usePersonFinder();

    const theme = useTheme() as Theme;
    const user = useUser();

    const isSelected = tags && tags.map((tag) => tag.id).includes(id);
    const itemRef = useRef<HTMLDivElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );
    useFocusRingPortal(itemRef, { isEnabled: shouldShowKeyboardHighlighting });

    const handleIconClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isFriend) {
            if (typeof removeFriend === 'function') {
                removeFriend(id);
            }
        } else if (typeof addFriend === 'function') {
            addFriend(id);
        }
    };

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isSelected) {
            onRemove(id);
        } else {
            onAdd(id);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest('.beta-chayns-icon')) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            handleClick(event as unknown as MouseEvent);
        }
    };

    const rightElements = (
        <Icon
            icons={[`${isFriend ? 'fas' : 'far'} fa-star`]}
            color={isFriend ? theme['yellow-3'] : undefined}
            onClick={handleIconClick}
            shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
            shouldStopPropagation
            tabIndex={0}
        />
    );

    return (
        <StyledPersonFinderItem
            data-person-finder-result
            ref={itemRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            $isSelected={isSelected}
            role="button"
            tabIndex={0}
        >
            <ListItem
                title={title}
                subtitle={subtitle}
                images={imageUrl ? [imageUrl] : undefined}
                titleElement={titleElement}
                shouldShowRoundImageOrIcon={!isSite}
                rightElements={!isSite && id !== user.personId ? rightElements : undefined}
                shouldForceHover
            />
        </StyledPersonFinderItem>
    );
};

PersonFinderItem.displayName = 'PersonFinderItem';

export default PersonFinderItem;
