import React from 'react';

import { SmallWaitCursor } from '../../src/index';
import '../../src/react-chayns-smallwaitcursor/index.scss';

export default class Example extends React.Component {
    state = {
        open: true
    };

    render() {
        return(
            <div style={{ border: '1px solid black' }}>
                <h1>SmallWaitCursor</h1>

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
            </div>
        );
    }
}
