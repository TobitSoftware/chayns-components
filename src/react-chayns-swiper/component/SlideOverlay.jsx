import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class SlideOverlay extends React.Component {
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
        let className = 'slide__overlay__text slide__overlay__text';
        if(this.props.position) {
            className += `--${this.props.position}`;
        }

        const classNamesTop = classNames({
            slide__overlay: true,
            'slide__overlay--gradient': this.props.gradient
        });

        return(
            <div className={classNamesTop}>
                <div className={className}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
