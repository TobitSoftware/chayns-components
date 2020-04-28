import React from 'react';
import PropTypes from 'prop-types';
import getText from '../../utils/getText';

const SHOW_RELATIONS_COUNT = 5;

const getRelations = (data) => {
    if (!data) return '';

    return data
        .slice(0, SHOW_RELATIONS_COUNT)
        .map(({ name, type }) => (type === 'LIVING_IN' ? `${getText(type, name)}` : name))
        .join(', ');
};

const getFurtherRelations = (relation) => {
    if (!relation || !relation.relations) return null;

    const further = relation.relationCount - SHOW_RELATIONS_COUNT;
    return further > 0 ? ` +${String(further)}` : '';
};

const Relation = ({ relation }) => {
    const relationString = getRelations(relation.relations);
    const furtherRelationsString = getFurtherRelations(relation);

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
    // eslint-disable-next-line react/forbid-prop-types
    relation: PropTypes.object.isRequired,
};

Relation.displayName = 'Relation';

export default Relation;
