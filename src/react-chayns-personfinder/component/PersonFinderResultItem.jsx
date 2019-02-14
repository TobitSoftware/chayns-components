import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getText from '../utils/getText';
import { PERSON_RELATION } from '../constants/relationTypes';

const SHOW_RELATIONS_COUNT = 5;

export default class PersonFinderResultItem extends Component {
    static propTypes = {};

    static getRelations(data, type) {
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

    static getFurtherRelations(data) {
        const { length } = data;
        const show = Math.min(length, SHOW_RELATIONS_COUNT);

        if (length - show <= 0) {
            return '';
        }

        return ` +${String((length - show) || 0)}`;
    }

    render() {
        const {
            relation,
            type,
        } = this.props;

        const relationString = PersonFinderResultItem.getRelations(relation.relations, type);
        const furtherRelationsString = PersonFinderResultItem.getFurtherRelations(relation.relations);

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
                        <div className="identifier">
                            {`(${type === PERSON_RELATION ? relation.personId : relation.siteId})`}
                        </div>
                    </div>
                    <span className="relation">
                        {relationString}
                        <span style={{ fontWeight: 'bold' }}>
                            {furtherRelationsString}
                        </span>
                    </span>
                </div>
            </div>
        );
    }
}
