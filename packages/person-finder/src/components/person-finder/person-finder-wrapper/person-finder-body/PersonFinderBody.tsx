import React, { FC, useMemo } from 'react';
import {
    StyledMotionPersonFinderBody,
    StyledPersonFinderBodyHeader,
} from './PersonFinderBody.styles';
import { PersonFinderFilterTypes } from '../../../../types/personFinder';
import { FilterButtons, FilterButtonSize, List } from '@chayns-components/core';
import { usePersonFinder } from '../../../PersonFinderProvider';
import { IFilterButtonItem } from '@chayns-components/core/lib/types/types/filterButtons';
import PersonFinderItem from './person-finder-item/PersonFinderItem';

export type PersonFinderBodyProps = {
    onBlur?: () => void;
    width: number;
    filterTypes?: PersonFinderFilterTypes[];
};

const PersonFinderBody: FC<PersonFinderBodyProps> = ({ onBlur, filterTypes, width }) => {
    const { activeFilter, updateActiveFilter } = usePersonFinder();

    const handleFilterSelect = (keys: string[]) => {
        if (typeof updateActiveFilter === 'function') {
            updateActiveFilter(keys as PersonFinderFilterTypes[]);
        }
    };

    const filter: IFilterButtonItem[] = Object.values(filterTypes ?? {}).map((type) => ({
        id: type,
        text: type.replace(/_/g, ' '),
    }));

    const content = useMemo(() => {
        const test = 'TEST';
        return (
            <List>
                <PersonFinderItem />
            </List>
        );
    }, []);

    return (
        <StyledMotionPersonFinderBody onBlur={onBlur} $width={width}>
            <StyledPersonFinderBodyHeader>
                <FilterButtons
                    size={FilterButtonSize.Small}
                    items={filter}
                    onSelect={handleFilterSelect}
                    selectedItemIds={activeFilter}
                />
            </StyledPersonFinderBodyHeader>
            {content}
        </StyledMotionPersonFinderBody>
    );
};

PersonFinderBody.displayName = 'PersonFinderBody';

export default PersonFinderBody;
