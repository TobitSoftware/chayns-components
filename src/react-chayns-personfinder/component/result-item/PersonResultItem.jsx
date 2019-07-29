import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import getRelationImage from '../../utils/selectors/getRelationImage';
import getRelationName from '../../utils/selectors/getRelationName';
import Identifier from './Identifier';
import Relation from './Relation';
import {
    FRIEND_RELATION,
    PERSON_RELATION,
    PERSON_UNRELATED,
} from '../../constants/relationTypes';
import FriendsContext from '../data/friends/FriendsContext';

function hasRelations(data) {
    return !!(data && data.length > 0);
}

const PersonResultItem = ({ relation, onClick, type }) => {
    const { isFriend } = useContext(FriendsContext);
    const handleClick = useCallback(() => {
        const additions = {
            isFriend: type === FRIEND_RELATION || !!isFriend(relation.personId),
        };

        onClick(additions);
    }, [onClick, relation, type, isFriend]);

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

PersonResultItem.propTypes = {
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
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf([PERSON_RELATION, PERSON_UNRELATED, FRIEND_RELATION]).isRequired,
};

export default PersonResultItem;
