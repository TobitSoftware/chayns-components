import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    PERSON_RELATION,
} from '../constants/relationTypes';
import ResultItemListCustom from './ResultItemListCustom';

const PersonFinderResultsCustom = ({
    data,
    orm,
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
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    onSelect: PropTypes.func,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    showWaitCursor: PropTypes.bool,
};

PersonFinderResultsCustom.defaultProps = {
    data: [],
    onSelect: null,
    hasMore: false,
    showWaitCursor: false,
};

export default PersonFinderResultsCustom;
