import {
    FRIEND_RELATION,
    LOCATION_RELATION,
    PERSON_RELATION,
    PERSON_UNRELATED,
} from '../constants/relationTypes';

export default function normalizeOutputType(type) {
    if (type === PERSON_RELATION || type === PERSON_UNRELATED || type === FRIEND_RELATION) {
        return PERSON_RELATION;
    }

    return LOCATION_RELATION;
}
