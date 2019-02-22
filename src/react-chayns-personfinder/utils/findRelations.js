import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import { fetchPersonRelations } from './fetchRelations';
import processRelations from './processRelations';

const MIN_FETCH_LENGTH = 3;

export default async function findRelations(type, value, skip, take) {
    if (value && value.length < MIN_FETCH_LENGTH) {
        return { related: [], unrelated: [] };
    }

    if (type === PERSON_RELATION) {
        const relationsRaw = await fetchPersonRelations(value, skip, take);

        return processRelations(PERSON_RELATION, relationsRaw);
    }

    if (type === LOCATION_RELATION) {
        const sites = await chayns.findSite(value, skip, take);

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
