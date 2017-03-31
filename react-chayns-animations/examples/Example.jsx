import React from 'react';

import {InspectElementAnimation as InspectElement} from '../src/index';
import ExampleChild from './ExampleChild';
import '../src/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <span style={{margin: '15px'}}>
                    <InspectElement component={ExampleChild} name="Test1">
                        test
                    </InspectElement>
                </span>

                <span style={{margin: '15px'}}>
                    <InspectElement component={ExampleChild} name="Test2">
                    </InspectElement>
                </span>

                <span style={{margin: '15px'}}>
                    <InspectElement component={ExampleChild} name="Test3">
                    </InspectElement>
                </span>

                <span style={{margin: '15px'}}>
                    <InspectElement component={ExampleChild} name="Test4">
                    </InspectElement>
                </span>

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