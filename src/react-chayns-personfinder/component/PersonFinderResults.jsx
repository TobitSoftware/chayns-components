import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ResultItemList from './ResultItemList';

const PersonFinderResults = ({
    data,
    orm,
    value: inputValue,
    hasMore,
    onLoadMore,
    showWaitCursor,
    onSelect,
}) => {
    const handleClick = useCallback((value) => {
        if (onSelect) {
            onSelect(value.type, value.relation);
        }
    }, [onSelect]);

    if (Array.isArray(orm.groups)) {
        return orm.groups.map(({ key: group, lang, show }) => (typeof show === 'function' && !show(inputValue) ? null : (
            <div className="cc__person-finder__results" key={`resultList_${group}`}>
                <ResultItemList
                    data={typeof orm.filter === 'function' ? (data[group] || []).filter(orm.filter(inputValue)) : (data[group] || [])}
                    orm={orm}
                    group={group}
                    separator={lang[chayns.env.language] || lang.en}
                    hasMore={hasMore[group]}
                    onLoadMore={onLoadMore}
                    showWaitCursor={showWaitCursor[group]}
                    onClick={handleClick}
                />
            </div>
        )));
    }

    return (
        <div className="cc__person-finder__results">
            <ResultItemList
                data={typeof orm.filter === 'function' ? data.filter(orm.filter(inputValue)) : data}
                orm={orm}
                hasMore={hasMore}
                onLoadMore={onLoadMore}
                showWaitCursor={showWaitCursor}
                onClick={handleClick}
            />
        </div>
    );
};

PersonFinderResults.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
        groups: PropTypes.array,
        filter: PropTypes.func,
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.string,
    onSelect: PropTypes.func,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    showWaitCursor: PropTypes.bool,
};

PersonFinderResults.defaultProps = {
    data: [],
    value: '',
    onSelect: null,
    hasMore: false,
    showWaitCursor: false,
};

export default PersonFinderResults;
