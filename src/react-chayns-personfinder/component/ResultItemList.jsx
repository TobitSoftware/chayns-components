import classNames from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Divider from './Divider';
import LoadMore from './LoadMore';
import PersonFinderResultItem from './PersonFinderResultItem';
import WaitCursor from './WaitCursor';

const ResultItemList = ({
    className,
    data,
    hasMore,
    orm,
    separator,
    group,
    showWaitCursor,
    onLoadMore,
    onClick,
    focusIndex,
    roundIcons,
    hideFriendsIcon,
    onRemoveTag,
    showCheckbox,
    tags,
}) => {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div
            className={classNames(
                'cc__person-finder__results-list',
                className,
                {
                    'cc__person-finder__results-list--noTransition':
                        focusIndex !== null,
                }
            )}
        >
            {separator && (
                <Divider key={`${separator}-divider`} name={separator} />
            )}
            {data.map((item, index) => (
                <PersonFinderResultItem
                    key={item[orm.identifier]}
                    data={item}
                    orm={orm}
                    onClick={onClick}
                    isFocused={focusIndex !== null && focusIndex === index}
                    roundIcons={roundIcons}
                    hideFriendsIcon={hideFriendsIcon}
                    tags={tags}
                    onRemoveTag={onRemoveTag}
                    showCheckbox={showCheckbox}
                />
            ))}
            {hasMore && showWaitCursor && (
                <WaitCursor
                    style={{
                        padding: '24px 0',
                    }}
                    key={`${group}-wait`}
                />
            )}
            {onLoadMore && hasMore && (
                <LoadMore
                    key={`${group}-more`}
                    group={group}
                    hide={showWaitCursor}
                    onClick={onLoadMore}
                />
            )}
        </div>
    );
};

ResultItemList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    group: PropTypes.string,
    onLoadMore: PropTypes.func,
    showWaitCursor: PropTypes.bool,
    separator: PropTypes.string,
    hasMore: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    focusIndex: PropTypes.number,
    roundIcons: PropTypes.bool,
    hideFriendsIcon: PropTypes.bool,
    onRemoveTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.shape({}),
        })
    ),
    showCheckbox: PropTypes.bool,
};

ResultItemList.defaultProps = {
    data: [],
    showWaitCursor: false,
    separator: null,
    hasMore: false,
    onClick: null,
    group: 'default',
    onLoadMore: null,
    className: null,
    focusIndex: null,
    roundIcons: false,
    hideFriendsIcon: false,
    tags: [],
    showCheckbox: false,
};

ResultItemList.displayName = 'ResultItemList';

export default ResultItemList;
