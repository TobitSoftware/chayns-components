import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ListItemHeader from './ListItemHeader';

const ListItem = ({
    title,
    subtitle,
    image,
    images,
    icon,
    className,
    onClick,
    right,
    style,
    circle,
    headerProps,
    hoverItem,
    onLongPress,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    longPressTimeout,
    notExpandable,
    noContentClass,
    onOpen,
    imageBorderColor,
    left,
    ...props
}) => (
    <div
        className={classnames('list-item', className, {
            'list-item--clickable': onClick,
        })}
        style={style}
        {...props}
    >
        <ListItemHeader
            title={title}
            subtitle={subtitle}
            onClick={onClick}
            image={image}
            images={images}
            icon={icon}
            className={className}
            right={right}
            style={style && style.head ? style.head : null}
            circle={circle}
            hoverItem={hoverItem}
            longPressTimeout={longPressTimeout}
            onLongPress={onLongPress}
            onKeyDown={onMouseDown}
            onKeyUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
            imageBorderColor={imageBorderColor}
            left={left}
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
    images: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    onClick: PropTypes.func,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    // eslint-disable-next-line react/forbid-prop-types
    headerProps: PropTypes.object,
    circle: PropTypes.bool,
    hoverItem: PropTypes.node,
    onLongPress: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
    longPressTimeout: PropTypes.number,
    notExpandable: PropTypes.bool,
    noContentClass: PropTypes.bool,
    onOpen: PropTypes.func,
    imageBorderColor: PropTypes.string,
    left: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

ListItem.defaultProps = {
    subtitle: null,
    image: null,
    images: null,
    icon: null,
    className: null,
    onClick: null,
    right: null,
    style: null,
    headerProps: null,
    circle: false,
    hoverItem: null,
    onLongPress: null,
    onMouseDown: null,
    onMouseMove: null,
    onMouseUp: null,
    onTouchStart: null,
    onTouchMove: null,
    onTouchEnd: null,
    onTouchCancel: null,
    longPressTimeout: 450,
    notExpandable: null,
    noContentClass: null,
    onOpen: null,
    imageBorderColor: 'rgba(var(--chayns-color-rgb--009), .08)',
    left: null,
};

ListItem.displayName = 'ListItem';

export default ListItem;
