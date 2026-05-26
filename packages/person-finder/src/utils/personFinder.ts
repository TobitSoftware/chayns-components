import {
    PersonEntry,
    PersonFinderData,
    PersonFinderDataMap,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    RelationMode,
    SiteEntry,
} from '../types/personFinder';
import { getTextstringValue, ttsToITextString } from '@chayns-components/textstring';
import { getPersons } from '../api/person/get';
import { getSites } from '../api/site/get';
import { convertPersonEntry, convertSiteEntry } from './convert';
import { getUser } from 'chayns-api';
import textStrings, { PERSON_FINDER_TEXTSTRING_LIBRARY_NAME } from '../constants/textStrings';

interface GetPersonFinderTextstringValueOptions {
    textstring: {
        stringName: string;
        fallback: string;
    };
    replacements?: Record<string, number | string | undefined>;
}

const normalizeTextstringReplacements = (
    replacements?: GetPersonFinderTextstringValueOptions['replacements'],
) => {
    if (!replacements) {
        return undefined;
    }

    return Object.entries(replacements).reduce<Record<string, string>>((acc, [key, value]) => {
        acc[`##${key}##`] = value?.toString() ?? '';

        return acc;
    }, {});
};

export const getPersonFinderTextstringValue = ({
    textstring,
    replacements,
}: GetPersonFinderTextstringValueOptions) =>
    getTextstringValue({
        libraryName: PERSON_FINDER_TEXTSTRING_LIBRARY_NAME,
        textstring: ttsToITextString(textstring),
        replacements: normalizeTextstringReplacements(replacements),
    });

export const getGroupName = (key: string) => {
    const groupNames: Partial<
        Record<PersonFinderFilterTypes, { stringName: string; fallback: string }>
    > = {
        [PersonFinderFilterTypes.PERSON]: textStrings.components.personFinder.groupName.person,
        [PersonFinderFilterTypes.SITE]: textStrings.components.personFinder.groupName.site,
        [PersonFinderFilterTypes.UAC]: textStrings.components.personFinder.groupName.uac,
    };

    const textstring = groupNames[key as PersonFinderFilterTypes];

    if (!textstring) {
        return key;
    }

    return getPersonFinderTextstringValue({ textstring });
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

                const fullName = [ownUserEntry.firstName, ownUserEntry.lastName]
                    .filter(Boolean)
                    .join(' ')
                    .trim();

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
    relationMode?: RelationMode;
}

export const loadData = async ({
    skipMap,
    searchString,
    filter,
    relationMode,
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

            const data = await getPersons({ search: searchString, skip, relationMode });

            return {
                key: PersonFinderFilterTypes.PERSON,
                value: {
                    searchString,
                    count: data?.count ?? 0,
                    skip: skip + (data?.list?.length ?? 0),
                    entries: convertPersonEntry(data?.list ?? [], {
                        shouldShowLastOnlineTime: relationMode === RelationMode.SITE,
                    }),
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

            const filteredList = data?.list.filter(({ siteId }) => siteId !== null);

            return {
                key: PersonFinderFilterTypes.SITE,
                value: {
                    searchString,
                    count: data?.count ?? 0,
                    skip: skip + (filteredList?.length ?? 0),
                    entries: convertSiteEntry(filteredList ?? []),
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

export const formatLastOnline = (date: Date): string => {
    const ts = textStrings.components.personFinder.lastOnline;
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const isSameDay =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    const time = date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    });

    if (minutes < 5) {
        return getPersonFinderTextstringValue({ textstring: ts.fewMinutes });
    }

    if (minutes < 60) {
        return getPersonFinderTextstringValue({
            textstring: ts.minutes,
            replacements: { minutes },
        });
    }

    if (hours < 24 && isSameDay) {
        return getPersonFinderTextstringValue({
            textstring: ts.today,
            replacements: { time },
        });
    }

    if (isYesterday) {
        return getPersonFinderTextstringValue({
            textstring: ts.yesterday,
            replacements: { time },
        });
    }

    if (days < 30) {
        return getPersonFinderTextstringValue({
            textstring: ts.days,
            replacements: { days },
        });
    }

    if (months < 12) {
        return getPersonFinderTextstringValue({
            textstring: ts.months,
            replacements: { months },
        });
    }

    return getPersonFinderTextstringValue({
        textstring: ts.years,
        replacements: { years },
    });
};
