import {
    CommunicationListProps,
    DisplayItem,
    DisplayItemType,
    SortType,
} from './CommunicationList.types';
import { getFixedT } from '@chayns/textstrings';
import textStrings from '../../constants/textStrings';

const LOADING_ITEMS: DisplayItem[] = [
    { id: 'loading-skeleton--1', type: DisplayItemType.SKELETON_ITEM },
    { id: 'loading-skeleton--2', type: DisplayItemType.SKELETON_ITEM },
    { id: 'loading-skeleton--3', type: DisplayItemType.SKELETON_ITEM },
    { id: 'loading-skeleton--4', type: DisplayItemType.SKELETON_ITEM },
    { id: 'loading-skeleton--5', type: DisplayItemType.SKELETON_ITEM },
];

const INITIAL_ITEMS: DisplayItem[] = [
    { id: 'loading-skeleton--0', type: DisplayItemType.SKELETON_HEADING },
    ...LOADING_ITEMS,
];

interface UseDisplayedItemsOptions {
    items: CommunicationListProps['items'];
    isLoading?: CommunicationListProps['isLoading'];
    sortType: SortType;
}

type CommunicationListItem = CommunicationListProps['items'][number];

const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
});

const getStartOfDay = (date: Date): Date => {
    const result = new Date(date);

    result.setHours(0, 0, 0, 0);

    return result;
};

const getDateGroupLabel = (date: Date): string => {
    const today = getStartOfDay(new Date());
    const itemDate = getStartOfDay(date);

    const diffInMs = today.getTime() - itemDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return getFixedT(textStrings.communicationList.sort.today);
    }

    if (diffInDays === 1) {
        return getFixedT(textStrings.communicationList.sort.yesterday);
    }

    if (diffInDays < 7) {
        return getFixedT(textStrings.communicationList.sort.older);
    }

    return new Intl.DateTimeFormat(undefined, {
        month: 'long',
        year: today.getFullYear() === itemDate.getFullYear() ? undefined : 'numeric',
    }).format(itemDate);
};

const sortAlphabetically = (items: CommunicationListItem[]): CommunicationListItem[] =>
    [...items].sort((a, b) => collator.compare(a.sortKey, b.sortKey));

const sortByDateDesc = (items: CommunicationListItem[]): CommunicationListItem[] =>
    [...items].sort((a, b) => {
        const dateA = new Date(a.sortKey).getTime();
        const dateB = new Date(b.sortKey).getTime();

        return dateB - dateA;
    });

const groupItems = (
    items: CommunicationListItem[],
    getHeadingId: (item: CommunicationListItem) => string,
): DisplayItem[] => {
    const displayedItems: DisplayItem[] = [];
    let currentHeadingId: string | undefined;

    items.forEach((item) => {
        const headingId = getHeadingId(item);

        if (headingId !== currentHeadingId) {
            displayedItems.push({
                id: headingId,
                type: DisplayItemType.HEADING,
            });

            currentHeadingId = headingId;
        }

        displayedItems.push({
            id: item.id,
            type: DisplayItemType.ITEM,
        });
    });

    return displayedItems;
};

const getDisplayedItemsBySortType = (
    items: CommunicationListItem[],
    sortType: SortType,
): DisplayItem[] => {
    switch (sortType) {
        case SortType.ALPHABETIC: {
            const sortedItems = sortAlphabetically(items);

            return groupItems(sortedItems, (item) => item.sortKey.charAt(0).toUpperCase());
        }

        case SortType.DATE: {
            const sortedItems = sortByDateDesc(items);

            return groupItems(sortedItems, (item) => getDateGroupLabel(new Date(item.sortKey)));
        }

        default:
            return items.map((item) => ({
                id: item.id,
                type: DisplayItemType.ITEM,
            }));
    }
};

export const useDisplayedItems = ({
    items,
    isLoading,
    sortType,
}: UseDisplayedItemsOptions): DisplayItem[] => {
    if (items.length === 0 && isLoading) {
        return INITIAL_ITEMS;
    }

    const displayedItems = getDisplayedItemsBySortType(items, sortType);

    if (isLoading) {
        return [...displayedItems, ...LOADING_ITEMS];
    }

    return displayedItems;
};
