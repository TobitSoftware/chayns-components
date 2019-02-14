import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { PERSON_RELATION, SITE_RELATION } from '../constants/relationTypes';
import findRelations from '../utils/findRelations';
import PersonFinderResultItem from './PersonFinderResultItem';
import makeCancelable from '../utils/makeCancelable';

export default class PersonFinderResults extends Component {
    static propTypes = {
        take: PropTypes.number,
        persons: PropTypes.bool,
        sites: PropTypes.bool,
    };

    static defaultProps = {
        take: 20,
        persons: true,
        sites: true,
    };

    state = {
        value: null,
        persons: { related: [], unrelated: [] },
        sites: { related: [], unrelated: [] },
    };

    promises = {
        [PERSON_RELATION]: null,
        [SITE_RELATION]: null,
    };

    skip = {
        [PERSON_RELATION]: 0,
        [SITE_RELATION]: 0,
    };

    constructor(props) {
        super(props);

        this.setValue = debounce(this.setValue.bind(this), 500);
        this.fetchPersonRelations = this.fetchRelations.bind(this, PERSON_RELATION);
        this.fetchSiteRelations = this.fetchRelations.bind(this, SITE_RELATION);
    }

    componentDidUpdate() {
        const { value } = this.props;
        const { value: stateValue } = this.state;

        if (stateValue !== value) {
            this.setValue(value);
        }
    }

    onClick(value) {
        console.log(value);
    }

    setValue(value) {
        this.setState({
            value,
        });

        this.fetchData(value);
    }

    async fetchData(value, clear = true) {
        if (clear) {
            this.skip[SITE_RELATION] = 0;
            this.skip[PERSON_RELATION] = 0;
        }

        const { persons: enablePersons, sites: enableSites } = this.props;

        const promises = [];

        promises.push(enablePersons ? this.fetchPersonRelations(value) : Promise.resolve(false));
        promises.push(enableSites ? this.fetchSiteRelations(value) : Promise.resolve(false));

        try {
            const [personResults, siteResults] = await Promise.all(promises);

            const { persons: personsState, sites: sitesState } = this.state;

            const persons = clear ? { related: [], unrelated: [] } : personsState;
            const sites = clear ? { related: [], unrelated: [] } : sitesState;

            if (personResults) {
                this.skip[PERSON_RELATION] += (personResults.related.length + personResults.unrelated.length);

                persons.related.push(...personResults.related);
                persons.unrelated.push(...personResults.unrelated);
            }

            if (siteResults) {
                console.log(siteResults);
                this.skip[SITE_RELATION] += (siteResults.related.length + siteResults.unrelated.length);

                sites.related.push(...siteResults.related);
                sites.unrelated.push(...siteResults.unrelated);
            }

            this.setState({
                persons,
                sites,
            });
        } catch (ex) {
            if (!ex || !ex.isCanceled) {
                throw ex;
            }
        }
    }

    async fetchRelations(type, value) {
        const { take } = this.props;

        if (this.promises[type]) {
            this.promises[type].cancel();
        }

        this.promises[type] = makeCancelable(findRelations(type, value, this.skip[type], take));

        return this.promises[type].promise;
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
                type={SITE_RELATION}
                onClick={this.onClick}
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
                onClick={this.onClick}
            />
        ));
    }

    render() {
        const { persons, sites } = this.state;

        const relatedPersons = this.renderPersons(persons.related);
        const relatedSites = this.renderSites(sites.related);
        const unrelatedPersons = this.renderPersons(persons.unrelated);
        const unrelatedSites = this.renderSites(sites.unrelated);

        if (!relatedPersons && !relatedSites && !unrelatedPersons && !unrelatedSites) {
            return null;
        }

        return (
            <div className="cc__person-finder__results">
                {relatedPersons}
                {relatedSites}
                {unrelatedPersons}
                {unrelatedSites}
            </div>
        );
    }
}
