import { getAccessToken, getLanguage, getSite, getUser } from 'chayns-api';
import { UacServiceClient } from '@chayns/uac-service';
import { UACEntry } from '../types/personFinder';

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
