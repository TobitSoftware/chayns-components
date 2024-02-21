import React, { FC, useCallback, useMemo } from 'react';
import type { ISearchBoxItem } from '../../../types/searchBox';
import {
    StyledSearchBoxItem,
    StyledSearchBoxItemImage,
    StyledSearchBoxItemText,
} from './SearchBoxItem.styles';

export type SearchBoxItemProps = {
    onSelect: (item: ISearchBoxItem) => void;
    id: ISearchBoxItem['id'];
    text: ISearchBoxItem['text'];
    imageUrl?: ISearchBoxItem['imageUrl'];
    shouldShowRoundImage?: boolean;
};

const SearchBoxItem: FC<SearchBoxItemProps> = ({
    id,
    text,
    imageUrl,
    shouldShowRoundImage,
    onSelect,
}) => {
    const handleClick = useCallback(() => {
        onSelect({ id, text });
    }, [id, onSelect, text]);

    return useMemo(
        () => (
            <StyledSearchBoxItem id={`search-box-item__${id}`} onClick={handleClick}>
                {imageUrl && (
                    <StyledSearchBoxItemImage
                        src={imageUrl}
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                <StyledSearchBoxItemText>{text}</StyledSearchBoxItemText>
            </StyledSearchBoxItem>
        ),
        [handleClick, id, imageUrl, shouldShowRoundImage, text],
    );
};

SearchBoxItem.displayName = 'SearchBoxItem';

export default SearchBoxItem;
