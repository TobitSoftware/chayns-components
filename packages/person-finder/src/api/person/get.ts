import { getAccessToken } from 'chayns-api';
import { PersonEntryResult, RelationMode } from '../../types/personFinder';
import { QA_RELATIONS_BASE_URL, RELATIONS_BASE_URL } from '../../constants/url';

interface GetPersonResult {
    list: PersonEntryResult[];
    count: number;
}

interface GetPersonsOptions {
    search: string;
    skip: number;
    take?: number;
    relationMode?: RelationMode;
    shouldUseQa: boolean;
}

export const getPersons = async ({
    search,
    skip,
    take = 20,
    relationMode = RelationMode.PERSON,
    shouldUseQa,
}: GetPersonsOptions) => {
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

    const url = `${shouldUseQa ? QA_RELATIONS_BASE_URL : RELATIONS_BASE_URL}v2/person?skip=##skip##&take=##take##&query=##search##&scoreForSite=##scoreForSite##`;

    const response = await fetch(
        url
            .replace('##search##', search)
            .replace('##skip##', skip.toString())
            .replace('##take##', take?.toString())
            .replace('##scoreForSite##', relationMode === RelationMode.SITE ? '1' : '0'),
        requestInit,
    );

    if (response.status === 200) {
        return (await response.json()) as GetPersonResult;
    }

    return undefined;
};
