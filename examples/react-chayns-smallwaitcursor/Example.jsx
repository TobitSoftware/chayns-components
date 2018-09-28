import React, { Component } from 'react';

import ExampleContainer from '../ExampleContainer';
import { SmallWaitCursor } from '../../src/index';

export default class Example extends Component {
    state = {
        open: true
    };

    render() {
        return(
            <ExampleContainer headline="SmallWaitCursor">
                <h2>inline WaitCursor</h2>
                <SmallWaitCursor
                    show
                />

                <h2>inline WaitCursor</h2>
                <div
                    style={{
                        position: 'relative',
                        height: '200px',
                        backgroundColor: chayns.getSchemeColor()
                    }}
                >
                    <SmallWaitCursor
                        absolute
                        show
                    />
                </div>
            </ExampleContainer>
        );
    }
}
