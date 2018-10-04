import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import { SmallWaitCursor } from '../../src/index';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="SmallWaitCursor">
                <SmallWaitCursor
                    show
                />
                <div
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className="chayns__background-color--white-4"
                >
                    <SmallWaitCursor
                        show
                    />
                </div>
                <div
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}
                >
                    <SmallWaitCursor
                        show
                        showBackground={false}
                    />
                </div>
            </ExampleContainer>
        );
    }
}
