import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    PERSON_RELATION,
} from '../constants/relationTypes';
import ResultItemListCustom from './ResultItemListCustom';

const PersonFinderResultsCustom = ({
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

    console.log('data', data, hasMore, onLoadMore);

    if (Array.isArray(orm.groups)) {
        return orm.groups.map(({ key: group, lang, show }) => (typeof show === 'function' && !show(inputValue) ? null : (
            <div className="cc__person-finder__results" key={`resultList_${group}`}>
                <ResultItemListCustom
                    data={data[group] || []}
                    orm={orm}
                    type={PERSON_RELATION}
                    separator={lang[chayns.env.language] || lang.en}
                    hasMore={hasMore}
                    onLoadMore={onLoadMore}
                    showWaitCursor={showWaitCursor}
                    onClick={handleClick}
                />
            </div>
        )));
    }

    return (
        <div className="cc__person-finder__results">
            <ResultItemListCustom
                data={data}
                orm={orm}
                type={PERSON_RELATION}
                hasMore={hasMore}
                onLoadMore={onLoadMore}
                showWaitCursor={showWaitCursor}
                onClick={handleClick}
            />
        </div>
    );
};

PersonFinderResultsCustom.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
        groups: PropTypes.array,
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.string,
    onSelect: PropTypes.func,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    showWaitCursor: PropTypes.bool,
};

PersonFinderResultsCustom.defaultProps = {
    data: [],
    value: '',
    onSelect: null,
    hasMore: false,
    showWaitCursor: false,
};

export default PersonFinderResultsCustom;
