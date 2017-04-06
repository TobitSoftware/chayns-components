import React from 'react';

import {InspectElementAnimation as InspectElement} from '../../src/react-chayns-animations/index';
import ExampleChild from './ExampleChild';
import '../../src/react-chayns-animations/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <div className="accordion accordion--open" data-group="acc">
                    <div className="accordion__head">Test</div>
                    <div className="accordion__body">
                        <div className="accordion__content">
                            <span style={{margin: '15px'}}>
                                <InspectElement component={ExampleChild} name="Test1" expandedWidth="500px">
                                    test
                                </InspectElement>
                            </span>

                            <span style={{margin: '15px'}}>
                                <InspectElement component={ExampleChild} name="Test2"  expandedWidth={400}>
                                </InspectElement>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="accordion accordion--open" data-group="acc">
                    <div className="accordion__head">Test</div>
                    <div className="accordion__body">
                        <div className="accordion__content">
                            <span style={{margin: '15px'}}>
                                <InspectElement component={ExampleChild} name="Test3">
                                </InspectElement>
                            </span>

                            <span style={{margin: '15px'}}>
                                <InspectElement component={ExampleChild} name="Test4">
                                </InspectElement>
                            </span>
                        </div>
                    </div>
                </div>

                <span style={{margin: '15px'}}>
                    <InspectElement component={ExampleChild} name="Test5">
                    </InspectElement>
                </span>

                <span style={{margin: '15px'}}>
                    <InspectElement component={ExampleChild} name="Test6">
                    </InspectElement>
                </span>
            </div>
        );
    }
}