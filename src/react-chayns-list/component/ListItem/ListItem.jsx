/**
 * @component
 */

import classnames from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import ListItemHeader from './ListItemHeader';

/**
 * The items in a list to display related data in a structured format. Should be
 * used inside of a `List` component.
 */
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
    noContentClass,
    onOpen,
    imageBorderColor,
    left,
    headMultiline,
    // eslint-disable-next-line react/prop-types
    notExpandable,
    openImageOnClick,
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
            openImageOnClick={openImageOnClick}
            {...headerProps}
        />
    </div>
);

ListItem.propTypes = {
    /**
     * A string or `ReactNode` that will be rendered as the title of the list
     * item.
     */
    title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,

    /**
     * A string or `ReactNode` that will be rendered as the subtitle of the list
     * item.
     */
    subtitle: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),

    /**
     * The URL to an image that will be shown on the left of the list item.
     */
    image: PropTypes.string,

    /**
     * An array of URLs for creating a puzzle of images on the left hand of the
     * image item.
     */
    images: PropTypes.arrayOf(PropTypes.string),

    /**
     * Whether the image/images should be opened at full size when clicked
     * only works if either image or images is defined
     */
    openImageOnClick: PropTypes.bool,

    /**
     * An icon to show on the left side of the list item.
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * A classname string that will be applied ot the outer-most `<div>`-element
     * of the list item.
     */
    className: PropTypes.string,

    /**
     * An `onClick`-listener for the list item header.
     */
    onClick: PropTypes.func,

    /**
     * A `ReactNode` that should be displayed on the right side of the list
     * item.
     */
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),

    /**
     * A React style object that will be applied to the outer-most
     * `<div>`-element of the list item.
     *
     * `style.body` and `style.head` will be applied to the body and head parts
     * of the list item accordingly.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * Any additional props that will be applied to the head of the list item.
     */
    headerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    /**
     * Wether the image should be in a circular shape rather than a rectangle.
     */
    circle: PropTypes.bool,

    /**
     * A ReactNode that is shown on the right side of the list item on hover.
     */
    hoverItem: PropTypes.node,

    /**
     * This function will be called when the user long-presses on the list item
     * header.
     */
    onLongPress: PropTypes.func,

    /**
     * A callback for the `mousedown`-event on the list item header.
     */
    onMouseDown: PropTypes.func,

    /**
     * A callback for the `mousemove`-event on the list item header.
     */
    onMouseMove: PropTypes.func,

    /**
     * A callback for the `mouseup`-event on the list item header.
     */
    onMouseUp: PropTypes.func,

    /**
     * A callback for the `touchstart`-event on the list item header.
     */
    onTouchStart: PropTypes.func,

    /**
     * A callback for the `touchmove`-event on the list item header.
     */
    onTouchMove: PropTypes.func,

    /**
     * A callback for the `touchend`-event on the list item header.
     */
    onTouchEnd: PropTypes.func,

    /**
     * A callback for the `touchcancel`-event on the list item header.
     */
    onTouchCancel: PropTypes.func,

    /**
     * Control the time after which a press is considered a long press.
     */
    longPressTimeout: PropTypes.number,

    /**
     * Whether the default classname for the children container should be
     * removed, which removes the padding around the list item content.
     */
    noContentClass: PropTypes.bool,

    /**
     * This function will be called when the list item is opening.
     */
    onOpen: PropTypes.func,

    /**
     * A CSS color that will be applied to the border of the image.
     */
    imageBorderColor: PropTypes.string,
    left: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    /**
     * Whether the head of the list item should be multiline or ellipsis in expanded state
     */
    headMultiline: PropTypes.bool,
};

ListItem.defaultProps = {
    subtitle: null,
    image: null,
    images: null,
    openImageOnClick: false,
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
    noContentClass: null,
    onOpen: null,
    imageBorderColor: 'rgba(var(--chayns-color-rgb--009), .08)',
    left: null,
    headMultiline: false,
};

ListItem.displayName = 'ListItem';

export default ListItem;
