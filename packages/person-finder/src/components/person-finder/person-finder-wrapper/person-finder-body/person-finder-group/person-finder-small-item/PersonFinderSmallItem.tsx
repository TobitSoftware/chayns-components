import { useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';
import React, { FC, KeyboardEvent, MouseEvent, useRef } from 'react';
import { PersonFinderEntry } from '../../../../../../types/personFinder';
import { usePersonFinderSmallItem } from '../../../../../../hooks/personFinder';
import { usePersonFinder } from '../../../../../PersonFinderProvider';
import { StyledPersonFinderSmallItem } from './PersonFinderSmallItem.styles';

export type PersonFinderSmallItemProps = {
    entry: PersonFinderEntry;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    shouldEnableKeyboardHighlighting?: boolean;
};

const PersonFinderSmallItem: FC<PersonFinderSmallItemProps> = ({
    entry,
    onAdd,
    onRemove,
    shouldEnableKeyboardHighlighting,
}) => {
    const { id: entryId } = entry;

    const id = typeof entryId === 'string' ? entryId : entryId.toString();

    const { title } = usePersonFinderSmallItem(entry);
    const { tags } = usePersonFinder();

    const isSelected = tags && tags.map((tag) => tag.id).includes(id);
    const itemRef = useRef<HTMLDivElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );
    useFocusRingPortal(itemRef, { isEnabled: shouldShowKeyboardHighlighting });

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
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick(event as unknown as MouseEvent);
        }
    };

    return (
        <StyledPersonFinderSmallItem
            data-person-finder-result
            ref={itemRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            $isSelected={isSelected}
            role="button"
            tabIndex={0}
        >
            {title}
        </StyledPersonFinderSmallItem>
    );
};

PersonFinderSmallItem.displayName = 'PersonFinderSmallItem';

export default PersonFinderSmallItem;
