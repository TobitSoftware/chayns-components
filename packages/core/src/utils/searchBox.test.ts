import { describe, expect, it } from 'vitest';
import type { ISearchBoxItem } from '../types/searchBox';
import { filterSearchBoxItems } from '../components/search-box/SearchBox';
import { getSearchBoxItemId, searchList } from './searchBox';

const items: ISearchBoxItem[] = [
    { id: '2', text: 'Zweite' },
    { id: '1', text: 'Erste' },
];

describe('searchList', () => {
    it('uses the custom sort function instead of the default sort', () => {
        const result = searchList({
            customSortFunction: (a, b) => b.id.localeCompare(a.id),
            items,
            searchString: '',
        });

        expect(result.map(({ id }) => id)).toEqual(['2', '1']);
    });

    it('still filters before applying the custom sort function', () => {
        const result = searchList({
            customSortFunction: (a, b) => a.id.localeCompare(b.id),
            items,
            searchString: 'e',
        });

        expect(result.map(({ id }) => id)).toEqual(['1', '2']);
    });

    it('uses only the custom filter when shouldUseCustomFilterOnly is enabled', () => {
        const values: string[] = [];
        const result = filterSearchBoxItems({
            customFilter: ({ id }, value) => {
                values.push(value);
                return id === '2';
            },
            customSortFunction: (a, b) => a.id.localeCompare(b.id),
            items,
            searchString: 'does-not-match',
            shouldUseCustomFilterOnly: true,
        });

        expect(result.map(({ id }) => id)).toEqual(['2']);
        expect(values).toEqual(['does-not-match', 'does-not-match']);
    });
});

describe('getSearchBoxItemId', () => {
    it('uses the item ID instead of the group-specific DOM ID', () => {
        const element = document.createElement('div');
        element.id = '_Food';
        element.dataset.searchBoxItemId = 'pizza';

        expect(getSearchBoxItemId(element)).toBe('pizza');
    });

    it('uses the legacy DOM ID when no item ID is available', () => {
        const element = document.createElement('div');
        element.id = 'search-box-item__pizza';

        expect(getSearchBoxItemId(element)).toBe('pizza');
    });
});
