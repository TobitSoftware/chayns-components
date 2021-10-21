/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';
import { isFunction } from '../../../utils/is';

const ExpandableListItem = ({ children, onClick, ...props }) => {
    const {
        noContentClass,
        className,
        headerClassName,
        open,
        style,
        onOpen,
        onClose,
        defaultOpen,
    } = props;

    return (
        <AbstractExpandableListItem
            noContentClass={noContentClass}
            className={className}
            header={
                <ExpandableList.Context.Consumer>
                    {(c) => (
                        <ExpandableListHeader
                            onClick={(...args) => {
                                if (isFunction(onClick)) {
                                    onClick(...args);
                                }
                                if (c && isFunction(c.onToggle)) {
                                    c.onToggle(...args);
                                }
                            }}
                            {...props}
                            className={headerClassName}
                        />
                    )}
                </ExpandableList.Context.Consumer>
            }
            clickable
            openProp={open}
            style={style}
            onOpenProp={onOpen}
            onCloseProp={onClose}
            defaultOpen={defaultOpen}
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
    headerClassName: PropTypes.string,
    open: PropTypes.bool,
    style: PropTypes.object,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    defaultOpen: PropTypes.bool,
};

ExpandableListItem.defaultProps = {
    noContentClass: false,
    className: null,
    headerClassName: null,
    open: null,
    style: null,
    onOpen: null,
    onClose: null,
    onClick: null,
    defaultOpen: false,
};

ExpandableListItem.displayName = 'ExpandableListItem';

export default ExpandableListItem;
