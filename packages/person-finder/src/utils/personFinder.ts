import {
    PersonEntry,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    SiteEntry,
} from '../types/personFinder';

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
    data: { [key: string]: PersonFinderEntry[] } = {},
    keys: PersonFinderFilterTypes[] = [],
): { [key: string]: PersonFinderEntry[] } => {
    if (keys.length === 0) {
        return data;
    }

    return keys.reduce(
        (acc, key) => {
            if (data[key]) {
                acc[key] = data[key];
            }
            return acc;
        },
        {} as { [key: string]: PersonFinderEntry[] },
    );
};
