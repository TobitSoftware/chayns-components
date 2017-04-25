import React from 'react';
import classNames from 'classnames';

export default class App extends React.Component {

    static propTypes = {
        autoplay: React.PropTypes.number,
        loop: React.PropTypes.bool,
        lazyLoading: React.PropTypes.bool,
        preloadImages: React.PropTypes.bool,
        setHeight: React.PropTypes.func,
        overlay: React.PropTypes.node
    };

    static defaultProps = {
        loop: true
    };

    constructor() {
        super();

        window.addEventListener('resize', () => {
            this._onResize();
        }, true);

        this._swiper = null;

        this.state = {
            swiperLoaded: false
        };
    }

    render() {
        let className = classNames({
            'swiper-container': true,
            'swiper-container-horizontal': true,
            [this.props.className]: this.props.className
        });

        return (
            <div
                className={className}
            >
                <div
                    ref={(swiper) => this._swiperElement = swiper}
                    className="swiper-overlay--wrapper"
                >
                    {this.props.overlay}
                    <div className="swiper-wrapper">
                        {this.props.children}
                    </div>
                </div>
                <div
                    className="swiper-pagination"
                    ref={(pagination) => this._paginationElement = pagination}
                />
            </div>
        );
    }

    componentDidMount() {
        this._updateSwiper();


        let elements = this._swiperElement.querySelectorAll(".swiper-slide");
        for(let i = 0, x = elements.length; i < x; i++) {
            elements[i].addEventListener('click', (event) => {

                if(elements[i].dataset && elements[i].dataset.callbackid) {

                    let callbackid = elements[i].dataset.callbackid;

                    if(callbackid && window.react && window.react.slider && window.react.slider.callbacks && window.react.slider.callbacks[callbackid]) {
                        window.react.slider.callbacks[callbackid](event);
                    }
                }
            }, false);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this._updateSwiper();
    }

    _updateSwiper() {
        if (this._swiper) {
            if(this._swiper.destroy)
                this._swiper.destroy();

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
                paginationBulletRender: function (index, className) {
                    return '<span class="swiper-pagination-bullet ' + className + ' " style="background-color: ' + window.chayns.env.site.color + ' !important"></span>';
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
            let width = this._swiperElement.getBoundingClientRect().width;
            let height = this._getHeight(width);

            this._swiperElement.style.height = height + 'px';
        }
    }

    _getHeight(width) {
        if(this.props.setHeight) {
            return this.props.setHeight(width);
        }

        return (9/16) * width;
    }

}
