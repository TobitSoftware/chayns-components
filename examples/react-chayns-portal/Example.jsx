import React from 'react';

import ExampleContainer from '../ExampleContainer';
import { Portal } from '../../src/index';

export default class PortalExample extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 0,
        };

        window.setInterval(() => {
            this.setState({
                count: this.state.count + 1,
            });
        }, 1000);
    }

    render() {
        return (
            <ExampleContainer headline="Portal">
                <Portal name="example-1" />
                <div>
                    Placeholder
                </div>
                <Portal name="example-1">
                    Hello Portal! <br />
                    Count: {this.state.count}
                </Portal>
                <hr />
                <div
                    style={{
                        height: '50px',
                    }}
                >
                    <Portal name="example-2" />
                    <div>
                        Placeholder
                    </div>
                    {!!(this.state.count % 2) && (
                        <Portal
                            name="example-2"
                        >
                            Blink
                        </Portal>
                    )}
                </div>
            </ExampleContainer>
        );
    }
}
