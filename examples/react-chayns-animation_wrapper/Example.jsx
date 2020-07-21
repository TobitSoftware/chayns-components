import React, { PureComponent } from 'react';
import AnimationWrapper from '../../src/react-chayns-animation_wrapper/component/AnimationWrapper';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
const Content = () => {
    return (
            <div>
                <AnimationWrapper>
                    <div className="content__card content__card--warning">
                        <p>Aktuell werden keine Bestellungen angenommen. Wir sind ab 17:00 Uhr wieder für Dich da.</p>
                    </div>
                </AnimationWrapper>
            </div>
        );
}

export default Content;
