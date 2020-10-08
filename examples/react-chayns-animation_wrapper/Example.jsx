import React from 'react';
import AnimationWrapper from '../../src/react-chayns-animation_wrapper/component/AnimationWrapper';

const Content = () => (
    <div>
        <AnimationWrapper>
            <div className="content__card content__card--warning">
                <p>
                    Aktuell werden keine Bestellungen angenommen. Wir sind ab
                    17:00 Uhr wieder für Dich da.
                </p>
            </div>
        </AnimationWrapper>
    </div>
);

export default Content;
