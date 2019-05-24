import React from 'react';
import PropTypes from 'prop-types';

import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';

const ExpandableListItem = ({ children, ...props }) => {
    const {
        noContentClass, open,
    } = props;

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
            openProp={open}
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
    open: PropTypes.bool,
};

ExpandableListItem.defaultProps = {
    noContentClass: false,
    open: null,
};

export default ExpandableListItem;
