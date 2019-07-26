import React from 'react';
import PropTypes from 'prop-types';
import { FRIEND_RELATION, LOCATION_RELATION, PERSON_RELATION } from '../../constants/relationTypes';

const Identifier = ({ type, relation }) => (
    <div className="identifier">
        {`(${type === PERSON_RELATION || type === FRIEND_RELATION ? relation.personId : relation.siteId})`}
    </div>
);

Identifier.propTypes = {
    type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION, FRIEND_RELATION]).isRequired,
    relation: PropTypes.object.isRequired,
};

export default Identifier;
