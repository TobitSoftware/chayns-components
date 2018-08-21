import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class SlideOverlay extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.arrayOf(PropTypes.object)
            ]).isRequired,
        position: PropTypes.string,
        gradient: PropTypes.bool
    };

    static defaultProps = {
        position: null,
        gradient: null
    };

    constructor() {
        super();

        console.warn('SlideOverlay is marked as deprecated');
    }

    render() {
        const { position, gradient, children } = this.props;

        const className = classNames({
            slide__overlay__text: true,
            [`slide__overlay__text--${position}`]: position,
        });

        const classNamesTop = classNames({
            slide__overlay: true,
            'slide__overlay--gradient': gradient,
        });

        return(
            <div className={classNamesTop}>
                <div className={className}>
                    {children}
                </div>
            </div>
        );
    }
}
