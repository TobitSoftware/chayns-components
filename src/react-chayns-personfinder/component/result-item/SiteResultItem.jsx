import React from 'react';
import PropTypes from 'prop-types';
import getRelationImage from '../../utils/selectors/getRelationImage';
import getRelationName from '../../utils/selectors/getRelationName';
import Identifier from './Identifier';
import {
    LOCATION_RELATION,
    LOCATION_UNRELATED,
} from '../../constants/relationTypes';

const SiteResultItem = ({ onClick, type, relation }) => (
    <div className="result-item" onClick={onClick}>
        <div className="img" style={{ backgroundImage: `url(${getRelationImage(type, relation)})` }} />
        <div className="text">
            <div
                className="title"
            >
                <div className="name">{getRelationName(type, relation)}</div>
            </div>
            <Identifier type={type} relation={relation} />
        </div>
    </div>
);

SiteResultItem.propTypes = {
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
    type: PropTypes.oneOf([LOCATION_RELATION, LOCATION_UNRELATED]).isRequired,

};

export default SiteResultItem;
