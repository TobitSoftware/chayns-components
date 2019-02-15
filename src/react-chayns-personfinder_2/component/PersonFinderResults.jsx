import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import PersonFinderResultItem from './PersonFinderResultItem';
import getText from '../utils/getText';
import Divider from './Divider';

export default class PersonFinderResults extends PureComponent {
    static propTypes = {
        persons: PropTypes.object,
        sites: PropTypes.object,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        persons: { related: [], unrelated: [] },
        sites: { related: [], unrelated: [] },
        onSelect: null,
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        const { onSelect } = this.props;

        if (onSelect) {
            onSelect(value.type, value.relation);
        }
    }

    renderSites(relations) {
        if (relations.length === 0) {
            return null;
        }

        return relations.map(relation => (
            <PersonFinderResultItem
                key={relation.siteId}
                relation={{
                    siteId: relation.siteId,
                    locationId: relation.locationId,
                    score: relation.score,
                    name: relation.name,
                    relations: relation.relations,
                    image: `https://sub60.tobit.com/l/${relation.siteId}?size=40`,
                }}
                type={LOCATION_RELATION}
                onClick={this.handleClick}
            />
        ));
    }

    renderPersons(relations) {
        if (relations.length === 0) {
            return null;
        }

        return relations.map(relation => (
            <PersonFinderResultItem
                key={relation.personId}
                relation={{
                    personId: relation.personId,
                    userId: relation.userId,
                    name: `${relation.firstName} ${relation.lastName}`,
                    firstName: relation.firstName,
                    lastName: relation.lastName,
                    score: relation.score,
                    image: `https://sub60.tobit.com/u/${relation.personId}?size=40`,
                    relations: relation.relations,
                }}
                type={PERSON_RELATION}
                onClick={this.handleClick}
            />
        ));
    }

    render() {
        const { persons, sites } = this.props;

        const relatedPersons = this.renderPersons(persons.related);
        const relatedSites = this.renderSites(sites.related);
        const unrelatedPersons = this.renderPersons(persons.unrelated);
        const unrelatedSites = this.renderSites(sites.unrelated);

        return (
            <div className="cc__person-finder__results">
                {relatedPersons}
                {relatedSites}
                {unrelatedPersons && unrelatedPersons.length > 0 && (
                    <Divider
                        name={getText('DIVIDER_PERSON')}
                    />
                )}
                {unrelatedPersons}
                {unrelatedSites && unrelatedSites.length > 0 && (
                    <Divider
                        name={getText('DIVIDER_SITE')}
                    />
                )}
                {unrelatedSites}
            </div>
        );
    }
}
