/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ContextMenu extends Component {
    static propTypes = {
        hide: PropTypes.bool,
        onLayerClick: PropTypes.func,
        x: PropTypes.number,
        y: PropTypes.number,
        items: PropTypes.arrayOf(PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func,
            text: PropTypes.string
        })),
        position: PropTypes.number, /** 0 = top right, 1 = bottom right, 2 = bottom left, 3 = top left */
    };

    static defaultProps = {
        hide: true,
        onLayerClick: null,
        x: 0,
        y: 0,
        items: [],
        position: 0,
    };

    constructor() {
        super();
        this.state = { displayNone: true };
    }

    componentWillReceiveProps(nextProps) {
        const { hide } = this.props;
        if (nextProps.hide && !hide) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.setState({ displayNone: true });
            }, 350);
        } else if (!nextProps.hide && hide) {
            clearTimeout(this.timeout);
            this.setState({ displayNone: false });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const {
            hide, onLayerClick, x, y, items, position
        } = this.props;

        const { displayNone } = this.state;

        return (
            <div
                className={classNames('context-menu-overlay', {
                    'context-menu-overlay--hide': hide && displayNone,
                    'context-menu-overlay--active': !hide,
                })}
                onClick={onLayerClick}
            >
                <ul
                    style={{
                        left: x,
                        top: y,
                    }}
                    className={classNames('context-menu', `context-menu--position${position}`, { 'context-menu--active': !hide })}
                >
                    {items.map(item => (
                        <li
                            className={classNames('context-menu__item', item.className)}
                            onClick={item.onClick}
                            key={item.text}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
