/* eslint-disable jsx-a11y/click-events-have-key-events */
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
            text: PropTypes.string.isRequired,
            icon: PropTypes.object,
        })),
        position: PropTypes.number, /** 0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right */
        parent: PropTypes.node,
        children: PropTypes.node,
        onChildrenClick: PropTypes.func,
        childrenStyle: PropTypes.object,
        stopPropagation: PropTypes.bool,
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
    };

    static defaultProps = {
        onLayerClick: null,
        items: [],
        position: null,
        parent: null,
        children: <Icon icon="ts-ellipsis_v"/>,
        coordinates: null,
        onChildrenClick: null,
        childrenStyle: null,
        stopPropagation: false,
        minWidth: null,
        maxWidth: null,
    };

    constructor(props) {
        super(props);

        this.state = { position: 0 };

        this.getCoordinates = this.getCoordinates.bind(this);
        this.onChildrenClick = this.onChildrenClick.bind(this);
        this.onLayerClick = this.onLayerClick.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { coordinates } = this.props;
        if(prevProps.coordinates && coordinates) {
            const { x, y } = prevProps.coordinates;
            if(coordinates.x !== x || coordinates.y !== y) {
                this.getPosition();
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        document.removeEventListener('click', this.onLayerClick);
    }

    onChildrenClick(e) {
        const { onChildrenClick, stopPropagation } = this.props;
        if (onChildrenClick) {
            onChildrenClick(e);
        } else {
            this.show();
        }
        if (stopPropagation) e.stopPropagation();
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

    getCoordinates() {
        const { coordinates, position } = this.props;
        if (coordinates) {
            return coordinates;
        }
        if (this.childrenNode) {
            const rect = this.childrenNode.getBoundingClientRect();
            return {
                x: rect.left + (rect.width / 2),
                y: (position === 1 || position === 2) ? rect.bottom : rect.top,
            };
        }
        return { x: 0, y: 0 };
    }

    getPosition() {
        const { position } = this.props;
        const { position: statePosition } = this.state;
        if (typeof position === 'number') {
            this.setState({ position });
        } else {
            const { x, y } = this.getCoordinates();
            let pos = (x > window.innerWidth / 2) ? [0, 1] : [3, 2];
            pos = (y > window.innerHeight / 2) ? pos[0] : pos[1];
            if (statePosition !== pos) {
                this.setState({ position: pos });
            }
        }
    }

    show() {
        this.getPosition();
        this.bubble.show();
        this.bubbleShown = true;
        document.addEventListener('click', this.onLayerClick);
    }

    hide() {
        this.bubble.hide();
        this.bubbleShown = false,
        document.removeEventListener('click', this.onLayerClick);
    }

    render() {
        const {
            items, parent, children, childrenStyle, coordinates, minWidth, maxWidth
        } = this.props;

        const { position } = this.state;

        return [
            <Bubble
                coordinates={this.getCoordinates()}
                parent={parent}
                position={position}
                style={{ minWidth, maxWidth }}
                key="bubble"
                ref={ref => this.bubble = ref}
            >
                <ul>
                    {items.map(item => (
                        <li
                            className={classNames('context-menu__item', item.className)}
                            onClick={item.onClick}
                            key={item.text}
                        >
                            {item.icon ? (
                                <div className="context-menu__item__icon"><Icon icon={item.icon}/></div>
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
                        // eslint-disable-next-line no-return-assign
                        ref={ref => this.childrenNode = ref}
                        onClick={this.show}
                        style={childrenStyle}
                        className="accordion--no-trigger context-menu__children"
                    >
                        {children}
                    </div>
                )
        ];
    }
}
