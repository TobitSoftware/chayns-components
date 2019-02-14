import { PERSON_RELATION, SITE_RELATION } from '../constants/relationTypes';
import { fetchPersonRelations, fetchSiteRelations } from './fetchRelations';
import processRelations from './processRelations';

export default async function findRelations(type, value, skip, take) {
    if (type === PERSON_RELATION) {
        const relationsRaw = await fetchPersonRelations(value, skip, take);

        return processRelations(PERSON_RELATION, relationsRaw);
    }

    if (type === SITE_RELATION) {
        const relationsRaw = await fetchSiteRelations(value, skip, take);

        return processRelations(SITE_RELATION, relationsRaw);
    }

    return { related: [], unrelated: [] };
}
