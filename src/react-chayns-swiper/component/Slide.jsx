import React from 'react';
import PropTypes from 'prop-types';

export default class Slide extends React.Component {
    static propTypes = {
        image: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        children: PropTypes.node,
    };

    static defaultProps = {
        onClick: null,
        children: null,
    };

    componentWillMount() {
        const { onClick } = this.props;

        if(!window.react) {
            window.react = {};
        }

        if(!window.react.slider) {
            window.react.slider = {
                callbacks: [

                ]
            };
        }

        if(onClick) {
            this._callbackId = window.react.slider.callbacks.length;
            window.react.slider.callbacks.push(onClick);
        }
    }

    render() {
        const { children, image } = this.props;

        return(
            <div
                style={{
                    backgroundImage: `url('${image}')`
                }}
                className="swiper-slide"
                data-callbackid={this._callbackId}
                ref={(div) => { this._div = div; }}
            >
                {children}
            </div>
        );
    }
}
