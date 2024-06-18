import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../react-chayns-input/component/Input';

const AccordionSearch = ({
    onSearch,
    searchPlaceholder,
    onSearchEnter,
    searchValue,
}) => (
    <Input
        placeholder={searchPlaceholder}
        onChange={onSearch}
        onEnter={onSearchEnter}
        onIconClick={onSearchEnter}
        icon="fa fa-search"
        value={searchValue}
        stopPropagation
        dynamic
    />
);

AccordionSearch.propTypes = {
    onSearch: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    onSearchEnter: PropTypes.func,
    searchValue: PropTypes.string,
};

AccordionSearch.displayName = 'AccordionSearch';

export default AccordionSearch;
