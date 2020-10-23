/**
 * @component {./docs.md}
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Bubble from '../../react-chayns-bubble/component/Bubble';
import Icon from '../../react-chayns-icon/component/Icon';
import { isFunction } from '../../utils/is';

/**
 * Gives people access to additional functionality related to onscreen items
 * without cluttering the interface.
 */
export default class ContextMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: null,
            x: 0,
            y: 0,
        };

        this.onChildrenClick = this.onChildrenClick.bind(this);
        this.onLayerClick = this.onLayerClick.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount() {
        const { coordinates } = this.props;

        if (coordinates) {
            this.getPosition();
        }

        window.addEventListener('blur', this.hide);
    }

    componentDidUpdate(prevProps) {
        const { coordinates, position, positionOnChildren } = this.props;

        if (
            prevProps.coordinates !== coordinates ||
            prevProps.position !== position ||
            prevProps.positionOnChildren !== positionOnChildren
        ) {
            this.getPosition();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        document.removeEventListener('click', this.onLayerClick);
        window.removeEventListener('blur', this.hide);
    }

    onChildrenClick(e) {
        const { onChildrenClick, stopPropagation } = this.props;
        if (onChildrenClick) {
            onChildrenClick(e);
        } else {
            this.show();
        }
        if (stopPropagation) {
            e.stopPropagation();
        }
    }

    onLayerClick(e) {
        if (this.bubbleShown) {
            const { onLayerClick } = this.props;
            if (onLayerClick) {
                onLayerClick(e);
            } else {
                this.hide();
            }
        }
    }

    async getPosition() {
        const {
            position,
            coordinates,
            parent,
            removeParentSpace,
            positionOnChildren,
            arrowDistance,
        } = this.props;
        const { position: statePosition, x: stateX, y: stateY } = this.state;

        let x = coordinates ? coordinates.x : 0;
        let top = coordinates ? coordinates.y : 0;
        let bottom = coordinates ? coordinates.y : 0;
        if (this.childrenNode && !coordinates) {
            const rect = this.childrenNode.getBoundingClientRect();
            if (positionOnChildren === ContextMenu.positionOnChildren.LEFT) {
                x = rect.left + arrowDistance;
            } else if (
                positionOnChildren === ContextMenu.positionOnChildren.CENTER
            ) {
                x = rect.left + rect.width / 2;
            } else if (
                positionOnChildren === ContextMenu.positionOnChildren.RIGHT
            ) {
                x = rect.left + rect.width - arrowDistance;
            }
            top = rect.top;
            bottom = rect.bottom;
        }

        let pos = position;
        if (position === null) {
            const posArray =
                x > window.innerWidth / 2
                    ? [
                          ContextMenu.position.TOP_LEFT,
                          ContextMenu.position.BOTTOM_LEFT,
                      ]
                    : [
                          ContextMenu.position.TOP_RIGHT,
                          ContextMenu.position.BOTTOM_RIGHT,
                      ];
            pos =
                (top + bottom) / 2 > window.innerHeight / 2
                    ? posArray[0]
                    : posArray[1];
        }

        let y = Bubble.isPositionBottom(pos) ? bottom : top;
        if (chayns.env.isApp) {
            const { pageYOffset } = await chayns.getWindowMetrics();
            y += pageYOffset;
        }

        if (removeParentSpace) {
            const parentRect = (
                parent ||
                document.getElementsByClassName('tapp')[0] ||
                document.body
            ).getBoundingClientRect();
            x -= parentRect.left;
            y -= parentRect.top;
        }

        if (statePosition !== pos || x !== stateX || y !== stateY) {
            this.setState({
                position: pos,
                x,
                y,
            });
        }
    }

    show() {
        const { disableDialog } = this.props;
        if (!disableDialog && (chayns.env.isMobile || chayns.env.isTablet)) {
            this.showSelectDialog();
        } else {
            this.getPosition();
            this.bubble.show();
            this.bubbleShown = true;
            document.addEventListener('click', this.onLayerClick);
        }
    }

    async showSelectDialog() {
        const { items, onLayerClick } = this.props;
        const list = items.map((item, index) => ({
            name: item.text,
            value: index,
            icon:
                typeof item.icon === 'string'
                    ? item.icon
                    : `fa-${item.icon.iconName}`,
        }));
        const dialogRes = await chayns.dialog.select({
            type: 2,
            list,
            buttons: [],
        });
        if (
            dialogRes.buttonType === 1 &&
            dialogRes.selection &&
            dialogRes.selection[0]
        ) {
            items[dialogRes.selection[0].value].onClick();
        } else if (dialogRes.buttonType === -1 && isFunction(onLayerClick)) {
            onLayerClick();
        }
    }

    hide() {
        if (this.bubble) {
            this.bubble.hide();
        }
        this.bubbleShown = false;
        document.removeEventListener('click', this.onLayerClick);
    }

    render() {
        const {
            items,
            parent,
            children,
            childrenStyle,
            coordinates,
            minWidth,
            maxWidth,
            showTriggerBackground,
            childrenClassName,
            className,
            style,
            stopPropagation,
        } = this.props;

        const { position, x, y } = this.state;

        return [
            <Bubble
                coordinates={{
                    x,
                    y,
                }}
                parent={parent}
                position={position}
                style={{
                    ...{
                        minWidth,
                        maxWidth,
                    },
                    ...style,
                }}
                key="bubble"
                /* eslint-disable-next-line no-return-assign */
                ref={(ref) => (this.bubble = ref)}
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
                                (item.text.props && item.text.props.stringName
                                    ? item.text.props.stringName
                                    : item.text) + index
                            }
                        >
                            {item.icon ? (
                                <div className="context-menu__item__icon">
                                    <Icon icon={item.icon} />
                                </div>
                            ) : null}
                            <div className="context-menu__item__text">
                                {item.text}
                            </div>
                        </li>
                    ))}
                </ul>
            </Bubble>,
            coordinates ? null : (
                <div
                    key="cc__contextMenu__children"
                    /* eslint-disable-next-line no-return-assign */
                    ref={(ref) => (this.childrenNode = ref)}
                    onClick={this.onChildrenClick}
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
            ),
        ];
    }
}

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
     * The coordinates at which the context menu will get rendered.
     */
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),

    /**
     * The action items inside of the context menu. Their shape should look like
     * this: `{ className: <string>, onClick: <function>, text: <string>,
     * icon: <string> }`.
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func,
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
                .isRequired,
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
