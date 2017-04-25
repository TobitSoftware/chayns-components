import React from 'react';

export default class Slide extends React.Component {
    static propTypes = {
        image: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func
    };

    componentWillMount() {
        if(!window.react) {
            window.react = {};
        }

        if(!window.react.slider) {
            window.react.slider = {
                callbacks: [

                ]
            };
        }

        if(this.props.onClick) {
            this._callbackId = window.react.slider.callbacks.length;
            window.react.slider.callbacks.push(this.props.onClick);
        }
    }

    render() {
        return(
            <div
                style={{
                    backgroundImage: `url('${this.props.image}')`
                }}
                className="swiper-slide"
                data-callbackid={this._callbackId}
                ref={(div) => this._div = div}>
                {this.props.children}
            </div>
        );
    }
}