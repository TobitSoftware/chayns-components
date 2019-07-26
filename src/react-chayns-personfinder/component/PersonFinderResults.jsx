import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    PERSON_RELATION,
    LOCATION_RELATION,
    FRIEND_RELATION,
    PERSON_UNRELATED,
} from '../constants/relationTypes';
import PersonFinderResultItem from './PersonFinderResultItem';
import getText from '../utils/getText';
import Divider from './Divider';
import ResultItemList from './ResultItemList';

export default class PersonFinderResults extends PureComponent {
    static propTypes = {
        persons: PropTypes.object,
        sites: PropTypes.object,
        onSelect: PropTypes.func,
        showSeparators: PropTypes.bool,
        onLoadMore: PropTypes.func.isRequired,
        moreRelatedSites: PropTypes.bool,
        moreRelatedPersons: PropTypes.bool,
        moreUnrelatedPersons: PropTypes.bool,
        showWaitCursor: PropTypes.bool,
        showFriends: PropTypes.bool,
    };

    static defaultProps = {
        persons: { related: [], unrelated: [], friends: [] },
        sites: { related: [], unrelated: [] },
        onSelect: null,
        showSeparators: false,
        moreRelatedSites: false,
        moreRelatedPersons: false,
        moreUnrelatedPersons: false,
        showWaitCursor: false,
        showFriends: false,
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

    renderResults(relations, type) {
        if (!relations || relations.length === 0) {
            return null;
        }

        return relations.map(relation => (
            <PersonFinderResultItem
                key={relation.personId || relation.siteId}
                relation={relation}
                type={type}
                onClick={this.handleClick}
            />
        ));
    }

    renderRelated(type, children, hasMore) {
        const { showSeparators, onLoadMore, showWaitCursor } = this.props;

        return (
            <ResultItemList
                type={type}
                hasMore={hasMore}
                showSeparators={showSeparators}
                onLoadMore={onLoadMore}
                showWaitCursor={showWaitCursor}
            >
                {children}
            </ResultItemList>
        );
    }

    render() {
        const {
            persons,
            sites,
            moreRelatedPersons,
            moreRelatedSites,
            moreUnrelatedPersons,
            showFriends,
        } = this.props;

        const friends = showFriends ? this.renderResults(persons.friends, FRIEND_RELATION) : null;
        const relatedPersons = this.renderResults(persons.related, PERSON_RELATION);
        const relatedSites = this.renderResults(sites.related, LOCATION_RELATION);
        const unrelatedPersons = this.renderResults(persons.unrelated, PERSON_RELATION);
        const unrelatedSites = this.renderResults(sites.unrelated, LOCATION_RELATION);

        return (
            <div className="cc__person-finder__results">
                {friends ? this.renderRelated(FRIEND_RELATION, friends) : null}
                {this.renderRelated(PERSON_RELATION, relatedPersons, moreRelatedPersons)}
                {this.renderRelated(LOCATION_RELATION, relatedSites, moreRelatedSites)}
                {this.renderRelated(PERSON_UNRELATED, unrelatedPersons, moreUnrelatedPersons)}
                {unrelatedSites && unrelatedSites.length > 0 && (
                    <Divider
                        key="unrelated-sites"
                        name={getText('DIVIDER_MORE_SITE')}
                    />
                )}
                {unrelatedSites}
            </div>
        );
    }
}
