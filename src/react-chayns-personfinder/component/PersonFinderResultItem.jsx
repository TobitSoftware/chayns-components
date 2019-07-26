/* eslint-disable jsx-a11y/alt-text */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getText from '../utils/getText';
import { PERSON_RELATION, LOCATION_RELATION, FRIEND_RELATION } from '../constants/relationTypes';
import Identifier from './result-item/Identifier';
import Relation from './result-item/Relation';

function getRelationName(type, relation) {
    return type === LOCATION_RELATION ? relation.name : `${relation.firstName} ${relation.lastName}`;
}

function getRelationUrl(type, relation) {
    return type === LOCATION_RELATION ? `https://sub60.tobit.com/l/${relation.siteId}?size=40` : `https://sub60.tobit.com/u/${relation.personId}?size=40`;
}

export default class PersonFinderResultItem extends PureComponent {
    static propTypes = {
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
        type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION, FRIEND_RELATION]).isRequired,
    };

    static hasRelations(data) {
        return !!(data && data.length > 0);
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { onClick, relation, type } = this.props;

        onClick({
            type,
            relation,
        });
    }

    render() {
        const {
            relation,
            type,
        } = this.props;

        const hasRelations = PersonFinderResultItem.hasRelations(relation && relation.relations ? relation.relations : []);

        return (
            <div className="result-item" onClick={this.handleClick}>
                <div className="img" style={{ backgroundImage: `url(${getRelationUrl(type, relation)})` }} />
                <div className="text">
                    <div
                        className="title"
                    >
                        <div className="name">{getRelationName(type, relation)}</div>
                        {hasRelations && (
                            <Identifier type={type} relation={relation} />
                        )}
                    </div>
                    {hasRelations ? (
                        <Relation type={type} relation={relation} />
                    ) : (
                        <Identifier type={type} relation={relation} />
                    )}
                </div>
            </div>
        );
    }
}
