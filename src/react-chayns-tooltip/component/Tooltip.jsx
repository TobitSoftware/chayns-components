/* eslint-disable jsx-a11y/click-events-have-key-events,prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import Bubble from '../../react-chayns-bubble/component/Bubble';

export default class Tooltip extends Component {
    static propTypes = {
        content: PropTypes.oneOf([
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
        children: PropTypes.node,
        bindListeners: PropTypes.bool,
        position: PropTypes.number, /** 0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right */
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
        removeIcon: PropTypes.bool,
        parent: PropTypes.instanceOf(Element),
        coordinates: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }),
        childrenStyle: PropTypes.object,
        childrenClassNames: PropTypes.string,
        preventTriggerStyle: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        bindListeners: false,
        position: null,
        minWidth: 100,
        maxWidth: 250,
        removeIcon: chayns.env.isIOS,
        parent: null,
        coordinates: null,
        childrenStyle: null,
        childrenClassNames: null,
        preventTriggerStyle: false,
    };

    static position = Bubble.position;

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
        const { coordinates } = this.props;

        if (prevProps.coordinates !== coordinates) {
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
            nodeArray.unshift(<div
                key={`divImg${this.tooltipKey}`}
                className="cc__tooltip__image"
                style={{ backgroundImage: `url(${content.imageUrl})` }}
            />);
        }
        if (content.headline) {
            nodeArray.unshift(<h5 key={`h5${this.tooltipKey}`}>{content.headline}</h5>);
        }
        if (content.buttonText && content.buttonOnClick) {
            nodeArray.push(
                <div className="cc__tooltip__button" key={`divBtn${this.tooltipKey}`}>
                    <Button
                        onClick={content.buttonOnClick}
                    >
                        {content.buttonText}
                    </Button>
                </div>
            );
        }
        return nodeArray;
    }

    async getPosition() {
        const { position, coordinates } = this.props;
        const { position: statePosition, x: stateX, y: stateY } = this.state;
        let x = coordinates ? coordinates.x : 0;
        let top = coordinates ? coordinates.y : 0;
        let bottom = coordinates ? coordinates.y : 0;
        if (this.childrenWrapper && !coordinates) {
            const rect = this.childrenWrapper.current.getBoundingClientRect();
            x = rect.left + (rect.width / 2);
            top = rect.top;
            bottom = rect.bottom;
        }
        let pos = position;
        if (position === null) {
            const posArray = (x > window.innerWidth / 2)
                ? [Tooltip.position.TOP_LEFT, Tooltip.position.BOTTOM_LEFT]
                : [Tooltip.position.TOP_RIGHT, Tooltip.position.BOTTOM_RIGHT];
            pos = ((top + bottom) / 2 > window.innerHeight / 2) ? posArray[0] : posArray[1];
        }
        let y = Bubble.isPositionBottom(pos) ? bottom : top;
        if (chayns.env.isApp) {
            const { pageYOffset } = await chayns.getWindowMetrics();
            y += pageYOffset;
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
        } = this.props;

        const { position, x, y } = this.state;

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
                    key="bubble"
                    ref={this.bubble}
                >
                    {removeIcon ? (
                        <div className="cc__tooltip__icon" onClick={this.hide}>
                            <Icon icon="ts-wrong"/>
                        </div>
                    ) : null}
                    {this.getContent()}
                </Bubble>
            ) : null,
            <div
                className={classNames({ 'cc__tooltip__children--trigger': !preventTriggerStyle }, 'cc__tooltip__children', childrenClassNames)}
                ref={this.childrenWrapper}
                key={`cc__tooltip__children${this.tooltipKey}`}
                style={childrenStyle}
                onMouseEnter={!chayns.env.isIOS && bindListeners ? this.show : null}
                onMouseLeave={bindListeners ? this.hide : null}
                onClick={chayns.env.isIOS && bindListeners ? this.show : null}
            >
                {children}
            </div>
        ];
    }
}
