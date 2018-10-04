import React, { PureComponent } from 'react';

import { Calendar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {

    render() {
        return(
            <ExampleContainer headline="Calendar">
                <div className="content" style={{ position: 'relative', overflow: 'hidden', height: '700px', border: '1px solid black' }}>
                    <h2 style={{ marginBottom: '8%' }}>Option 1:</h2>
                    <div className="accordion accordion--open">
                        <div className="accordion__head">
                            Calendar
                        </div>
                        <div className="accordion__body">
                            <div className="accordion__content" style={{ minHeight: '200px' }}>
                                <Calendar onDateSelect={console.log} endDate={new Date()}/>
                            </div>
                        </div>
                    </div>
                    <h2 style={{ marginBottom: '8%' }}>Option 2:</h2>
                    <Calendar onDateSelect={console.log}/>
                </div>
            </ExampleContainer>
        );
    }
}
