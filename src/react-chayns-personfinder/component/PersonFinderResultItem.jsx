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
import PersonResultItem from './result-item/PersonResultItem';
import SiteResultItem from './result-item/SiteResultItem';

const PersonFinderResultItem = ({ onClick, relation, type }) => {
    const handleClick = useCallback((additions) => {
        const newRelation = { ...relation, ...additions };

        onClick({
            type,
            relation: newRelation,
        });
    }, [onClick, type, relation]);

    if (type === LOCATION_RELATION || type === LOCATION_UNRELATED) {
        return (
            <SiteResultItem
                type={type}
                onClick={handleClick}
                relation={relation}
            />
        );
    }

    return (
        <PersonResultItem
            type={type}
            onClick={handleClick}
            relation={relation}
        />
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
