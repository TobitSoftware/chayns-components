import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* global Swiper */

export default class App extends React.Component {
    static propTypes = {
        autoplay: PropTypes.number,
        loop: PropTypes.bool,
        lazyLoading: PropTypes.bool,
        preloadImages: PropTypes.bool,
        setHeight: PropTypes.func,
        overlay: PropTypes.node,
        className: PropTypes.string,
        children: PropTypes.node,
        length: PropTypes.number,
    };

    static defaultProps = {
        loop: true,
        autoplay: null,
        lazyLoading: null,
        preloadImages: null,
        setHeight: null,
        overlay: null,
        className: null,
        children: null,
        length: null,
    };

    constructor() {
        super();

        window.addEventListener('resize', () => {
            this._onResize();
        }, true);

        this._swiper = null;

        this.state = {
            // eslint-disable-next-line react/no-unused-state
            swiperLoaded: false
        };
    }

    componentDidMount() {
        this._updateSwiper();


        const elements = this._swiperElement.querySelectorAll('.swiper-slide');
        for(let i = 0, x = elements.length; i < x; i += 1) {
            elements[i].addEventListener('click', (event) => {
                if(elements[i].dataset && elements[i].dataset.callbackid) {
                    const { callbackid } = elements[i].dataset;

                    if(callbackid && window.react && window.react.slider && window.react.slider.callbacks && window.react.slider.callbacks[callbackid]) {
                        window.react.slider.callbacks[callbackid](event);
                    }
                }
            }, false);
        }
    }

    componentDidUpdate() {
        this._updateSwiper();
    }

    _updateSwiper() {
        if (this._swiper) {
            if(this._swiper.destroy) {
                this._swiper.destroy();
            }

            this._swiper = null;
        }


        if(window.chayns.utils.isArray(this.props.children) && this.props.children.length > 1 && (!this.props.length || this.props.length > 1)) {
            this._swiper = new Swiper(this._swiperElement, {
                spaceBetween: 10,
                loop: this.props.loop,
                grabCursor: false,
                pagination: this._paginationElement,
                paginationClickable: true,
                autoplay: this.props.autoplay,
                autoplayDisableOnInteraction: false,
                preloadImages: this.props.preloadImages,
                lazyLoading: this.props.lazyLoading || false,
                paginationBulletRender: (index, className) => {
                    return `<span class="swiper-pagination-bullet ${className}" style="background-color: ${window.chayns.env.site.color} !important"></span>`;
                }
            });
        } else {
            window.setTimeout(() => {
                this._swiperElement.classList.add('swiper-slide-active');
                this._swiperElement.classList.add('swiper--single-slide');
            }, 0);
        }

        this._onResize();
    }

    _onResize() {
        if(this._swiperElement) {
            const { width } = this._swiperElement.getBoundingClientRect();
            const height = this._getHeight(width);

            this._swiperElement.style.height = `${height}px`;
        }
    }

    _getHeight(width) {
        if(this.props.setHeight) {
            return this.props.setHeight(width);
        }

        return (9 / 16) * width;
    }

    render() {
        const className = classNames({
            'swiper-container': true,
            'swiper-container-horizontal': true,
            [this.props.className]: this.props.className
        });

        return (
            <div
                className={className}
            >
                <div
                    ref={(swiper) => { this._swiperElement = swiper; }}
                    className="swiper-overlay--wrapper"
                >
                    {this.props.overlay}
                    <div className="swiper-wrapper">
                        {this.props.children}
                    </div>
                </div>
                <div
                    className="swiper-pagination"
                    ref={(pagination) => { this._paginationElement = pagination; }}
                />
            </div>
        );
    }
}
