import React from 'react';
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

export default ExpandableListItem;
