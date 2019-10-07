import { LOCATION_RELATION } from '../../constants/relationTypes';

export default function getRelationImage(type, relation) {
    return type === LOCATION_RELATION ? `https://sub60.tobit.com/l/${relation.siteId}?size=40` : `https://sub60.tobit.com/u/${relation.personId}?size=40`;
}
