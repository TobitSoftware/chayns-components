/**
 * @component {./docs.md}
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Bubble from '../../react-chayns-bubble/component/Bubble';
import Icon from '../../react-chayns-icon/component/Icon';
import TextString from '../../react-chayns-textstring/component/TextString';

/**
 * Gives people access to additional functionality related to onscreen items
 * without cluttering the interface.
 */
const ContextMenu = React.forwardRef((props, ref) => {
    const {
        parent,
        position: userPosition,
        minWidth,
        maxWidth,
        className,
        items,
        stopPropagation,
        childrenStyle,
        childrenClassName,
        showTriggerBackground,
        children,
        style,
        onChildrenClick,
        disableDialog,
        onLayerClick,
        onShow,
        onHide,
        removeParentSpace,
        coordinates,
        positionOnChildren,
        arrowDistance,
    } = props;

    const bubbleRef = useRef();
    const childrenRef = useRef();

    const [isBubbleShown, setIsBubbleShown] = useState(false);
    const [position, setPosition] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const itemsHaveIcons = items.some(({ icon }) =>
        typeof icon === 'string' ? icon : icon?.iconName
    );

    /**
     * Sync bubble with `isBubbleShown` state
     */
    useEffect(() => {
        if (!bubbleRef.current) return;

        if (isBubbleShown) {
            bubbleRef.current.show();
            onShow?.();
        } else {
            bubbleRef.current.hide();
            onHide?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBubbleShown]);

    /**
     * Update position of the bubble
     */
    useEffect(() => {
        let newX = coordinates?.x || 0;
        let top = coordinates?.y || 0;
        let bottom = coordinates?.y || 0;

        if (!coordinates && childrenRef.current) {
            const rect = childrenRef.current.getBoundingClientRect();
            if (positionOnChildren === ContextMenu.positionOnChildren.LEFT) {
                newX = rect.left + arrowDistance;
            } else if (
                positionOnChildren === ContextMenu.positionOnChildren.CENTER
            ) {
                newX = rect.left + rect.width / 2;
            } else if (
                positionOnChildren === ContextMenu.positionOnChildren.RIGHT
            ) {
                newX = rect.left + rect.width - arrowDistance;
            }
            top = rect.top;
            bottom = rect.bottom;
        }

        let newPosition = userPosition;

        if (newPosition === null) {
            const shouldBeLeft = newX > window.innerWidth / 2;
            const shouldBeTop =
                (top + bottom) / 2 >
                (document.body.offsetHeight || window.innerHeight) / 2;

            if (shouldBeLeft && shouldBeTop) {
                newPosition = ContextMenu.position.TOP_LEFT;
            } else if (!shouldBeLeft && shouldBeTop) {
                newPosition = ContextMenu.position.TOP_RIGHT;
            } else if (shouldBeLeft && !shouldBeTop) {
                newPosition = ContextMenu.position.BOTTOM_LEFT;
            } else {
                newPosition = ContextMenu.position.BOTTOM_RIGHT;
            }
        }

        let newY = Bubble.isPositionBottom(newPosition) ? bottom : top;

        if (removeParentSpace) {
            const parentRect = (
                parent ||
                document.getElementsByClassName('tapp')[0] ||
                document.body
            ).getBoundingClientRect();
            newX -= parentRect.left;
            newY -= parentRect.top;
        }

        if (chayns.env.isApp) {
            chayns.getWindowMetrics().then(({ pageYOffset }) => {
                setPosition(newPosition);
                setX(newX);
                setY(newY + pageYOffset);
            });
        } else {
            setPosition(newPosition);
            setX(newX);
            setY(newY);
        }
    }, [
        arrowDistance,
        coordinates,
        parent,
        positionOnChildren,
        removeParentSpace,
        userPosition,
        isBubbleShown,
    ]);

    /**
     * Show the menu, either by opening a dialog or by showing the bubble.
     */
    const show = useCallback(async () => {
        if (!disableDialog && (chayns.env.isMobile || chayns.env.isTablet)) {
            const iconFallback = items.some(({ icon }) =>
                typeof icon === 'string' ? icon : icon?.iconName
            )
                ? ' '
                : '';
            const { buttonType, selection } = await chayns.dialog.select({
                type: 2,
                list: items.map(({ text, icon, stringName }, index) => ({
                    // eslint-disable-next-line no-nested-ternary
                    name: stringName
                        ? TextString.getTextString(stringName, null, text)
                        : React.isValidElement(text)
                        ? renderToStaticMarkup(text)
                        : text,
                    value: index,
                    icon:
                        (typeof icon === 'string'
                            ? icon
                            : icon?.iconName && `fa-${icon?.iconName}`) ||
                        iconFallback,
                })),
                buttons: [],
            });

            if (buttonType === 1 && selection?.[0]) {
                items[selection[0].value].onClick();
            } else if (buttonType === -1 && onLayerClick) {
                onLayerClick();
            }
        } else {
            setIsBubbleShown(true);
        }
    }, [disableDialog, items, onLayerClick]);

    const hide = useCallback(() => {
        setIsBubbleShown(false);
    }, []);

    /**
     * Expose the `show` and `hide` methods via ref.
     */
    useImperativeHandle(ref, () => ({ show, hide }), [hide, show]);

    useEffect(() => {
        window.addEventListener('blur', hide);

        return () => {
            window.removeEventListener('blur', hide);
        };
    }, [hide]);

    /**
     * Hides the bubble when is it opened and the page is clicked.
     */
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (isBubbleShown) {
            const handleLayerClick = (event) => {
                if (isBubbleShown) {
                    if (onLayerClick) {
                        onLayerClick(event);
                    } else {
                        hide();
                    }
                }
            };

            document.addEventListener('click', handleLayerClick, true);

            return () =>
                document.removeEventListener('click', handleLayerClick, true);
        }
    }, [hide, isBubbleShown, onLayerClick]);

    function handleChildrenClick(event) {
        if (onChildrenClick) {
            onChildrenClick(event);
        } else {
            show();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }
    }

    return (
        <>
            <Bubble
                coordinates={{ x, y }}
                parent={parent}
                position={position}
                style={{
                    minWidth,
                    maxWidth,
                    ...style,
                }}
                key="bubble"
                ref={bubbleRef}
                className={className}
            >
                <ul>
                    {items.map((item, index) => (
                        <li
                            className={classNames(
                                'context-menu__item',
                                item.className
                            )}
                            onClick={(e) => {
                                if (stopPropagation) {
                                    e.stopPropagation();
                                }
                                item.onClick(e);
                            }}
                            key={
                                // eslint-disable-next-line react/no-array-index-key
                                item.stringName ||
                                (item.text.props && item.text.props.stringName
                                    ? item.text.props.stringName
                                    : item.text) + index
                            }
                        >
                            {item.icon || itemsHaveIcons ? (
                                <div className="context-menu__item__icon">
                                    {item.icon && <Icon icon={item.icon} />}
                                </div>
                            ) : null}
                            {item.stringName ? (
                                <TextString stringName={item.stringName}>
                                    <div className="context-menu__item__text">
                                        {item.text}
                                    </div>
                                </TextString>
                            ) : (
                                <div className="context-menu__item__text">
                                    {item.text}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </Bubble>
            {!coordinates && (
                <div
                    key="cc__contextMenu__children"
                    ref={childrenRef}
                    onClick={handleChildrenClick}
                    style={childrenStyle}
                    className={classNames(
                        childrenClassName,
                        'accordion--no-trigger',
                        'context-menu__children',
                        { 'image-tool': showTriggerBackground }
                    )}
                >
                    {children}
                </div>
            )}
        </>
    );
});

ContextMenu.position = Bubble.position;

ContextMenu.positionOnChildren = {
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2,
};

ContextMenu.propTypes = {
    /**
     * This callback will be called when the `ContextMenu` is shown and the user
     * clicks away from it.
     */
    onLayerClick: PropTypes.func,

    /**
     * This callback will be called when the context menu becomes visible
     */
    onShow: PropTypes.func,

    /**
     *  This callback will be called when the `ContextMenu` hides
     */
    onHide: PropTypes.func,

    /**
     * The coordinates at which the context menu will get rendered.
     */
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),

    /**
     * The action items inside of the context menu. Their shape should look like
     * this: `{ className: <string>, onClick: <function>, text: <string>,
     * icon: <string> }, stringName: <string>`.
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func,
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
                .isRequired,
            stringName: PropTypes.string,
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Object),
            ]),
        })
    ),

    /**
     * This specifies where the menu will appear relative to the components
     * provided in the `children`-prop. Possible values are: `0` for top left,
     * `1` for bottom left, `2` for bottom right, `3` for top right, `4` for top
     * center and `5` for bottom center.
     */
    position: PropTypes.number,

    /**
     * The position of the arrow relative to the children. Possible values are
     * `0` for left, `1` for center and `2` for right.
     */
    positionOnChildren: PropTypes.number,

    /**
     * Specifies the DOM node the context menu will be rendered into.
     */
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},

    /**
     * The React node that the context menu refers to.
     */
    children: PropTypes.node,

    /**
     * Called when the `onclick`-event is triggered on the children.
     */
    onChildrenClick: PropTypes.func,

    /**
     * A React style object that will be applied to the children wrapper.
     */
    childrenStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A classname string that will be applied to the children wrapper.
     */
    childrenClassName: PropTypes.string,

    /**
     * Wether to stop propagation of click events on the children elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * The minimum width of the context menu.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the context menu.
     */
    maxWidth: PropTypes.number,

    /**
     * Adds a white background to the children wrapper, for when it would
     * otherwise be difficult to view (e.g. on images or video).
     */
    showTriggerBackground: PropTypes.bool,

    /**
     * A classname string applied to the Bubble component.
     */
    className: PropTypes.string,

    /**
     * A React style object that is applied to the Bubble component.
     */
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,

    /**
     * Removes the parent padding to the page borders from the context menu
     * position. This is needed when the parent is padded and relatively
     * positioned.
     */
    removeParentSpace: PropTypes.bool,

    /**
     * Disables the use of a dialog on mobile.
     */
    disableDialog: PropTypes.bool,

    /**
     * Adjust the distance of the arrow and the end of the children. This only
     * applies if `positionOnChildren` is set to left (`0`) or right (`2`).
     */
    arrowDistance: PropTypes.number,
};

ContextMenu.defaultProps = {
    onLayerClick: null,
    onShow: null,
    onHide: null,
    items: [],
    position: null,
    positionOnChildren: 1,
    parent: null,
    children: <Icon icon="ts-ellipsis_v" />,
    coordinates: null,
    onChildrenClick: null,
    childrenStyle: null,
    childrenClassName: null,
    stopPropagation: false,
    minWidth: null,
    maxWidth: null,
    showTriggerBackground: false,
    className: null,
    style: null,
    removeParentSpace: false,
    disableDialog: false,
    arrowDistance: 0,
};

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
