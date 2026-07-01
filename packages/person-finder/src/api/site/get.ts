import { getAccessToken } from 'chayns-api';
import { SiteEntryResult } from '../../types/personFinder';
import { QA_RELATIONS_BASE_URL, RELATIONS_BASE_URL } from '../../constants/url';

interface GetSiteResult {
    count: number;
    list: SiteEntryResult[];
}

interface GetSitesOptions {
    search: string;
    skip: number;
    take?: number;
    shouldUseQa: boolean;
}

export const getSites = async ({ search, skip, take = 20, shouldUseQa }: GetSitesOptions) => {
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

    const url = `${shouldUseQa ? QA_RELATIONS_BASE_URL : RELATIONS_BASE_URL}location/?query=##search##&skip=##skip##&take=##take##&includeDomains=true`;

    const response = await fetch(
        url
            .replace('##search##', search)
            .replace('##skip##', skip.toString())
            .replace('##take##', take?.toString()),
        requestInit,
    );

    if (response.status === 200) {
        return (await response.json()) as GetSiteResult;
    }

    return undefined;
};
