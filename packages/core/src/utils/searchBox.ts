import type { ISearchBoxItem } from '../types/searchBox';

const surroundWithBTag = (text: string, startIndex: number, length: number) => {
    const before = text.substring(0, startIndex);
    const highlighted = text.substring(startIndex, startIndex + length);
    const after = text.substring(startIndex + length);

    return `${before}<b>${highlighted}</b>${after}`;
};

interface SearchListOptions {
    items: ISearchBoxItem[];
    searchString: string;
}

export const searchList = ({ searchString, items }: SearchListOptions) => {
    const matchingItems: ISearchBoxItem[] = [];

    const lowercaseSearchString = searchString.toLowerCase();

    items.forEach((item) => {
        const lowercaseText = item.text.toLowerCase();

        if (lowercaseText.includes(lowercaseSearchString)) {
            if (searchString === '') {
                matchingItems.push(item);
            } else {
                const startIndex = lowercaseText.indexOf(lowercaseSearchString);
                const highlightedText = surroundWithBTag(
                    item.text,
                    startIndex,
                    searchString.length,
                );
                matchingItems.push({ ...item, text: highlightedText });
            }
        }
    });

    matchingItems.sort((a, b) => {
        const aStartsWithSearchString = a.text.toLowerCase().startsWith(lowercaseSearchString);
        const bStartsWithSearchString = b.text.toLowerCase().startsWith(lowercaseSearchString);

        if (aStartsWithSearchString && !bStartsWithSearchString) {
            return -1;
        }
        if (!aStartsWithSearchString && bStartsWithSearchString) {
            return 1;
        }
        return a.text.localeCompare(b.text);
    });

    return matchingItems;
};
