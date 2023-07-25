import { UacServiceClient } from '@chayns/uac-service';

const client = new UacServiceClient({
    // ToDo replace with new api function if new api is ready
    // eslint-disable-next-line @typescript-eslint/require-await
    getToken: async () => chayns.env.user.tobitAccessToken || '',
    getDefaultSiteId: () => chayns.env.site.id,
    getDefaultPersonId: () => chayns.env.user.personId || '',
});

export const isTobitEmployee = async () => {
    const siteInfos = await client.getMembershipSites({ groupId: 8255 });

    let isEmployee = false;

    siteInfos.forEach(({ siteId }) => {
        isEmployee = siteId === '60038-22141';
    });

    return isEmployee;
};
