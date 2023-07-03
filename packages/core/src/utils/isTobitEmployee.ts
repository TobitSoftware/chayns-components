import { UacServiceClient } from '@chayns/uac-service';

export const isTobitEmployee = () => {
    const client = new UacServiceClient({
        getToken: async () => chayns.env.user.tobitAccessToken || '',
        getDefaultSiteId: () => chayns.env.site.id,
        getDefaultPersonId: () => chayns.env.user.personId || '',
    });

    console.log(
        client.isUserInGroup({
            personId: chayns.env.user.personId,
            siteId: chayns.env.site.id,
            groupId: 8255,
        })
    );
};
