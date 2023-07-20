/* eslint-disable import/prefer-default-export,no-console */

import uacServiceClient from '../../../../utils/uacServiceClient';

export const fetchGroups = async () => {
    const response = await uacServiceClient
        .getUserGroups({
            countUsers: false,
            withMeta: true,
        })
        .catch((error) => {
            console.error(
                '[chayns components] Personfinder: uacServiceClient.getUserGroups failed',
                error
            );
            return [];
        });

    return response.map((group) => ({
        id: group.id,
        name: group.showName,
        locationId: chayns.env.site.locationId,
        tappId: group.pageId || 0,
        pageId: group.pageId || 0,
        showName: group.showName,
        description: group.description,
        isSystemGroup: !!group.isSystemGroup,
    }));
};
