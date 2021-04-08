import React from 'react';
import PropTypes from 'prop-types';
import getText from '../../utils/getText';

const Relation = ({ relation }) => {
    if (relation.relationCount) {
        const text = getText(
            relation.relationCount === 1 ? 'COMMON_SITE' : 'COMMON_SITES'
        );
        return (
            <span className='relation'>
                {`${relation.relationCount} ${text}`}
            </span>
        );
    }

    return null;
};

Relation.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    relation: PropTypes.object.isRequired
};

Relation.displayName = 'Relation';

export default Relation;
