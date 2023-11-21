import { UacServiceClient } from '@chayns/uac-service';
import { getAccessToken, getSite, getUser } from 'chayns-api';

const client = new UacServiceClient({
    getToken: async () => (await getAccessToken()).accessToken || '',
    getDefaultSiteId: () => getSite().id,
    getDefaultPersonId: () => getUser()?.personId || '',
});

export const isTobitEmployee = async () => {
    const siteInfos = await client.getMembershipSites({ groupId: 8255 });

    let isEmployee = false;

    siteInfos.forEach(({ siteId }) => {
        isEmployee = siteId === '60038-22141';
    });

    return isEmployee;
};
