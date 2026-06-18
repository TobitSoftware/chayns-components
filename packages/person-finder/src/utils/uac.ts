import { getAccessToken, getLanguage, getSite, getUser } from 'chayns-api';
import { UacServiceClient } from '@chayns/uac-service';
import { PersonEntry, PersonFinderFilterTypes, UACEntry, UACFilter } from '../types/personFinder';

interface GetUsersByGroupsOptions {
    skip?: number;
    take?: number;
}

interface GetUsersByGroupsResult {
    users: PersonEntry[];
    count: number;
}

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

export const getUsersByGroups = async (
    uacFilter: UACFilter[],
    options: GetUsersByGroupsOptions = {},
): Promise<GetUsersByGroupsResult> => {
    const siteId = getSite().id;
    const { skip, take } = options;

    const groupResults = await Promise.all(
        uacFilter.map(async ({ groupId }) => {
            const users = await client.getGroupMembers({
                groupId,
                siteId,
                skip,
                take,
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

    let count = unique.size;

    const firstFilter = uacFilter[0];

    if (firstFilter && (skip !== undefined || take !== undefined) && uacFilter.length === 1) {
        const group = await client.getUserGroup({
            groupId: firstFilter.groupId,
            siteId,
            countUsers: true,
        });

        count = group.userCount ?? unique.size;
    }

    return {
        users: [...(unique.values() as unknown as PersonEntry[])],
        count,
    };
};
