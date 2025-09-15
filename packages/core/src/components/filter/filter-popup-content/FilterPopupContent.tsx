import React, { FC, useMemo } from 'react';
import {
    StyledFilterPopupContent,
    StyledFilterPopupContentItem,
    StyledFilterPopupContentItemState,
    StyledFilterPopupContentItemText,
} from './FilterPopupContent.styles';
import Icon from '../../icon/Icon';
import { SortConfig } from '../../../types/filter';

export type FilterPopupContentProps = {
    sortConfig: SortConfig;
};

const FilterPopupContent: FC<FilterPopupContentProps> = ({ sortConfig }) => {
    const { onSortChange, items, selectedItem } = sortConfig;

    return useMemo(
        () => (
            <StyledFilterPopupContent>
                {items.map(({ id, text }) => (
                    <StyledFilterPopupContentItem
                        key={`filter-sort-item--${id}`}
                        onClick={() => onSortChange({ id, text })}
                    >
                        <StyledFilterPopupContentItemState>
                            {id === selectedItem.id && <Icon icons={['fas fa-circle-small']} />}
                        </StyledFilterPopupContentItemState>
                        <StyledFilterPopupContentItemText>{text}</StyledFilterPopupContentItemText>
                    </StyledFilterPopupContentItem>
                ))}
            </StyledFilterPopupContent>
        ),
        [items, onSortChange, selectedItem.id],
    );
};

FilterPopupContent.displayName = 'FilterPopupContent';

export default FilterPopupContent;
