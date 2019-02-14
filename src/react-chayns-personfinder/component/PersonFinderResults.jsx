import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { PERSON_RELATION, SITE_RELATION } from '../constants/relationTypes';
import findRelations from '../utils/findRelations';

export default class PersonFinderResults extends Component {
    static propTypes = {
        take: PropTypes.number,
    };

    static defaultProps = {
        take: 20,
    };

    state = {
        value: null,
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

    componentDidUpdate(prevProps) {
        const { value } = this.props;
        const { value: stateValue } = this.state;

        if (stateValue !== value) {
            this.setValue(value);
        }
    }

    setValue(value) {
        this.setState({
            value,
        });

        this.fetchData(value, false);
    }

    async fetchData(value, clear = true) {
        if (clear) {
            this.skip[SITE_RELATION] = 0;
            this.skip[PERSON_RELATION] = 0;
        }

        const { person, site } = this.props;

        const promises = [];

        if (person) {
            promises.push(this.fetchPersonRelations(value));
        }

        if (site) {
            promises.push(this.fetchSiteRelations(value));
        }

        console.log(await Promise.all(promises));
    }

    async fetchRelations(type, value) {
        const { take } = this.props;

        if (this.promises[type]) {
            this.promises[type].cancel();
        }

        return findRelations(type, value, this.skip[type], take);
    }

    render() {
        return (
            <div className="cc__person-finder__results">
                {'Test'}
            </div>
        );
    }
}
