import React from 'react';
import PropTypes from 'prop-types';

import ExpandableListItem from './ListItem/ExpandableListItem';
import SimpleListItem from './ListItem/ListItem';

const ListItem = ({
    hideIndicator,
    children,
    ...props,
}) => {
    if (children) {
        return (
            <ExpandableListItem
                hideIndicator={hideIndicator}
                {...props}
            >
                {children}
            </ExpandableListItem>
        );
    }

    return (
        <SimpleListItem {...props} />
    );
};

ListItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    hideIndicator: PropTypes.bool,
};

ListItem.defaultProps = {
    children: null,
    hideIndicator: false,
};

export default ListItem;
