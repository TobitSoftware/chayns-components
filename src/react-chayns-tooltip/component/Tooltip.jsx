/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../../react-chayns-button/component/Button';

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
        children: PropTypes.node.isRequired,
        bindListeners: PropTypes.bool,
        position: PropTypes.number, /** 0 = top right, 1 = bottom right, 2 = bottom left, 3 = top left */
        width: PropTypes.number,
        removeIcon: PropTypes.bool,
    };

    static defaultProps = {
        bindListeners: false,
        position: 0,
        width: 250,
        removeIcon: false,
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
    }

    componentDidMount() {
        const { bindListeners } = this.props;

        if (bindListeners) {
            this.node.addEventListener('mouseover', this.show, false);
            this.node.addEventListener('mouseleave', this.hide, false);
        }
    }

    componentWillUnmount() {
        this.node.removeEventListener('mouseover', this.show, false);
        this.node.removeEventListener('mouseleave', this.hide, false);
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

    render() {
        const {
            children, width, removeIcon, position
        } = this.props;
        const { active, removed } = this.state;

        const className = classnames(`cc__tooltip cc__tooltip--position${position}`, {
            'cc__tooltip--active': active,
        });

        return (
            <div
                className={className}
                ref={(node) => {
                    this.node = node;
                }}
            >

                {!removed && (
                    <div className="cc__tooltip__backLayer">
                        <div className="cc__tooltip__overlay" style={{ width: `${width}px` }}>
                            {
                                removeIcon
                                    ? <div className="cc__tooltip__icon ts-wrong" onClick={this.hide}/>
                                    : null
                            }
                            {this.getContent()}
                        </div>
                    </div>
                )}
                {children}
            </div>
        );
    }
}
