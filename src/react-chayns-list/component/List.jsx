/**
 * @component
 */

import PropTypes from 'prop-types';
import React from 'react';
import AbstractList from './AbstractList';
import ExpandableList from './ExpandableList/ExpandableList';
import './List.scss';

/**
 * The wrapper for the `ListItem`-component to create lists.
 */
const List = ({ className, children, notExpandable }) => {
    if (notExpandable) {
        return <AbstractList className={className}>{children}</AbstractList>;
    }

    return <ExpandableList className={className}>{children}</ExpandableList>;
};

List.propTypes = {
    /**
     * A classname string that will be applied to the wrapper container.
     */
    className: PropTypes.string,

    /**
     * The children of the list.
     */
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),

    /**
     * Wether the components inside of the list should not be expandable.
     */
    notExpandable: PropTypes.bool,
};

List.defaultProps = {
    className: null,
    children: null,
    notExpandable: false,
};

List.displayName = 'List';

export default List;
