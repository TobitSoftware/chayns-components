/* eslint-disable jsx-a11y/click-events-have-key-events */
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
        parent: PropTypes.node,
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
        removeIcon: false,
        parent: null,
        coordinates: null,
        childrenStyle: null,
        childrenClassNames: null,
        preventTriggerStyle: false,
    };

    constructor(props) {
        super(props);

        this.state = { position: null };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.getPosition = this.getPosition.bind(this);

        this.tooltipKey = Math.random().toString();
    }

    componentDidMount() {
        this.getCoordinates();
        this.getPosition();
    }

    componentDidUpdate(prevProps) {
        const { coordinates } = this.props;

        if (prevProps.coordinates !== coordinates) {
            this.getCoordinates();
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
            const posArray = (x > window.innerWidth / 2) ? [0, 1] : [3, 2];
            const pos = (y > window.innerHeight / 2) ? posArray[0] : posArray[1];
            if (statePosition !== pos) {
                this.setState({ position: pos });
            }
        }
    }

    show() {
        this.bubble.show();
    }

    hide() {
        this.bubble.hide();
    }

    render() {
        const {
            children, parent, childrenStyle, preventTriggerStyle, childrenClassNames, removeIcon, bindListeners, minWidth, maxWidth
        } = this.props;

        const { position } = this.state;

        return [
            typeof position === 'number'
                ? (
                    <Bubble
                        coordinates={this.getCoordinates()}
                        parent={parent}
                        position={position}
                        onMouseEnter={bindListeners ? this.show : null}
                        onMouseLeave={bindListeners ? this.hide : null}
                        style={{ minWidth, maxWidth, padding: '12px' }}
                        key="bubble"
                        ref={ref => this.bubble = ref}
                    >
                        {
                            removeIcon
                                ? (
                                    <div className="cc__tooltip__icon" onClick={this.hide}>
                                        <Icon icon="ts-wrong"/>
                                    </div>
                                )
                                : null
                        }
                        {this.getContent()}
                    </Bubble>
                )
                : null,
            <div
                className={classNames({ 'cc__tooltip__children--trigger': !preventTriggerStyle }, 'cc__tooltip__children', childrenClassNames)}
                ref={(node) => {
                    this.childrenNode = node;
                }}
                key={`cc__tooltip__children${this.tooltipKey}`}
                style={childrenStyle}
                onMouseOver={bindListeners ? this.show : null}
                onMouseLeave={bindListeners ? this.hide : null}
            >
                {children}
            </div>
        ];
    }
}
