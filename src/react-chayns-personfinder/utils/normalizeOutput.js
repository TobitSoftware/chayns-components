import {
    FRIEND_RELATION,
    LOCATION_RELATION,
    PERSON_RELATION,
    PERSON_UNRELATED,
} from '../constants/relationTypes';

export default function normalizeOutput(type, value) {
    const newType = (type === PERSON_RELATION || type === PERSON_UNRELATED || type === FRIEND_RELATION) ? PERSON_RELATION : LOCATION_RELATION;

    return {
        type: newType,
        name: value.name,
        firstName: value.firstName,
        lastName: value.lastName,
        personId: value.personId,
        userId: value.userId,
        siteId: value.siteId,
        locationId: value.locationId,
        isFriend: value.isFriend,
    };
}
