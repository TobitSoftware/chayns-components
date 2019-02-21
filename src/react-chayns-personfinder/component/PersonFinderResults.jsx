import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import PersonFinderResultItem from './PersonFinderResultItem';
import getText from '../utils/getText';
import Divider from './Divider';
import LoadMore from './LoadMore';
import WaitCursor from './WaitCursor';

const PERSON_UNRELATED = 'PERSON_UNRELATED';

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
    };

    static defaultProps = {
        persons: { related: [], unrelated: [] },
        sites: { related: [], unrelated: [] },
        onSelect: null,
        showSeparators: false,
        moreRelatedSites: false,
        moreRelatedPersons: false,
        moreUnrelatedPersons: false,
        showWaitCursor: false,
    };

    static getDividerText(type) {
        switch (type) {
            case PERSON_RELATION:
                return getText('DIVIDER_PERSON');
            case PERSON_UNRELATED:
                return getText('DIVIDER_MORE_PERSON');
            case LOCATION_RELATION:
                return getText('DIVIDER_SITE');
            default:
                return null;
        }
    }

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
        if (relations.length === 0) {
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

        const retVal = [];

        if (!children || children.length === 0) {
            return null;
        }

        if (showSeparators) {
            retVal.push((
                <Divider
                    key={`${type}-divider`}
                    name={PersonFinderResults.getDividerText(type)}
                />
            ));
        }

        retVal.push(children);

        if (showSeparators && hasMore) {
            if (showWaitCursor) {
                retVal.push((
                    <WaitCursor
                        key={`${type}-wait`}
                    />
                ));
            } else {
                retVal.push((
                    <LoadMore
                        key={`${type}-more`}
                        type={(type === PERSON_RELATION || type === PERSON_UNRELATED) ? PERSON_RELATION : LOCATION_RELATION}
                        onClick={onLoadMore}
                    />
                ));
            }
        }

        return retVal;
    }

    render() {
        const {
            persons,
            sites,
            moreRelatedPersons,
            moreRelatedSites,
            moreUnrelatedPersons,
        } = this.props;

        const relatedPersons = this.renderResults(persons.related, PERSON_RELATION);
        const relatedSites = this.renderResults(sites.related, LOCATION_RELATION);
        const unrelatedPersons = this.renderResults(persons.unrelated, PERSON_RELATION);
        const unrelatedSites = this.renderResults(sites.unrelated, LOCATION_RELATION);

        return (
            <div className="cc__person-finder__results">
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
