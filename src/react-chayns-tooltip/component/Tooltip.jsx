/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as ReactDOM from 'react-dom';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';

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
        position: PropTypes.number, /** 0 = top right, 1 = bottom right, 2 = bottom left, 3 = top left */
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
        removeIcon: PropTypes.bool,
        parent: PropTypes.node,
        coordinates: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }),
    };

    static defaultProps = {
        children: null,
        bindListeners: false,
        position: 0,
        minWidth: 250,
        maxWidth: 250,
        removeIcon: false,
        parent: document.getElementsByClassName('tapp')[0],
        coordinates: null,
    };

    constructor() {
        super();

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
        const nodeArray = [<p>{content.text}</p>];
        if (content.imageUrl) {
            nodeArray.unshift(<div
                className="cc__tooltip__image"
                style={{ backgroundImage: `url(${content.imageUrl})` }}
            />);
        }
        if (content.headline) {
            nodeArray.unshift(<h5>{content.headline}</h5>);
        }
        if (content.buttonText && content.buttonOnClick) {
            nodeArray.push(
                <div className="cc__tooltip__button">
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
        } if (this.childrenNode) {
            const rect = this.childrenNode.getBoundingClientRect();
            return {
                x: rect.x + (rect.width / 2),
                y: (position === 1 || position === 2) ? rect.y + rect.height : rect.y,
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
                style={{ left: `${x}px`, top: `${y}px` }}
                ref={(node) => {
                    this.tooltipNode = node;
                }}
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
        const { children, parent } = this.props;

        return [
            ReactDOM.createPortal(
                this.renderTooltip(),
                parent
            ),
            <div
                className="cc__tooltip__children"
                ref={(node) => {
                    this.childrenNode = node;
                }}
                key="cc__tooltip__children"
            >
                {children}
            </div>
        ];
    }
}
