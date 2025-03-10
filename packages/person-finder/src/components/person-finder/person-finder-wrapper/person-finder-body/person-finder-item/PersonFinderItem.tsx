import React, { FC, MouseEvent, useState } from 'react';
import { StyledPersonFinderItem } from './PersonFinderItem.styles';
import { Icon, ListItem } from '@chayns-components/core';
import { PersonEntry, SiteEntry } from '../../../../../types/personFinder';
import { usePersonFinderItem } from '../../../../../hooks/personFinder';

export interface PersonFinderItemProps {
    entry: PersonEntry | SiteEntry;
    onAdd: (id: string) => void;
}

const PersonFinderItem: FC<PersonFinderItemProps> = ({ entry, onAdd }) => {
    const { isSite, imageUrl, title, subtitle } = usePersonFinderItem(entry);

    const { id } = entry;

    const [isFriend, setIsFriend] = useState(false);

    const handleIconClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        setIsFriend((prev) => !prev);
    };

    const rightElements = (
        <Icon
            icons={[`${isFriend ? 'fas' : 'far'} fa-star`]}
            color={isFriend ? 'var(--chayns-color--yellow-3)' : undefined}
            onClick={handleIconClick}
        />
    );

    return (
        <StyledPersonFinderItem onClick={() => onAdd(id)}>
            <ListItem
                title={title}
                subtitle={subtitle}
                images={[imageUrl]}
                titleElement={
                    <span
                        // style={{ marginLeft: '5px', display: index < 2 ? '' : 'none'}}
                        className="vcid-check--blue"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                }
                shouldShowRoundImageOrIcon={!isSite}
                rightElements={!isSite ? rightElements : undefined}
                shouldForceHover
            />
        </StyledPersonFinderItem>
    );
};

PersonFinderItem.displayName = 'PersonFinderItem';

export default PersonFinderItem;
