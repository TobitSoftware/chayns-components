import React from 'react';
import classNames from 'classnames';


export default class SlideOverlay extends React.Component {
    static propTypes = {
        children: React.PropTypes.oneOfType([
                React.PropTypes.object,
                React.PropTypes.arrayOf(React.PropTypes.object)
            ]).isRequired,
        position: React.PropTypes.string,
        gradient: React.PropTypes.bool
    };

    constructor() {
        super();

        console.warn('SlideOverlay is marked as deprecated');
    }

    render() {
        let className = "slide__overlay__text slide__overlay__text";
        if(this.props.position) {
            className += `--${this.props.position}`;
        }

        let classNamesTop = classNames({
            'slide__overlay': true,
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