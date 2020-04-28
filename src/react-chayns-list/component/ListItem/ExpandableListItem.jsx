/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';

const ExpandableListItem = ({ children, ...props }) => {
    const {
        noContentClass,
        className,
        open,
        style,
        onOpen,
        onClose,
    } = props;

    return (
        <AbstractExpandableListItem
            noContentClass={noContentClass}
            className={className}
            header={(
                <ExpandableList.Context.Consumer>
                    {(c) => (
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
            onOpenProp={onOpen}
            onCloseProp={onClose}
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
    className: PropTypes.string,
    open: PropTypes.bool,
    style: PropTypes.object,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

ExpandableListItem.defaultProps = {
    noContentClass: false,
    className: null,
    open: null,
    style: null,
    onOpen: null,
    onClose: null,
};

ExpandableListItem.displayName = 'ExpandableListItem';

export default ExpandableListItem;
