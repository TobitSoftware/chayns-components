import React from 'react';
import PropTypes from 'prop-types';

import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';

const ExpandableListItem = ({ children, ...props }) => {
    const { noContentClass } = props;
    return (
        <AbstractExpandableListItem
            noContentClass={noContentClass}
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
};

ExpandableListItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    noContentClass: PropTypes.bool,
};

ExpandableListItem.defaultProps = {
    noContentClass: false,
};

export default ExpandableListItem;
