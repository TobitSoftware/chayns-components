/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';

import ExampleContainer from '../ExampleContainer';
import { SmallWaitCursor } from '../../src/index';

export default class SmallWaitCursorExample extends Component {
    constructor(props) {
        super(props);
        this.state = { show: true };
    }

    render() {
        const { show } = this.state;
        return (
            <ExampleContainer
                headline="SmallWaitCursor"
                id="react-chayns-smallwaitcursor"
            >
                <SmallWaitCursor
                    show={show}
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
                    onClick={() => {
                        this.setState({ show: !show });
                    }}
                >
                    <SmallWaitCursor
                        show={show}
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
                        show={show}
                        showBackground={false}
                    />
                </div>
            </ExampleContainer>
        );
    }
}
