import React from 'react';

import {Swiper, Swipe, SwipeOverlay} from '../../src/react-chayns-swiper/index';
import '../../src/react-chayns-swiper/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {

        return(

            <Swiper
                setHeight={(width) => { return width; }}
                overlay={(
                    <div className="swiper-overlay">
                        <div className="swiper-overlay--title">
                            Technology
                        </div>
                    </div>
                )}
            >
                <Swipe image="http://lorempixel.com/output/technics-q-g-640-480-1.jpg">
                </Swipe>
                <Swipe image="http://lorempixel.com/output/technics-q-g-640-480-7.jpg">
                </Swipe>
                <Swipe
                    image="http://lorempixel.com/output/technics-q-g-640-480-4.jpg"
                    onClick={() => {
                        console.log('click3');
                    }}
                >
                </Swipe>
            </Swiper>
        );
    }
}