import React, { FC, MouseEvent } from 'react';
import { StyledPersonFinderItem } from './PersonFinderItem.styles';
import { Icon, ListItem } from '@chayns-components/core';
import { PersonEntry, SiteEntry } from '../../../../../types/personFinder';

export interface PersonFinderItemProps {
    entry: PersonEntry | SiteEntry;
    onAdd: (id: string) => void;
}

const isSiteEntry = (entry: PersonEntry | SiteEntry): entry is SiteEntry =>
    'name' in entry && !('firstName' in entry);

const PersonFinderItem: FC<PersonFinderItemProps> = ({ entry, onAdd }) => {
    const isSite = isSiteEntry(entry);

    const { url, commonSites, name, firstName, lastName, id } = entry as PersonEntry & SiteEntry;

    const title = isSite ? name : `${firstName ?? ''} ${lastName ?? ''}`;
    const subtitle = isSite
        ? url
        : `chaynsID: ${id}${commonSites ? ` - ${commonSites} gemeinsame Sites` : ''}`;
    const imageUrl = `https://sub60.tobit.com/${isSite ? 'l' : 'u'}/${id}?size=120`;

    const handleIconClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const rightElements = !isSite ? (
        <Icon icons={['fa fa-star']} onClick={handleIconClick} />
    ) : null;

    return (
        <StyledPersonFinderItem onClick={() => onAdd(id)}>
            <ListItem
                title={title}
                subtitle={subtitle}
                images={[imageUrl]}
                shouldShowRoundImageOrIcon={!isSite}
                rightElements={rightElements}
                shouldForceHover
            />
        </StyledPersonFinderItem>
    );
};

PersonFinderItem.displayName = 'PersonFinderItem';

export default PersonFinderItem;
