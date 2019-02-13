import React from 'react';
import PropTypes from 'prop-types';

import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';

const ExpandableListItem = ({ children, ...props }) => (
    <AbstractExpandableListItem
        header={(
            <ExpandableList.Context.Consumer>
                {c => (
                    <ExpandableListHeader
                        onClick={c.onToggle}
                        {...props}
                    />
                )}
            </ExpandableList.Context.Consumer>
        )}
        clickable
    >
        {children}
    </AbstractExpandableListItem>
);

ExpandableListItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
};

export default ExpandableListItem;
