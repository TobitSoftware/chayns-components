import {
    PersonEntry,
    PersonFinderData,
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
    data: { [key: string]: PersonFinderData } = {},
    keys: PersonFinderFilterTypes[] = [],
): { [key: string]: PersonFinderData } => {
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
        {} as { [key: string]: PersonFinderData },
    );
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const destructureData = (
    data: Record<string, PersonFinderData> | undefined,
    filterType: string,
) => {
    return {
        count: data?.[filterType]?.count ?? 0,
        skip: data?.[filterType]?.skip ?? 0,
        searchString: data?.[filterType]?.searchString ?? '',
        entries: data?.[filterType]?.entries ?? [],
    };
};

interface LoadDataOptions {
    skip: number;
}

export const loadData = async ({ skip }: LoadDataOptions): Promise<PersonFinderData> => {
    // ToDo load data
};
