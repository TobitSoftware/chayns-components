import React from 'react';
import PropTypes from 'prop-types';
import {
    FRIEND_RELATION,
    LOCATION_RELATION,
    LOCATION_UNRELATED,
    PERSON_RELATION,
    PERSON_UNRELATED
} from '../../constants/relationTypes';
import getText from '../../utils/getText';

const SHOW_RELATIONS_COUNT = 5;

function getRelations(data, type) {
    if (!data) {
        return null;
    }

    const { length } = data;
    const show = Math.min(length, SHOW_RELATIONS_COUNT);
    let relationString = '';

    for (let i = 0; i < show; i += 1) {
        if (type === PERSON_RELATION || type === PERSON_UNRELATED || type === FRIEND_RELATION) {
            relationString += data[i].type === 'LIVING_IN' ? `${getText(data[i].type, data[i].name)}, ` : `${data[i].name}, `;
        } else {
            relationString += `${getText(data[i].type)}, `;
        }
    }
    relationString = relationString.slice(0, -2);

    return relationString;
}

function getFurtherRelations(relation) {
    if (!relation || !relation.relations) {
        return null;
    }

    const { length } = relation.relations;
    const furtherRelationCount = Math.max(relation.relationCount - SHOW_RELATIONS_COUNT, length - SHOW_RELATIONS_COUNT, 0) || 0;

    if (furtherRelationCount <= 0) {
        return '';
    }

    return ` +${String((furtherRelationCount) || 0)}`;
}

function convertRelation(type, relation) {
    if (type === LOCATION_RELATION || type === LOCATION_UNRELATED) {
        return {
            siteId: relation.siteId,
            locationId: relation.locationId,
            score: relation.score,
            name: relation.name,
            relations: relation && relation.relations ? relation.relations : [],
            relationCount: relation.relationCount,
            image: `https://sub60.tobit.com/l/${relation.siteId}?size=40`,
        };
    }

    if (type === PERSON_RELATION || type === PERSON_UNRELATED || type === FRIEND_RELATION) {
        return {
            personId: relation.personId,
            userId: relation.userId,
            name: `${relation.firstName} ${relation.lastName}`,
            firstName: relation.firstName,
            lastName: relation.lastName,
            score: relation.score,
            relationCount: relation.relationCount,
            image: `https://sub60.tobit.com/u/${relation.personId}?size=40`,
            relations: relation.relations,
        };
    }

    return null;
}

const Relation = ({ type, relation }) => {
    const convertedRelation = convertRelation(type, relation);
    const relationString = getRelations(convertedRelation.relations, type);
    const furtherRelationsString = getFurtherRelations(convertedRelation);

    return (
        <span className="relation">
            {relationString}
            {furtherRelationsString && (
                <span style={{ fontWeight: 'bold' }}>
                    {furtherRelationsString}
                </span>
            )}
        </span>
    );
};

Relation.propTypes = {
    type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION, FRIEND_RELATION]).isRequired,
    relation: PropTypes.object.isRequired,
};

export default Relation;
