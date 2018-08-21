import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Tooltip extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        children: PropTypes.node,
        bindListeners: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        bindListeners: false,
    };

    constructor() {
        super();

        this.state = {
            active: false,
            removed: true,
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount() {
        const { bindListeners } = this.props;

        if(bindListeners) {
            this.node.addEventListener('mouseover', this.show, false);
            this.node.addEventListener('mouseleave', this.hide, false);
        }

        this.show();
    }

    componentWillUnmount() {
        this.node.removeEventListener('mouseover', this.show, false);
        this.node.removeEventListener('mouseleave', this.hide, false);
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
            children,
            text,
        } = this.props;
        const { active, removed } = this.state;

        const className = classnames('cc__tooltip', {
            'cc__tooltip--active': active,
        });

        return(
            <div
                className={className}
                ref={(node) => { this.node = node; }}
            >
                {!removed && (
                    <div
                        className="cc__tooltip__overlay"
                    >
                        {text}
                    </div>
                )}
                {children}
            </div>
        );
    }
}
