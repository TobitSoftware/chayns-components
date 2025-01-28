import React, { FC, useCallback, useMemo } from 'react';
import type { ISearchBoxItem, ISearchBoxItems } from '../../../types/searchBox';
import {
    StyledSearchBoxItem,
    StyledSearchBoxItemImage,
    StyledSearchBoxItemText,
} from './SearchBoxItem.styles';

export type SearchBoxItemProps = {
    onSelect: (item: ISearchBoxItem, groupName?: ISearchBoxItems['groupName']) => void;
    id: ISearchBoxItem['id'];
    text: ISearchBoxItem['text'];
    imageUrl?: ISearchBoxItem['imageUrl'];
    shouldShowRoundImage?: boolean;
    groupName?: ISearchBoxItems['groupName'];
};

const SearchBoxItem: FC<SearchBoxItemProps> = ({
    id,
    text,
    imageUrl,
    shouldShowRoundImage,
    onSelect,
    groupName,
}) => {
    const handleClick = useCallback(() => {
        onSelect({ id, text, imageUrl }, groupName);
    }, [onSelect, id, text, imageUrl, groupName]);

    let idString = `search-box-item__${id}`;

    if (groupName) {
        idString = `_${groupName}`;
    }

    return useMemo(
        () => (
            <StyledSearchBoxItem id={idString} onClick={handleClick}>
                {imageUrl && (
                    <StyledSearchBoxItemImage
                        src={imageUrl}
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                <StyledSearchBoxItemText dangerouslySetInnerHTML={{ __html: text }} />
            </StyledSearchBoxItem>
        ),
        [handleClick, idString, imageUrl, shouldShowRoundImage, text],
    );
};

SearchBoxItem.displayName = 'SearchBoxItem';

export default SearchBoxItem;
