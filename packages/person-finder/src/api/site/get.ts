import { getAccessToken } from 'chayns-api';
import { SiteEntryResult } from '../../types/personFinder';

const URL =
    'https://relations.chayns.net/relations/location/?query=##search##&skip=##skip##&take=##take##&includeDomains=true';

interface GetSiteResult {
    count: number;
    list: SiteEntryResult[];
}

interface GetSitesOptions {
    search: string;
    skip: number;
    take?: number;
}

export const getSites = async ({ search, skip, take = 20 }: GetSitesOptions) => {
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
        return (await response.json()) as GetSiteResult;
    }

    return undefined;
};
