/* eslint-disable react/forbid-prop-types */
import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Icon from '../../../react-chayns-icon/component/Icon';

const ListItemHeader = ({
    title,
    subtitle,
    image,
    icon,
    className,
    left,
    right,
    circle,
    hoverItem,
    onLongPress,
    longPressTimeout,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    notExpandable,
    noContentClass,
    onOpen,
    headerProps,
    defaultOpen,
    images,
    imageBorderColor,
    ...otherProps
}) => {
    const timeout = useRef(null);

    const onStart = (event) => {
        if (event.type === 'mousedown' && onMouseDown) {
            onMouseDown(event);
        } else if (event.type === 'touchstart' && onTouchStart) {
            onTouchStart(event);
        }
        if (onLongPress) {
            timeout.current = setTimeout(() => {
                onLongPress(event);
            }, longPressTimeout);
        }
    };

    const onEnd = (event) => {
        if (event.type === 'mousemove' && onMouseMove) {
            onMouseMove(event);
        } else if (event.type === 'mouseup' && onMouseUp) {
            onMouseUp(event);
        } else if (event.type === 'touchmove' && onTouchMove) {
            onTouchMove(event);
        } else if (event.type === 'touchend' && onTouchEnd) {
            onTouchEnd(event);
        } else if (event.type === 'touchcancel' && onTouchCancel) {
            onTouchCancel(event);
        }
        if (onLongPress) {
            clearTimeout(timeout.current);
        }
    };

    return (
        <div
            className={classnames('list-item__header', className)}
            onMouseDown={onMouseDown || onLongPress ? onStart : null}
            onMouseMove={onMouseMove || onLongPress ? onEnd : null}
            onMouseUp={onMouseUp || onLongPress ? onEnd : null}
            onTouchStart={onTouchStart || onLongPress ? onStart : null}
            onTouchMove={onTouchMove || onLongPress ? onEnd : null}
            onTouchEnd={onTouchEnd || onLongPress ? onEnd : null}
            onTouchCancel={onTouchCancel || onLongPress ? onEnd : null}
            {...otherProps}
        >
            {left}
            {image && (
                <div
                    className={classnames('list-item__image', {
                        'list-item__image--circle': circle,
                    })}
                    style={{
                        boxShadow: `0 0 0 1px ${imageBorderColor} inset`,
                        backgroundImage: `url(${image})`,
                    }}
                />
            )}
            {images && (
                <div
                    className={classnames('list-item__images', {
                        'list-item__image--circle': circle,
                    })}
                    style={{
                        boxShadow: `0 0 0 1px ${imageBorderColor} inset`,
                    }}
                >
                    {images.map((img, index) => {
                        if (index > 2) return null;
                        return (
                            <div
                                key={img}
                                className="list-item__image"
                                style={{
                                    backgroundImage: `url(${img})`,
                                }}
                            />
                        );
                    })}
                </div>
            )}
            {icon && (
                <Icon
                    className={classnames(
                        'list-item__icon chayns__background-color--102 chayns__color--headline',
                        {
                            'list-item__icon--circle': circle,
                        }
                    )}
                    icon={icon}
                />
            )}
            {(title || subtitle) && (
                <div className="list-item__titles">
                    {title &&
                        (Array.isArray(right) && right.length > 0 ? (
                            <div className="list-item__title-wrapper">
                                <div className="list-item__title ellipsis">
                                    {title}
                                </div>
                                <div
                                    className="list-item__right"
                                    style={
                                        typeof right[0] === 'string'
                                            ? { opacity: 0.75 }
                                            : null
                                    }
                                >
                                    {right[0]}
                                </div>
                            </div>
                        ) : (
                            <div className="list-item__title ellipsis">
                                {title}
                            </div>
                        ))}
                    {subtitle &&
                        (Array.isArray(right) && right.length > 1 ? (
                            <div className="list-item__subtitle-wrapper">
                                <div className="list-item__subtitle ellipsis">
                                    {subtitle}
                                </div>
                                <div className="list-item__right">
                                    {right[1]}
                                </div>
                            </div>
                        ) : (
                            <div className="list-item__subtitle ellipsis">
                                {subtitle}
                            </div>
                        ))}
                </div>
            )}
            <div className="list-item__spacer" />
            {right && !Array.isArray(right) && (
                <div className="list-item__right">{right}</div>
            )}
            {hoverItem && (
                <div className="list-item__hover-item" tabIndex={-1}>
                    {hoverItem}
                </div>
            )}
        </div>
    );
};

ListItemHeader.propTypes = {
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
    left: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
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
    headerProps: PropTypes.object,
    defaultOpen: PropTypes.bool,
    imageBorderColor: PropTypes.string,
};

ListItemHeader.defaultProps = {
    subtitle: null,
    image: null,
    images: null,
    icon: null,
    className: null,
    left: null,
    right: null,
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
    headerProps: null,
    defaultOpen: null,
    imageBorderColor: 'rgba(var(--chayns-color-rgb--009), .08)',
};

ListItemHeader.displayName = 'ListItemHeader';

export default ListItemHeader;
