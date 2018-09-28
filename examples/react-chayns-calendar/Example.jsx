import React, { Component } from 'react';

import { Calendar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(date) {
        console.log(date);
    }

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
                                <Calendar onDateSelect={this.onClick} endDate={new Date()}/>
                            </div>
                        </div>
                    </div>
                    <h2 style={{ marginBottom: '8%' }}>Option 2:</h2>
                    <Calendar onDateSelect={this.onClick}/>
                </div>
            </ExampleContainer>
        );
    }
}
