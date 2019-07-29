import normalizeOutputType from './normalizeOutputType';
import { LOCATION_RELATION, PERSON_RELATION } from '../constants/relationTypes';

export default function normalizeOutput(type, value) {
    const normalizedType = normalizeOutputType(type);

    if (normalizedType === PERSON_RELATION) {
        return {
            type: PERSON_RELATION,
            name: value.name,
            firstName: value.firstName,
            lastName: value.lastName,
            personId: value.personId,
            userId: value.userId,
            isFriend: value.isFriend,
        };
    }

    return {
        type: LOCATION_RELATION,
        name: value.name,
        siteId: value.siteId,
        locationId: value.locationId,
    };
}
