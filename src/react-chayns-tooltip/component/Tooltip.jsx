/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Bubble from '../../react-chayns-bubble/component/Bubble';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';

/**
 * Wraps a child component and displays a message when the child is hovered or
 * clicked on. Allows to be shown imperatively by calling `.show()` or `.hide()`
 * on its reference.
 */
export default class Tooltip extends Component {
    constructor(props) {
        super(props);

        this.state = { position: null, x: 0, y: 0 };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getPosition = this.getPosition.bind(this);

        this.tooltipKey = Math.random().toString();

        this.bubble = React.createRef();
        this.childrenWrapper = React.createRef();
    }

    componentDidMount() {
        this.getPosition();
    }

    componentDidUpdate(prevProps) {
        const { coordinates, position } = this.props;

        if (
            prevProps.coordinates !== coordinates ||
            prevProps.position !== position
        ) {
            this.getPosition();
        }
    }

    getContent() {
        const { content } = this.props;
        if (content.html) {
            return content.html;
        }
        const nodeArray = [<p key={`p${this.tooltipKey}`}>{content.text}</p>];
        if (content.imageUrl) {
            nodeArray.unshift(
                <div
                    key={`divImg${this.tooltipKey}`}
                    className="cc__tooltip__image"
                    style={{ backgroundImage: `url(${content.imageUrl})` }}
                />
            );
        }
        if (content.headline) {
            nodeArray.unshift(
                <h5 key={`h5${this.tooltipKey}`}>{content.headline}</h5>
            );
        }
        if (content.buttonText && content.buttonOnClick) {
            nodeArray.push(
                <div
                    className="cc__tooltip__button"
                    key={`divBtn${this.tooltipKey}`}
                >
                    <Button onClick={content.buttonOnClick}>
                        {content.buttonText}
                    </Button>
                </div>
            );
        }
        return nodeArray;
    }

    async getPosition() {
        const { position, coordinates, parent, removeParentSpace } = this.props;
        const { position: statePosition, x: stateX, y: stateY } = this.state;
        let x = coordinates ? coordinates.x : 0;
        let top = coordinates ? coordinates.y : 0;
        let bottom = coordinates ? coordinates.y : 0;
        if (this.childrenWrapper && !coordinates) {
            const rect = this.childrenWrapper.current.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            top = rect.top;
            bottom = rect.bottom;
        }
        let pos = position;
        if (position === null) {
            const posArray =
                x > window.innerWidth / 2
                    ? [Tooltip.position.TOP_LEFT, Tooltip.position.BOTTOM_LEFT]
                    : [
                          Tooltip.position.TOP_RIGHT,
                          Tooltip.position.BOTTOM_RIGHT,
                      ];
            pos =
                (top + bottom) / 2 > window.innerHeight / 2
                    ? posArray[0]
                    : posArray[1];
        }
        let y = Bubble.isPositionBottom(pos) ? bottom : top;
        if (typeof chayns !== 'undefined' && chayns.env.isApp) {
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
            this.setState({ position: pos, x, y });
        }
    }

    show() {
        this.getPosition();
        if (this.bubble.current) {
            this.bubble.current.show();
        }
    }

    hide() {
        if (this.bubble.current) {
            this.bubble.current.hide();
        }
    }

    render() {
        const {
            children,
            parent,
            childrenStyle,
            preventTriggerStyle,
            childrenClassNames,
            removeIcon,
            bindListeners,
            minWidth,
            maxWidth,
            hideOnChildrenLeave,
            isIOS,
        } = this.props;

        const { position, x, y } = this.state;

        const ios = typeof chayns !== 'undefined' ? chayns.env.isIOS : isIOS;

        return [
            position !== null ? (
                <Bubble
                    coordinates={{ x, y }}
                    parent={parent}
                    position={position}
                    onMouseEnter={bindListeners ? this.show : null}
                    onMouseLeave={bindListeners ? this.hide : null}
                    style={{
                        minWidth,
                        maxWidth,
                        padding: '12px',
                    }}
                    topDivStyle={{
                        ...(!hideOnChildrenLeave || {
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }),
                    }}
                    key="bubble"
                    ref={this.bubble}
                >
                    {removeIcon ? (
                        <div className="cc__tooltip__icon" onClick={this.hide}>
                            <Icon icon="fa fa-times" />
                        </div>
                    ) : null}
                    {this.getContent()}
                </Bubble>
            ) : null,
            <div
                className={classNames(
                    { 'cc__tooltip__children--trigger': !preventTriggerStyle },
                    'cc__tooltip__children',
                    childrenClassNames
                )}
                ref={this.childrenWrapper}
                key={`cc__tooltip__children${this.tooltipKey}`}
                style={childrenStyle}
                onMouseEnter={!ios && bindListeners ? this.show : null}
                onMouseLeave={bindListeners ? this.hide : null}
                onClick={ios && bindListeners ? this.show : null}
            >
                {children}
            </div>,
        ];
    }
}

Tooltip.position = Bubble.position;

Tooltip.propTypes = {
    /**
     * The content of the tooltip. Either specify an object with the accepted
     * properties or render custom elements by passing an object like so:
     * `{ html: <div /> }`.
     */
    content: PropTypes.oneOfType([
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            headline: PropTypes.string,
            imageUrl: PropTypes.string,
            buttonText: PropTypes.string,
            buttonOnClick: PropTypes.func,
        }),
        PropTypes.shape({
            html: PropTypes.node.isRequired,
        }),
    ]).isRequired,

    /**
     * The `ReactNode` the tooltip should refer to. If the `children` node is a
     * `<span>` or `<p>` element, it will be decorated with a dotted underline.
     */
    children: PropTypes.node,

    /**
     * Wether `mouseover` and `mouseleave` listeners should be added to the
     * children elements, which makes the tooltip automatically appear on hover.
     */
    bindListeners: PropTypes.bool,

    /**
     * The position of the tooltip. `0` is top left, `1` is bottom left, `2` is
     * bottom right and `3` is top right.
     */
    position: PropTypes.number,

    /**
     * The minimum width of the tooltip.
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width of the tooltip.
     */
    maxWidth: PropTypes.number,

    /**
     * Wether the close icon in the top right corner of the tooltip should be
     * shown.
     */
    removeIcon: PropTypes.bool,

    /**
     * A DOM node the tooltip should be rendered into.
     */
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},

    /**
     * An object with coordinates at which the tooltip should point.
     */
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),

    /**
     * A React style object that is applied to the children.
     */
    childrenStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A classname string that should be applied to the children.
     */
    childrenClassNames: PropTypes.string,

    /**
     * Prevent adding an underline to the children.
     */
    preventTriggerStyle: PropTypes.bool,

    /**
     * Hide the tooltip when the cursor leaves the children, even if the cursor
     * is over the bubble.
     */
    hideOnChildrenLeave: PropTypes.bool,

    /**
     * Removes any padding of the page from the tooltip position. This is only
     * needed when the parent is padded to the page and is relatively
     * positioned.
     */
    removeParentSpace: PropTypes.bool,

    /**
     * Wether the target device is iOS when serverside rendering.
     */
    isIOS: PropTypes.bool,
};

Tooltip.defaultProps = {
    children: null,
    bindListeners: false,
    position: null,
    minWidth: 100,
    maxWidth: 250,
    removeIcon: typeof chayns !== 'undefined' ? chayns.env.isIOS : false,
    parent: null,
    coordinates: null,
    childrenStyle: null,
    childrenClassNames: null,
    preventTriggerStyle: false,
    hideOnChildrenLeave: false,
    removeParentSpace: false,
    isIOS: typeof chayns !== 'undefined' ? chayns.env.isIOS : false,
};

Tooltip.displayName = 'Tooltip';
