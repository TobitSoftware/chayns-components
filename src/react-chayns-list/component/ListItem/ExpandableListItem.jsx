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
    } = props;

    return (
        <AbstractExpandableListItem
            noContentClass={noContentClass}
            className={className}
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
    className: PropTypes.string,
    open: PropTypes.bool,
    style: PropTypes.object,
};

ExpandableListItem.defaultProps = {
    noContentClass: false,
    className: null,
    open: null,
    style: null,
};

export default ExpandableListItem;
