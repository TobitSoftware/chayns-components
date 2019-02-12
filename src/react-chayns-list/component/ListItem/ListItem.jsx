import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListItemHeader from './ListItemHeader';

const ListItem = ({
    title,
    subtitle,
    image,
    className,
    onClick,
    right,
}) => (
    <div
        className={classnames('list-item', className, {
            'list-item--clickable': onClick,
        })}
    >
        <ListItemHeader
            title={title}
            subtitle={subtitle}
            onClick={onClick}
            image={image}
            className={className}
            right={right}
        />
    </div>
);

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
};

ListItem.defaultProps = {
    subtitle: null,
    image: null,
    className: null,
    onClick: null,
    right: null,
};

export default ListItem;
