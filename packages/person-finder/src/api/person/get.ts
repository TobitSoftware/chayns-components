import { getAccessToken } from 'chayns-api';
import { PersonEntryResult } from '../../components/person-finder/PersonFinder.types';

const URL =
    'https://relations.chayns.net/relations/v2/person?skip=##skip##&take=##take##&query=##search##';

interface GetPersonResult {
    list: PersonEntryResult[];
    count: number;
}

interface GetPersonsOptions {
    search: string;
    skip: number;
    take?: number;
}

export const getPersons = async ({ search, skip, take = 20 }: GetPersonsOptions) => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return undefined;
    }

    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
    };

    const response = await fetch(
        URL.replace('##search##', search)
            .replace('##skip##', skip.toString())
            .replace('##take##', take?.toString()),
        requestInit,
    );

    if (response.status === 200) {
        return (await response.json()) as GetPersonResult;
    }

    return undefined;
};
