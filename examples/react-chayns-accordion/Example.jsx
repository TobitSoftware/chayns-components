import React, { Component } from 'react';

import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';
import Input from '../../src/react-chayns-input/component/Input';

export default class Example extends Component {
    render() {
        return (
            <ExampleContainer headline="Accordion">
                <Accordion
                    head="Accordion mit Suche"
                    onSearch={console.log}
                    searchPlaceholder={"Suche"}
                >
                    <div className="accordion__content">

                        Hello World
                    </div>
                </Accordion>
                <Accordion head="Test" badge="2">
                    <Accordion
                        head={(
                            <span style={{ color: '#FF0000' }} className="accordion--trigger">

                                Test
                            </span>
                        )}
                        isWrapped
                        open
                    >
                        <div className="accordion__content">

                            Hello World 1
                        </div>
                    </Accordion>
                    <Accordion
                        head={<Input placeholder="Accordion title input" style={{ width: '100%' }}/>}
                        isWrapped
                        icon={faRocket}
                        dataGroup="abc"
                        noTitleTrigger
                    >
                        <div className="accordion__content">

                            Hello World 2
                        </div>
                    </Accordion>
                    <Accordion
                        dataGroup="abc"
                        icon="ts-tobit"
                        noRotate
                        head="noRotate"
                        badge={1}
                        badgeStyle={{ fontWeight: 'bold' }}
                        isWrapped
                    >
                        <div className="accordion__content">

                            Hello World 2
                        </div>
                    </Accordion>
                </Accordion>
                <Accordion head="Autogrow" autogrow>
                    <div style={{ height: '20000px', background: 'linear-gradient(0deg, red, yellow)' }}/>
                </Accordion>
                <Accordion head="Accordion with Button" right={<Button>Test</Button>}>
                    <div style={{ height: '200px', background: 'linear-gradient(0deg, purple, orange)' }}/>
                </Accordion>
                <Accordion head="Fixed Accordion without icon" fixed defaultOpened noIcon>
                    <div style={{ height: '200px', background: 'linear-gradient(0deg, blue, green)' }}/>
                </Accordion>
            </ExampleContainer>
        );
    }
}
