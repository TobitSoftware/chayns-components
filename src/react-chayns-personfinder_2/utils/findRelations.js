import { PERSON_RELATION, SITE_RELATION } from '../constants/relationTypes';
import { fetchPersonRelations } from './fetchRelations';
import processRelations from './processRelations';

export default async function findRelations(type, value, skip, take) {
    if (type === PERSON_RELATION) {
        const relationsRaw = await fetchPersonRelations(value, skip, take);

        return processRelations(PERSON_RELATION, relationsRaw);
    }

    if (type === SITE_RELATION) {
        const sites = await chayns.findSite(value);

        if (sites.Value && sites.Value.length) {
            return {
                unrelated: [],
                related: sites.Value.map(({ appstoreName, ...s }) => ({
                    name: appstoreName,
                    ...s
                })),
            };
        }
    }

    return { related: [], unrelated: [] };
}
