import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import { TextString } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';

export default class Example extends PureComponent {
    constructor(props) {
        super(props);
        // Take a look in index.jsx
        console.log('TextString.getTextString', TextString.getTextString('txt_chayns_textStringTest'));

        chayns.register({ apiDialogs: true });
    }

    render() {
        // Take a look in index.jsx
        return (
            <ExampleContainer headline="TextString">
                <TextString
                    stringName="fallbackTest"
                    fallback="Test ##REPLACE## Fallback"
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                >
                    <p />
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    fallback="Test ##REPLACE## Fallback"
                >
                    <p />
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                    fallback="Test ##REPLACE## Fallback"
                >
                    <p style={{ color: 'red' }} />
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                    fallback="Test ##REPLACE## Fallback"
                >
                    <Button icon="ts-chayns" onClick={(e) => { console.log('Button clicked', e); }} >
                        {'Required children'}
                    </Button>
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest_html"
                    useDangerouslySetInnerHTML
                >
                    <div />
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    language="nl"
                >
                    <p />
                </TextString>
            </ExampleContainer>
        );
    }
}
