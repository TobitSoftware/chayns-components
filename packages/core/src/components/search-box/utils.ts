import type { ISearchBoxItem } from './types';

interface SearchListOptions {
    items: ISearchBoxItem[];
    searchString: string;
}

export const searchList = ({ searchString, items }: SearchListOptions) => {
    const matchingItems: ISearchBoxItem[] = [];

    const lowercaseSearchString = searchString.toLowerCase();

    items.forEach((item) => {
        const lowercaseText = item.text.toLowerCase();

        // console.log(item, lowercaseText.includes(lowercaseSearchString));

        if (lowercaseText.includes(lowercaseSearchString)) {
            matchingItems.push(item);
        }
    });

    return matchingItems;
};
