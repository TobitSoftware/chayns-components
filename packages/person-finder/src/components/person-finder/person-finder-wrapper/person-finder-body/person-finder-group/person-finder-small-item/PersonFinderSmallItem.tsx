import React, { FC, MouseEvent } from 'react';
import { PersonFinderEntry } from '../../../../PersonFinder.types';
import { usePersonFinderSmallItem } from '../../../../PersonFinder.hooks';
import { usePersonFinder } from '../../../../PersonFinder.context';
import { StyledPersonFinderSmallItem } from './PersonFinderSmallItem.styles';

export type PersonFinderSmallItemProps = {
    entry: PersonFinderEntry;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
};

const PersonFinderSmallItem: FC<PersonFinderSmallItemProps> = ({ entry, onAdd, onRemove }) => {
    const { id: entryId } = entry;

    const id = typeof entryId === 'string' ? entryId : entryId.toString();

    const { title } = usePersonFinderSmallItem(entry);
    const { tags } = usePersonFinder();

    const isSelected = tags && tags.map((tag) => tag.id).includes(id);

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isSelected) {
            onRemove(id);
        } else {
            onAdd(id);
        }
    };

    return (
        <StyledPersonFinderSmallItem onClick={handleClick} $isSelected={isSelected}>
            {title}
        </StyledPersonFinderSmallItem>
    );
};

PersonFinderSmallItem.displayName = 'PersonFinderSmallItem';

export default PersonFinderSmallItem;
