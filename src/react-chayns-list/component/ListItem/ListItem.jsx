/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListItemHeader from './ListItemHeader';

const ListItem = ({
    title,
    subtitle,
    image,
    icon,
    className,
    onClick,
    right,
    style,
    headerProps,
}) => (
    <div
        className={classnames('list-item', className, {
            'list-item--clickable': onClick,
        })}
        style={style}
    >
        <ListItemHeader
            title={title}
            subtitle={subtitle}
            onClick={onClick}
            image={image}
            icon={icon}
            className={className}
            right={right}
            style={style && style.head ? style.head : null}
            {...headerProps}
        />
    </div>
);

ListItem.propTypes = {
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
    className: PropTypes.string,
    onClick: PropTypes.func,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    style: PropTypes.object,
    headerProps: PropTypes.object,
};

ListItem.defaultProps = {
    subtitle: null,
    image: null,
    icon: null,
    className: null,
    onClick: null,
    right: null,
    style: null,
    headerProps: null,
};

export default ListItem;
