import React from 'react';

import {Swiper, Swipe, SwipeOverlay} from '../../src/react-chayns-swiper/index';
import '../../src/react-chayns-swiper/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {

        let elements = [];

        elements.push(
            <Swipe
                className="selectitem__content"
                image="https://iisfs-shop.tobit.com/0/1e4e8073-7576-438a-8d2e-1fd2d8972e71.jpg"
                key="Intro"
            >
            </Swipe>
        );

        elements.push(
            <Swipe
                className="selectitem__content"
                image="https://iisfs-shop.tobit.com/0/1e4e8073-7576-438a-8d2e-1fd2d8972e71.jpg"
                key="test"
            >
            </Swipe>
        );

        elements.push(
            <Swipe
                className="selectitem__content"
                image="https://iisfs-shop.tobit.com/0/1e4e8073-7576-438a-8d2e-1fd2d8972e71.jpg"
                key="test2"
            >
            </Swipe>
        );

        elements.push(null);

        return(

            <Swiper
                overlay={(
                    <div className="swiper-overlay">
                        <div className="swiper-overlay--title">
                            Tests
                        </div>
                    </div>
                )}
                setHeight={(width) => {return width}}
            >
                {
                    elements.map((slide) => {
                        return slide;
                    })
                }
            </Swiper>
        );
    }
}