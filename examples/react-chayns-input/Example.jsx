import React from 'react';

import { Input } from '../../src/react-chayns-input/index';

export default class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            userNameOnBlur: null,
            userNameOnChange: 'heeello',
        }
    }

    render() {
        const { userNameOnBlur, userNameOnChange } = this.state;
        return (
            <div style={{ border: 'solid 1px grey', padding: '5px' }}>
                <h1>Input Example</h1>

                <h3>userNameOnBlur</h3>
                <p>{userNameOnBlur || '-'}</p>

                <h3>userNameOnChange</h3>
                <p>{userNameOnChange || '-'}</p>

                <Input
                    defaultValue="heello i bims 1 invalid default Value ;)"
                    placeholder="Looking for 3 lowercase e's in a row"
                    //regExp=".*e{3}.*"
                    onBlur={(text) => {
                        this.setState({ userNameOnBlur: text })
                    }}
                    onChange={(text) => {
                        this.setState({ userNameOnChange: text })
                    }}
                    responsive={false}
                />
            </div>
        );
    }
}