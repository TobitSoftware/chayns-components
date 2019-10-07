import React from 'react';
import PropTypes from 'prop-types';
import {
    FRIEND_RELATION,
    LOCATION_RELATION,
    LOCATION_UNRELATED,
    PERSON_RELATION,
    PERSON_UNRELATED,
} from '../../constants/relationTypes';

const Identifier = ({ type, relation }) => (
    <div className="identifier">
        {`(${type === PERSON_RELATION || type === PERSON_UNRELATED || type === FRIEND_RELATION ? relation.personId : relation.siteId})`}
    </div>
);

Identifier.propTypes = {
    type: PropTypes.oneOf([PERSON_RELATION, PERSON_UNRELATED, LOCATION_RELATION, LOCATION_UNRELATED, FRIEND_RELATION]).isRequired,
    relation: PropTypes.object.isRequired,
};

export default Identifier;
