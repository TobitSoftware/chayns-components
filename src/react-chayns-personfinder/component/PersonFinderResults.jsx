import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    PERSON_RELATION,
    LOCATION_RELATION,
    FRIEND_RELATION,
    PERSON_UNRELATED,
    LOCATION_UNRELATED,
} from '../constants/relationTypes';
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

    render() {
        const {
            persons,
            sites,
            moreRelatedPersons,
            moreRelatedSites,
            moreUnrelatedPersons,
            showFriends,
            showSeparators,
            onLoadMore,
            showWaitCursor,
        } = this.props;

        return (
            <div className="cc__person-finder__results">
                {(showFriends && persons.friends && persons.friends.length) ? (
                    <ResultItemList
                        type={FRIEND_RELATION}
                        hasMore={false}
                        showSeparators={showSeparators}
                        onLoadMore={onLoadMore}
                        showWaitCursor={showWaitCursor}
                        onClick={this.handleClick}
                        relations={persons.friends}
                    />
                ) : null}
                <ResultItemList
                    type={PERSON_RELATION}
                    hasMore={moreRelatedPersons}
                    showSeparators={showSeparators}
                    onLoadMore={onLoadMore}
                    showWaitCursor={showWaitCursor}
                    onClick={this.handleClick}
                    relations={persons.related}
                />
                <ResultItemList
                    type={LOCATION_RELATION}
                    hasMore={moreRelatedSites}
                    showSeparators={showSeparators}
                    onLoadMore={onLoadMore}
                    showWaitCursor={showWaitCursor}
                    onClick={this.handleClick}
                    relations={sites.related}
                />
                <ResultItemList
                    type={PERSON_UNRELATED}
                    hasMore={moreUnrelatedPersons}
                    showSeparators={showSeparators}
                    onLoadMore={onLoadMore}
                    showWaitCursor={showWaitCursor}
                    onClick={this.handleClick}
                    relations={persons.unrelated}
                />
                <ResultItemList
                    type={LOCATION_UNRELATED}
                    hasMore={false}
                    showSeparators
                    onLoadMore={null}
                    showWaitCursor={false}
                    onClick={this.handleClick}
                    relations={sites.unrelated}
                />
            </div>
        );
    }
}
