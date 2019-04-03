import React from 'react';
import PropTypes from 'prop-types';
import AbstractList from './AbstractList';
import ExpandableList from './ExpandableList/ExpandableList';

const List = ({ className, children, notExpandable }) => {
    if (notExpandable) {
        return (
            <AbstractList
                className={className}
            >
                {children}
            </AbstractList>
        );
    }

    return (
        <ExpandableList
            className={className}
        >
            {children}
        </ExpandableList>
    );
};

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    notExpandable: PropTypes.bool,
};

List.defaultProps = {
    className: null,
    children: null,
    notExpandable: false,
};

export default List;
