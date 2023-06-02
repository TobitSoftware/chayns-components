import React, { FC, useCallback, useMemo } from 'react';
import type { ISearchBoxItem } from '../types';
import { StyledSearchBoxItem, StyledSearchBoxItemText } from './SearchBoxItem.styles';

export type SearchBoxItemProps = {
    onSelect: (item: ISearchBoxItem) => void;
    id: ISearchBoxItem['id'];
    text: ISearchBoxItem['text'];
};

const SearchBoxItem: FC<SearchBoxItemProps> = ({ id, text, onSelect }) => {
    const handleClick = useCallback(() => {
        onSelect({ id, text });
    }, [id, onSelect, text]);

    return useMemo(
        () => (
            <StyledSearchBoxItem onClick={handleClick}>
                <StyledSearchBoxItemText>{text}</StyledSearchBoxItemText>
            </StyledSearchBoxItem>
        ),
        [handleClick, text]
    );
};

SearchBoxItem.displayName = 'SearchBoxItem';

export default SearchBoxItem;
