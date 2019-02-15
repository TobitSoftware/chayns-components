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
            relationCount: PropTypes.number.isRequired,
            relations: PropTypes.string.isRequired,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            siteId: PropTypes.string,
            locationId: PropTypes.string,
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
            if(type === PERSON_RELATION) {
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

        const relationString = PersonFinderResultItem.getRelations(relation.relations, type);
        const furtherRelationsString = PersonFinderResultItem.getFurtherRelations(relation);

        return(
            <div className="result-item" onClick={this.handleClick}>
                <div className="img">
                    <img src={relation.image}/>
                </div>
                <div className="text">
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}
                    >
                        <div className="name">{relation.name}</div>
                        {relationString && (
                            <div className="identifier">
                                {`(${type === PERSON_RELATION ? relation.personId : relation.siteId})`}
                            </div>
                        )}
                    </div>
                    {!relationString && (
                        <div className="identifier">
                            {type === PERSON_RELATION ? relation.personId : relation.siteId}
                        </div>
                    )}
                    {relationString && (
                        <span className="relation">
                            {relationString}
                            {furtherRelationsString && (
                                <span style={{ fontWeight: 'bold' }}>
                                    {furtherRelationsString}
                                </span>
                            )}
                        </span>
                    )}
                </div>
            </div>
        );
    }
}
