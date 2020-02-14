import React, { Component } from 'react';

import { TextString } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

export default class TextStringExample extends Component {
    constructor(props) {
        super(props);
        // Take a look in index.jsx
        console.log('TextString.getTextString', TextString.getTextString('txt_chayns_textStringTest'));

        this.state = { number: 1 };
    }

    render() {
        const { number } = this.state;
        // Take a look in index.jsx
        return (
            <div>
                <TextString
                    stopPropagation
                    stringName="fallbackTest"
                    fallback="Test ##REPLACE## Fallback"
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                >
                    <p/>
                </TextString>
                <TextString
                    preventNoTranslate
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                    stringName="txt_chayns_textStringTest"
                    fallback="Test ##REPLACE## Fallback"
                >
                    <p/>
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    replacements={{ '##REPLACE##': chayns.env.user.name }}
                    fallback="Test ##REPLACE## Fallback"
                >
                    <p style={{ color: 'red' }}/>
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    replacements={{ '##REPLACE##': number }}
                    fallback="Test ##REPLACE## Fallback"
                >
                    <Button
                        icon="ts-chayns"
                        onClick={(e) => {
                            console.log('Button clicked', e);
                            this.setState({ number: number + 1 });
                        }}
                    >
                        {'Required children'}
                    </Button>
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest_html"
                    useDangerouslySetInnerHTML
                >
                    <div/>
                </TextString>
                <TextString
                    stringName="txt_chayns_textStringTest"
                    language="nl"
                >
                    <p/>
                </TextString>
                <TextString
                    replacements={{ '##REPLACE##': chayns.env.user.name, '##REPLACE_SITE##': chayns.env.site.title }}
                    setProps={{
                        head: 'txt_chayns_textStringTest2',
                        right: 'fallbackTest',
                        fallback: {
                            head: 'Fallback for head property',
                            right: 'Fallback for right property ##REPLACE_SITE##',
                        },
                    }}
                >
                    <Accordion head="">
                        <div>TestAccordion</div>
                    </Accordion>
                </TextString>
            </div>
        );
    }
}
