import {
    PersonEntry,
    PersonFinderData,
    PersonFinderDataMap,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    SiteEntry,
} from '../types/personFinder';
import { getPersons } from '../api/person/get';
import { getSites } from '../api/site/get';
import { convertPersonEntry, convertSiteEntry } from './convert';
import { getUser } from 'chayns-api';

export const getGroupName = (key: string) => {
    const names: { [key: string]: string } = {
        person: 'Personen',
        site: 'Sites',
    };

    return names[key];
};

export const isSiteEntry = (entry: PersonEntry | SiteEntry): entry is SiteEntry =>
    'name' in entry && !('firstName' in entry);

interface FilterDataByKeysOptions {
    excludedEntryIds?: PersonFinderEntry['id'][];
    shouldShowOwnUser?: boolean;
}

export const filterDataByKeys = (
    data: { [key: string]: PersonFinderData } = {},
    keys: PersonFinderFilterTypes[] = [],
    options: FilterDataByKeysOptions = {},
): { [key: string]: PersonFinderData } => {
    const filterSingle = (entry: PersonFinderData): PersonFinderData => {
        let filteredEntries = entry.entries;

        const { excludedEntryIds } = options;

        if (Array.isArray(excludedEntryIds) && excludedEntryIds.length > 0) {
            filteredEntries = filteredEntries.filter((e) => !excludedEntryIds.includes(e.id));
        }

        const excludedCount = entry.entries.length - filteredEntries.length;

        return {
            ...entry,
            entries: filteredEntries,
            count: Math.max(0, entry.count - excludedCount),
        };
    };

    const relevantKeys = keys.length > 0 ? keys : Object.keys(data);

    return relevantKeys.reduce((acc, key) => {
        const original = data[key] ?? { searchString: '', count: 0, skip: 0, entries: [] };

        const filteredEntry = filterSingle(original);

        if (options.shouldShowOwnUser && key === PersonFinderFilterTypes.PERSON) {
            const user = getUser();

            if (typeof user?.personId === 'string') {
                // Ensure that the own user is always included in the person filter
                const ownUserEntry: PersonEntry = {
                    commonSites: 0,
                    firstName: user.firstName ?? '',
                    id: user.personId,
                    isVerified: false,
                    lastName: user.lastName ?? '',
                    type: PersonFinderFilterTypes.PERSON,
                };

                const fullName = `${ownUserEntry.firstName} ${ownUserEntry.lastName}`.trim();

                if (
                    original.searchString.length < 3 ||
                    fullName.toLowerCase().includes(original.searchString.toLowerCase())
                ) {
                    filteredEntry.entries = [ownUserEntry, ...filteredEntry.entries];
                    filteredEntry.count += 1; // Increment count to account for the own user
                }
            }
        }

        return { ...acc, [key]: filteredEntry };
    }, {});
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
            if (searchString.length <= 2) {
                return {
                    key: PersonFinderFilterTypes.PERSON,
                    value: {
                        searchString,
                        count: 0,
                        skip: 0,
                        entries: [],
                    },
                };
            }

            const data = await getPersons({ search: searchString, skip });

            return {
                key: PersonFinderFilterTypes.PERSON,
                value: {
                    searchString,
                    count: data?.count ?? 0,
                    skip: skip + (data?.list?.length ?? 0),
                    entries: convertPersonEntry(data?.list ?? []),
                },
            };
        }

        if (filterType === PersonFinderFilterTypes.SITE) {
            if (searchString.length <= 2) {
                return {
                    key: PersonFinderFilterTypes.SITE,
                    value: {
                        searchString,
                        count: 0,
                        skip: 0,
                        entries: [],
                    },
                };
            }

            const data = await getSites({ search: searchString, skip });

            return {
                key: PersonFinderFilterTypes.SITE,
                value: {
                    searchString,
                    count: data?.count ?? 0,
                    skip: skip + (data?.list?.length ?? 0),
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
