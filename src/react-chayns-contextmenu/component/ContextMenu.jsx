/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign,prefer-destructuring,react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';
import Bubble from '../../react-chayns-bubble/component/Bubble';

export default class ContextMenu extends Component {
    static propTypes = {
        onLayerClick: PropTypes.func,
        coordinates: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }),
        items: PropTypes.arrayOf(PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func,
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)]),
        })),
        position: PropTypes.number, /** 0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right */
        parent: PropTypes.instanceOf(Element),
        children: PropTypes.node,
        onChildrenClick: PropTypes.func,
        childrenStyle: PropTypes.object,
        childrenClassName: PropTypes.string,
        stopPropagation: PropTypes.bool,
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
        showTriggerBackground: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        removeParentSpace: PropTypes.bool,
    };

    static defaultProps = {
        onLayerClick: null,
        items: [],
        position: null,
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
    };

    static position = Bubble.position;

    constructor(props) {
        super(props);

        this.state = { position: null, x: 0, y: 0 };

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
        const { coordinates, position } = this.props;

        if (prevProps.coordinates !== coordinates || prevProps.position !== position) {
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
        } else if (chayns.env.isMobile || chayns.env.isTablet) {
            this.showSelectDialog();
        } else { this.show(); }
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
            position, coordinates, parent, removeParentSpace,
        } = this.props;
        const { position: statePosition, x: stateX, y: stateY } = this.state;

        let x = coordinates ? coordinates.x : 0;
        let top = coordinates ? coordinates.y : 0;
        let bottom = coordinates ? coordinates.y : 0;
        if (this.childrenNode && !coordinates) {
            const rect = this.childrenNode.getBoundingClientRect();
            x = rect.left + (rect.width / 2);
            top = rect.top;
            bottom = rect.bottom;
        }

        let pos = position;
        if (position === null) {
            const posArray = (x > window.innerWidth / 2)
                ? [ContextMenu.position.TOP_LEFT, ContextMenu.position.BOTTOM_LEFT]
                : [ContextMenu.position.TOP_RIGHT, ContextMenu.position.BOTTOM_RIGHT];
            pos = ((top + bottom) / 2 > window.innerHeight / 2) ? posArray[0] : posArray[1];
        }

        let y = Bubble.isPositionBottom(pos) ? bottom : top;
        if (chayns.env.isApp) {
            const { pageYOffset } = await chayns.getWindowMetrics();
            y += pageYOffset;
        }

        if (removeParentSpace) {
            const parentRect = (parent || document.getElementsByClassName('tapp')[0] || document.body).getBoundingClientRect();
            x -= parentRect.left;
            y -= parentRect.top;
        }

        if (statePosition !== pos || x !== stateX || y !== stateY) {
            this.setState({ position: pos, x, y });
        }
    }

    show() {
        this.getPosition();
        this.bubble.show();
        this.bubbleShown = true;
        document.addEventListener('click', this.onLayerClick);
    }


    async showSelectDialog() {
        const { items } = this.props;
        const list = items.map((item, index) => ({ name: item.text, value: index, icon: (typeof item.icon === 'string' ? item.icon : `fa-${item.icon.iconName}`) }));
        const dialogRes = await chayns.dialog.select({
            type: 2,
            list,
            buttons: [],
        });
        if (dialogRes.buttonType === 1 && dialogRes.selection && dialogRes.selection[0]) {
            items[dialogRes.selection[0].value].onClick();
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
                coordinates={{ x, y }}
                parent={parent}
                position={position}
                style={{ ...{ minWidth, maxWidth }, ...style }}
                key="bubble"
                ref={ref => this.bubble = ref}
                className={className}
            >
                <ul>
                    {items.map((item, index) => (
                        <li
                            className={classNames('context-menu__item', item.className)}
                            onClick={(e) => {
                                if (stopPropagation) {
                                    e.stopPropagation();
                                }
                                item.onClick(e);
                            }}
                            key={(item.text.props && item.text.props.stringName ? item.text.props.stringName : item.text) + index}
                        >
                            {item.icon ? (
                                <div className="context-menu__item__icon"><Icon icon={item.icon} /></div>
                            ) : null}
                            <div className="context-menu__item__text">
                                {item.text}
                            </div>
                        </li>
                    ))}
                </ul>
            </Bubble>,
            coordinates
                ? null
                : (
                    <div
                        key="cc__contextMenu__children"
                        ref={ref => this.childrenNode = ref}
                        onClick={this.onChildrenClick}
                        style={childrenStyle}
                        className={classNames(childrenClassName, 'accordion--no-trigger', 'context-menu__children', { 'image-tool': showTriggerBackground })}
                    >
                        {children}
                    </div>
                ),
        ];
    }
}
