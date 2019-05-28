import React from 'react';
import PropTypes from 'prop-types';

import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';

const ExpandableListItem = ({ children, ...props }) => {
    const {
        noContentClass,
        open,
        style,
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
            style={style}
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
    style: PropTypes.object,
};

ExpandableListItem.defaultProps = {
    noContentClass: false,
    open: null,
    style: null,
};

export default ExpandableListItem;
