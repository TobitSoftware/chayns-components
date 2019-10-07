import { LOCATION_RELATION } from '../../constants/relationTypes';

export default function getRelationName(type, relation) {
    return type === LOCATION_RELATION ? relation.name : `${relation.firstName} ${relation.lastName}`;
}
