import React, { FC } from 'react';
import { StyledPersonFinderItem } from './PersonFinderItem.styles';
import { Icon, ListItem } from '@chayns-components/core';
import { PersonEntry, SiteEntry } from '../../../../../types/personFinder';

type PersonFinderItemBaseProps = {};

export type PersonFinderItemProps = PersonFinderItemBaseProps & (PersonEntry | SiteEntry);

const PersonFinderItem: FC<PersonFinderItemProps> = ({
    id,
    name,
    firstName,
    lastName,
    url,
    commonSites,
}) => {
    const tets = true;

    const title = 'Person Finder';
    const subtitle = 'Person Finder';

    const rightElements = <Icon icons={['fa fa-star']} />;

    return (
        <StyledPersonFinderItem>
            <ListItem title={title} subtitle={subtitle} rightElements={rightElements} />
        </StyledPersonFinderItem>
    );
};

PersonFinderItem.displayName = 'PersonFinderItem';

export default PersonFinderItem;
