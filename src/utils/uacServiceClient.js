import { UacServiceClient } from '@chayns/uac-service';

export default new UacServiceClient({
    getToken: () => chayns.env.user.tobitAccessToken || '',
    getDefaultSiteId: () => chayns.env.site.id || '',
    getDefaultPersonId: () => chayns.env.user.personId || '',
});
