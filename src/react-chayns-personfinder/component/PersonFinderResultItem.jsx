/* eslint-disable jsx-a11y/alt-text */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getText from '../utils/getText';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';

const SHOW_RELATIONS_COUNT = 5;

export default class PersonFinderResultItem extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        relation: PropTypes.shape({
            name: PropTypes.string.isRequired,
            relationCount: PropTypes.number,
            relations: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            siteId: PropTypes.string,
            locationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            personId: PropTypes.string,
            userId: PropTypes.string,
        }).isRequired,
        type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION]).isRequired,
    };

    static getRelations(data, type) {
        if (!data) {
            return null;
        }

        const { length } = data;
        const show = Math.min(length, SHOW_RELATIONS_COUNT);
        let relationString = '';

        for (let i = 0; i < show; i += 1) {
            if (type === PERSON_RELATION) {
                relationString += data[i].type === 'LIVING_IN' ? `${getText(data[i].type, data[i].name)}, ` : `${data[i].name}, `;
            } else {
                relationString += `${getText(data[i].type)}, `;
            }
        }
        relationString = relationString.slice(0, -2);

        return relationString;
    }

    static getFurtherRelations(relation) {
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

    static convertRelation(type, relation) {
        if (type === LOCATION_RELATION) {
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

        if (type === PERSON_RELATION) {
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

    renderSubtitle(relationString, furtherRelationsString) {
        const {
            relation,
            type,
        } = this.props;

        if (!relationString) {
            return (
                <div className="identifier">
                    {type === PERSON_RELATION ? relation.personId : relation.siteId}
                </div>
            );
        }

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
    }

    render() {
        const {
            relation,
            type,
        } = this.props;

        const convertedRelation = PersonFinderResultItem.convertRelation(type, relation);

        const relationString = PersonFinderResultItem.getRelations(convertedRelation.relations, type);
        const furtherRelationsString = PersonFinderResultItem.getFurtherRelations(convertedRelation);

        return (
            <div className="result-item" onClick={this.handleClick}>
                <div className="img" style={{ backgroundImage: `url(${convertedRelation.image})` }} />
                <div className="text">
                    <div
                        className="title"
                    >
                        <div className="name">{convertedRelation.name}</div>
                        {relationString && (
                            <div className="identifier">
                                {`(${type === PERSON_RELATION ? convertedRelation.personId : convertedRelation.siteId})`}
                            </div>
                        )}
                    </div>
                    {this.renderSubtitle(relationString, furtherRelationsString)}
                </div>
            </div>
        );
    }
}
