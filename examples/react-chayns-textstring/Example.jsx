import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import { TextString } from '../../src/index';

export default class Example extends PureComponent {
    constructor(props) {
        super(props);
        // Take a look in index.jsx
        console.log('TextString.getTextString', TextString.getTextString('txt_chayns_textStringTest'));
    }

    render() {
        // Take a look in index.jsx
        return (
            <ExampleContainer headline="TextString">
                <TextString
                    stringName="txt_chayns_textStringTest"
                >
                    <p />
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                >
                    <p style={{ color: 'red' }} />
                </TextString>
            </ExampleContainer>
        );
    }
}
