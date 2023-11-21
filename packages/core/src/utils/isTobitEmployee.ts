import { UacServiceClient } from '@chayns/uac-service';
import { getAccessToken, getSite, getUser } from 'chayns-api';

const client = new UacServiceClient({
    getToken: async () => (await getAccessToken()).accessToken || '',
    getDefaultSiteId: () => getSite().id,
    getDefaultPersonId: () => getUser()?.personId || '',
});

export const isTobitEmployee = async () => {
    console.log('client', client);
    const siteInfos = await client.getMembershipSites({ groupId: 8255 });

    console.log('siteInfos', siteInfos);

    let isEmployee = false;

    siteInfos.forEach(({ siteId }) => {
        isEmployee = siteId === '60038-22141';

        console.log('siteId', siteId);
    });

    console.log('isEmployee', isEmployee);

    return isEmployee;
};
