import React from 'react';
import PropTypes from 'prop-types';
import Divider from './Divider';
import WaitCursor from './WaitCursor';
import {
    FRIEND_RELATION,
    LOCATION_RELATION,
    PERSON_RELATION,
    PERSON_UNRELATED,
} from '../constants/relationTypes';
import LoadMore from './LoadMore';
import getText from '../utils/getText';

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
    default:
        return null;
    }
}

const ResultItemList = ({
    children,
    type,
    showSeparators,
    hasMore,
    showWaitCursor,
    onLoadMore,
}) => {
    if (!children || children.length === 0) {
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
            {children}
            {showSeparators && hasMore && showWaitCursor && (
                <WaitCursor
                    style={{
                        padding: '24px 0',
                    }}
                    key={`${type}-wait`}
                />
            )}
            {showSeparators && hasMore && !showWaitCursor && (
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
    onLoadMore: PropTypes.func.isRequired,
    showWaitCursor: PropTypes.bool,
    hasMore: PropTypes.bool,
    showSeparators: PropTypes.bool,
    type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION, FRIEND_RELATION, PERSON_UNRELATED]).isRequired,
    children: PropTypes.arrayOf(PropTypes.node),
};

ResultItemList.defaultProps = {
    showWaitCursor: false,
    hasMore: false,
    showSeparators: false,
    children: null,
};

export default ResultItemList;
