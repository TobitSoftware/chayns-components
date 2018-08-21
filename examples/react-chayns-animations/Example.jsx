import React, { Component } from 'react';

import ExampleContainer from '../ExampleContainer';
import InspectElementExample from './InspectElementExample';
import ScaleInExample from './ScaleInExample';

import '../../src/react-chayns-animations/index.scss';
import '../../src/react-chayns-animations/component/ScaleIn/index.scss';

export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="Animations" >
                <div className="accordion">
                    <div className="accordion__head">InspectElement</div>
                    <div className="accordion__body">
                        <InspectElementExample />
                    </div>
                </div>

                <div className="accordion">
                    <div className="accordion__head">ScaleIn</div>
                    <div className="accordion__body">
                        <ScaleInExample />
                    </div>
                </div>
            </ExampleContainer>
        );
    }
}
