import { getAccessToken, getLanguage, getSite, getUser } from 'chayns-api';
import { UacServiceClient } from '@chayns/uac-service';
import { PersonEntry, PersonFinderFilterTypes, UACEntry, UACFilter } from '../types/personFinder';

export const client = new UacServiceClient({
    getToken: async () => (await getAccessToken()).accessToken || '',
    getDefaultSiteId: () => getSite().id,
    getDefaultPersonId: () => getUser()?.personId || '',
    getLanguage: () => getLanguage().active,
});

export const getUACGroups = async (): Promise<UACEntry[]> => {
    const result = await client.getUserGroups({ countUsers: true });

    return result.map(({ id, showName, isSystemGroup }) => ({
        id,
        name: showName,
        isSystemGroup,
    }));
};

export const getUsersByGroups = async (uacFilter: UACFilter[]): Promise<PersonEntry[]> => {
    const groupResults = await Promise.all(
        uacFilter.map(async ({ groupId }) => {
            const users = await client.getGroupMembers({
                groupId,
                siteId: getSite().id,
            });

            return users.map(({ personId, firstname, lastname }) => ({
                id: personId,
                firstName: firstname,
                lastName: lastname,
                type: PersonFinderFilterTypes.PERSON,
                commonSites: 0,
                isVerified: false,
            })) as PersonEntry[];
        }),
    );

    const unique = groupResults
        .flat()
        .reduce<Map<string, PersonEntry>>((map, user) => map.set(user.id, user), new Map());

    return [...(unique.values() as unknown as PersonEntry[])];
};
