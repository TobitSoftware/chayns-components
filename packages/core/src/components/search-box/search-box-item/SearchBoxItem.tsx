import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import type { ISearchBoxItem } from '../../../types/searchBox';
import {
    StyledSearchBoxItem,
    StyledSearchBoxItemImage,
    StyledSearchBoxItemText,
} from './SearchBoxItem.styles';

export type SearchBoxItemProps = {
    onSelect: (
        item: ISearchBoxItem & { plainText: string; shouldUseInputValueAsId?: boolean },
    ) => void;
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
    const handleClick = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            onSelect({ id, imageUrl, plainText: text, text });
        },
        [onSelect, id, text, imageUrl],
    );

    return useMemo(
        () => (
            <StyledSearchBoxItem data-finder-selectable="true" onClick={handleClick} tabIndex={-1}>
                {imageUrl && (
                    <StyledSearchBoxItemImage
                        src={imageUrl}
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                <StyledSearchBoxItemText dangerouslySetInnerHTML={{ __html: text }} />
            </StyledSearchBoxItem>
        ),
        [handleClick, imageUrl, shouldShowRoundImage, text],
    );
};

SearchBoxItem.displayName = 'SearchBoxItem';

export default SearchBoxItem;
