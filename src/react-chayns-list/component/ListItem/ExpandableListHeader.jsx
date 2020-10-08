/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import ListItemHeader from './ListItemHeader';

const ExpandableListHeader = ({
    title,
    subtitle,
    image,
    icon,
    onClick,
    hideIndicator,
    right,
    style,
    headerProps,
    ...props
}) => (
    <ListItemHeader
        title={title}
        subtitle={subtitle}
        onClick={onClick}
        image={image}
        icon={icon}
        right={right}
        left={
            !hideIndicator && (
                <div className="list-item__indicator">
                    <div className="icon-wrapper">
                        <i className="ts-icon ts-angle-right" />
                    </div>
                </div>
            )
        }
        style={style && style.head ? style.head : null}
        {...props}
        {...headerProps}
    />
);

ExpandableListHeader.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    subtitle: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    image: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    hideIndicator: PropTypes.bool,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    style: PropTypes.object,
    headerProps: PropTypes.object,
};

ExpandableListHeader.defaultProps = {
    image: null,
    icon: null,
    subtitle: null,
    onClick: null,
    hideIndicator: false,
    right: null,
    style: null,
    headerProps: null,
};

ExpandableListHeader.displayName = 'ExpandableListHeader';

export default ExpandableListHeader;
