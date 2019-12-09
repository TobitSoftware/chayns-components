import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WaitCursor from './WaitCursor';
import LoadMore from './LoadMore';
import PersonFinderResultItemCustom from './PersonFinderResultItemCustom';
import {LOCATION_RELATION, PERSON_RELATION} from '../constants/relationTypes';
import Divider from './Divider';

const ResultItemListCustom = ({
    className,
    data,
    hasMore,
    orm,
    separator,
    type,
    showWaitCursor,
    onLoadMore,
    onClick,
}) => {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className={classNames('cc__person-finder__results-list', className)}>
            {separator && (
                <Divider
                    key={`${separator}-divider`}
                    name={separator}
                />
            )}
            {data.map(relation => (
                <PersonFinderResultItemCustom
                    key={relation[orm.identifier] || relation.personId || relation.siteId}
                    data={relation}
                    orm={orm}
                    onClick={onClick}
                />
            ))}
            {hasMore && showWaitCursor && (
                <WaitCursor
                    style={{
                        padding: '24px 0',
                    }}
                    key={`${PERSON_RELATION}-wait`}
                />
            )}
            {onLoadMore && hasMore && (
                <LoadMore
                    key={`${PERSON_RELATION}-more`}
                    type={type}
                    hide={showWaitCursor}
                    onClick={onLoadMore}
                />
            )}
        </div>
    );
};

ResultItemListCustom.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    type: PropTypes.oneOf([PERSON_RELATION, LOCATION_RELATION]).isRequired,
    onLoadMore: PropTypes.func,
    showWaitCursor: PropTypes.bool,
    separator: PropTypes.string,
    hasMore: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

ResultItemListCustom.defaultProps = {
    data: [],
    showWaitCursor: false,
    separator: null,
    hasMore: false,
    onClick: null,
    onLoadMore: null,
    className: null,
};

export default ResultItemListCustom;
