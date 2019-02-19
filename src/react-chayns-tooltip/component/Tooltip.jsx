/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

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
        position: 0,
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

        this.state = {
            active: false,
            removed: true,
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.renderTooltip = this.renderTooltip.bind(this);

        this.firstRender = true;

        this.tooltipKey = Math.random().toString();
    }

    componentDidMount() {
        const { bindListeners } = this.props;

        if (bindListeners) {
            this.childrenNode.addEventListener('mouseover', this.show, false);
            this.childrenNode.addEventListener('mouseleave', this.hide, false);
            this.tooltipNode.addEventListener('mouseover', this.show, false);
            this.tooltipNode.addEventListener('mouseleave', this.hide, false);
        }

        if (this.firstRender) {
            this.firstRender = false;
            this.getCoordinates();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { coordinates, children } = this.props;

        if (nextProps.coordinates !== coordinates || nextProps.children !== children) {
            this.getCoordinates();
        }
    }

    componentWillUnmount() {
        this.childrenNode.removeEventListener('mouseover', this.show, false);
        this.childrenNode.removeEventListener('mouseleave', this.hide, false);
        this.tooltipNode.removeEventListener('mouseover', this.show, false);
        this.tooltipNode.removeEventListener('mouseleave', this.hide, false);
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

    show() {
        window.clearTimeout(this.timeout);

        this.setState({
            active: false,
            removed: false,
        });

        this.timeout = window.setTimeout(() => {
            this.setState({
                active: true,
                removed: false,
            });
        });
    }

    hide() {
        this.setState({
            active: false,
            removed: false,
        });

        this.timeout = window.setTimeout(() => {
            this.setState({
                active: false,
                removed: true,
            });
        }, 500);
    }

    renderTooltip() {
        const {
            minWidth, maxWidth, removeIcon, position
        } = this.props;
        const {
            active, removed
        } = this.state;
        const { x, y } = this.getCoordinates();

        return (
            <div
                className={classNames(`cc__tooltip cc__tooltip--position${position}`, {
                    'cc__tooltip--active': active,
                })}
                style={{ ...{ top: `${y}px` }, ...(position < 2 ? { right: `-${x}px`, } : { left: `${x}px`, }) }}
                ref={(node) => {
                    this.tooltipNode = node;
                }}
                key={`cc__tooltip${this.tooltipKey}`}
            >
                {!removed && (
                    <div
                        className="cc__tooltip__overlay"
                        style={{ minWidth: `${minWidth}px`, maxWidth: `${maxWidth}px` }}
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
                    </div>
                )}
            </div>
        );
    }

    render() {
        const {
            children, parent, childrenStyle, preventTriggerStyle, childrenClassNames
        } = this.props;

        return [
            <TappPortal parent={parent}>
                {this.renderTooltip()}
            </TappPortal>,
            <div
                className={classNames({ 'cc__tooltip__children--trigger': !preventTriggerStyle }, 'cc__tooltip__children', childrenClassNames)}
                ref={(node) => {
                    this.childrenNode = node;
                }}
                key={`cc__tooltip__children${this.tooltipKey}`}
                style={childrenStyle}
            >
                {children}
            </div>
        ];
    }
}
