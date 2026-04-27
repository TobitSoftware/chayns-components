import React, { FC, useCallback } from 'react';
import {
    CommunicationListProps,
    DisplayItem,
    DisplayItemType,
    SortType,
} from './CommunicationList.types';
import {
    StyledCommunicationList,
    StyledCommunicationListMessage,
} from './CommunicationList.styles';
import { Skeleton } from '@chayns-components/core';
import ListHeading from './list-heading/ListHeading';
import { useDisplayedItems } from './CommunicationList.hooks';
import { Virtuoso } from 'react-virtuoso';

const CommunicationList: FC<CommunicationListProps> = ({
    items,
    itemRenderer,
    sortType = SortType.DATE,
    onLoadMore,
    emptyMessage,
    isLoading = false,
}) => {
    const displayedItems = useDisplayedItems({ items, isLoading, sortType });

    const internalItemRenderer = useCallback(
        (index: number, item: DisplayItem) => {
            const { type, id } = item;

            if (type === DisplayItemType.SKELETON_ITEM) {
                return <Skeleton.ListItem key={index} />;
            }

            if (type === DisplayItemType.SKELETON_HEADING) {
                return (
                    <Skeleton.Box
                        key={index}
                        height={20}
                        width={60}
                        style={{ margin: `${index !== 0 ? '22px' : '0'} 8px 4px` }}
                    />
                );
            }

            if (type === DisplayItemType.HEADING) {
                return <ListHeading key={index} label={id} shouldAddTopMargin={index !== 0} />;
            }

            return itemRenderer(index, id);
        },
        [itemRenderer],
    );

    if (!isLoading && items.length === 0) {
        return (
            <StyledCommunicationList>
                <StyledCommunicationListMessage>{emptyMessage}</StyledCommunicationListMessage>
            </StyledCommunicationList>
        );
    }

    return (
        <StyledCommunicationList>
            <Virtuoso
                style={{ width: '100%', overflowX: 'hidden' }}
                className="chayns-scrollbar"
                totalCount={displayedItems.length}
                endReached={onLoadMore}
                increaseViewportBy={20}
                defaultItemHeight={64}
                data={displayedItems}
                itemContent={internalItemRenderer}
            />
        </StyledCommunicationList>
    );
};

CommunicationList.displayName = 'CommunicationList';

export default CommunicationList;
