import React from 'react';
import PropTypes from 'prop-types';
import Divider from './Divider';
import WaitCursor from './WaitCursor';
import {
    FRIEND_RELATION,
    LOCATION_RELATION,
    LOCATION_UNRELATED,
    PERSON_RELATION,
    PERSON_UNRELATED,
} from '../constants/relationTypes';
import LoadMore from './LoadMore';
import getText from '../utils/getText';
import PersonFinderResultItem from './PersonFinderResultItem';

function getDividerText(type) {
    switch (type) {
    case FRIEND_RELATION:
        return getText('DIVIDER_FRIEND');
    case PERSON_RELATION:
        return getText('DIVIDER_PERSON');
    case PERSON_UNRELATED:
        return getText('DIVIDER_MORE_PERSON');
    case LOCATION_RELATION:
        return getText('DIVIDER_SITE');
    case LOCATION_UNRELATED:
        return getText('DIVIDER_MORE_SITE');
    default:
        return null;
    }
}

const ResultItemList = ({
    relations,
    type,
    showSeparators,
    hasMore,
    showWaitCursor,
    onLoadMore,
    onClick,
}) => {
    if (!relations || relations.length === 0) {
        return null;
    }

    return (
        <div>
            {showSeparators && (
                <Divider
                    key={`${type}-divider`}
                    name={getDividerText(type)}
                />
            )}
            {relations.map(relation => (
                <PersonFinderResultItem
                    key={relation.personId || relation.siteId}
                    relation={relation}
                    type={type}
                    onClick={onClick}
                />
            ))}
            {showSeparators && hasMore && showWaitCursor && (
                <WaitCursor
                    style={{
                        padding: '24px 0',
                    }}
                    key={`${type}-wait`}
                />
            )}
            {showSeparators && onLoadMore && hasMore && !showWaitCursor && (
                <LoadMore
                    key={`${type}-more`}
                    type={(type === PERSON_RELATION || type === PERSON_UNRELATED) ? PERSON_RELATION : LOCATION_RELATION}
                    onClick={onLoadMore}
                />
            )}
        </div>
    );
};

ResultItemList.propTypes = {
    onLoadMore: PropTypes.func,
    showWaitCursor: PropTypes.bool,
    hasMore: PropTypes.bool,
    showSeparators: PropTypes.bool,
    type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION, LOCATION_UNRELATED, FRIEND_RELATION, PERSON_UNRELATED]).isRequired,
    relations: PropTypes.array,
    onClick: PropTypes.func,
};

ResultItemList.defaultProps = {
    showWaitCursor: false,
    hasMore: false,
    showSeparators: false,
    relations: null,
    onClick: null,
    onLoadMore: null,
};

export default ResultItemList;
