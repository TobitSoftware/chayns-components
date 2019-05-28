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
        const response = await fetch(`https://chayns2.tobit.com/SiteSearchApi/location/search/${value}/?skip=${skip}&take=${take}`, { method: 'GET' });
        const sites = await response.json();

        if (sites && sites.length) {
            return {
                unrelated: [],
                related: sites.map(({ locationName, ...s }) => ({
                    name: locationName,
                    ...s,
                })),
            };
        }
    }

    return { related: [], unrelated: [] };
}
