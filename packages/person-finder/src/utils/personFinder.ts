import {
    PersonEntry,
    PersonFinderData,
    PersonFinderDataMap,
    PersonFinderFilterTypes,
    SiteEntry,
} from '../types/personFinder';
import { getPersons } from '../api/person/get';
import { getSites } from '../api/site/get';
import { convertPersonEntry, convertSiteEntry } from './convert';

export const getGroupName = (key: string) => {
    const names: { [key: string]: string } = {
        person: 'Personen',
        site: 'Sites',
    };

    return names[key];
};

export const isSiteEntry = (entry: PersonEntry | SiteEntry): entry is SiteEntry =>
    'name' in entry && !('firstName' in entry);

export const filterDataByKeys = (
    data: { [key: string]: PersonFinderData } = {},
    keys: PersonFinderFilterTypes[] = [],
): { [key: string]: PersonFinderData } => {
    if (keys.length === 0) {
        return data;
    }

    return keys.reduce(
        (acc, key) => ({
            ...acc,
            [key]: data[key] ?? { searchString: '', count: 0, skip: 0, entries: [] },
        }),
        {},
    );
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const destructureData = (
    data: Record<string, PersonFinderData> | undefined,
    filterType: string,
) => ({
    count: data?.[filterType]?.count ?? 0,
    skip: data?.[filterType]?.skip ?? 0,
    searchString: data?.[filterType]?.searchString ?? '',
    entries: data?.[filterType]?.entries ?? [],
});

interface LoadDataOptions {
    searchString: string;
    filter: PersonFinderFilterTypes[];
    skipMap: Partial<Record<PersonFinderFilterTypes, number>>;
}

export const loadData = async ({
    skipMap,
    searchString,
    filter,
}: LoadDataOptions): Promise<PersonFinderDataMap> => {
    const promises = filter.map(async (filterType) => {
        const skip = skipMap[filterType] ?? 0;

        if (filterType === PersonFinderFilterTypes.PERSON) {
            const data = await getPersons({ search: searchString, skip });

            return {
                key: PersonFinderFilterTypes.PERSON,
                value: {
                    searchString,
                    count: data?.count ?? 0,
                    skip: data?.list?.length ?? skip,
                    entries: convertPersonEntry(data?.list ?? []),
                },
            };
        }

        if (filterType === PersonFinderFilterTypes.SITE) {
            const data = await getSites({ search: searchString, skip });

            return {
                key: PersonFinderFilterTypes.SITE,
                value: {
                    searchString,
                    count: data?.count ?? 0,
                    skip: data?.list?.length ?? skip,
                    entries: convertSiteEntry(data?.list ?? []),
                },
            };
        }

        return null;
    });

    const results = await Promise.all(promises);

    return results.reduce<PersonFinderDataMap>((acc, item) => {
        if (!item) return acc;

        return {
            ...acc,
            [item.key]: item.value,
        };
    }, {});
};
