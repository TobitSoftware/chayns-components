/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
    PERSON_RELATION,
    LOCATION_RELATION,
    FRIEND_RELATION,
    PERSON_UNRELATED,
    LOCATION_UNRELATED,
} from '../constants/relationTypes';
import Identifier from './result-item/Identifier';
import Relation from './result-item/Relation';
import getRelationName from '../utils/selectors/getRelationName';
import getRelationImage from '../utils/selectors/getRelationImage';

function hasRelations(data) {
    return !!(data && data.length > 0);
}

function getOutputType(type) {
    if (type === PERSON_RELATION || type === PERSON_UNRELATED || type === FRIEND_RELATION) {
        return PERSON_RELATION;
    }

    return LOCATION_RELATION;
}

const PersonFinderResultItem = ({ onClick, relation, type }) => {
    const handleClick = useCallback(() => {
        const newType = getOutputType(type);
        const newRelation = { ...relation };

        if (newType === PERSON_RELATION) {
            if (type === FRIEND_RELATION) {
                newRelation.isFriend = true;
            } else {
                newRelation.isFriend = false;
            }
        }

        onClick({
            type: newType,
            relation: newRelation,
        });
    }, [onClick, type, relation]);

    const hRelations = hasRelations(relation && relation.relations ? relation.relations : []);

    return (
        <div className="result-item" onClick={handleClick}>
            <div className="img" style={{ backgroundImage: `url(${getRelationImage(type, relation)})` }} />
            <div className="text">
                <div
                    className="title"
                >
                    <div className="name">{getRelationName(type, relation)}</div>
                    {hRelations && (
                        <Identifier type={type} relation={relation} />
                    )}
                </div>
                {hRelations && (
                    <Relation type={type} relation={relation} />
                )}
                {!hRelations && (
                    <Identifier type={type} relation={relation} />
                )}
            </div>
        </div>
    );
};

PersonFinderResultItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    relation: PropTypes.shape({
        name: PropTypes.string,
        relationCount: PropTypes.number,
        relations: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            score: PropTypes.number,
        })),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        siteId: PropTypes.string,
        locationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        personId: PropTypes.string,
        userId: PropTypes.number,
    }).isRequired,
    type: PropTypes.oneOf([PERSON_RELATION, PERSON_UNRELATED, LOCATION_RELATION, LOCATION_UNRELATED, FRIEND_RELATION]).isRequired,
};

export default PersonFinderResultItem;
