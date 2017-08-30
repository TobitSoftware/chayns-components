import React from 'react';

import { Accordion } from '../../src/index';

export default class Example extends React.Component {
    render() {
        return(
            <div>
                <Accordion head="Test" badge="2">
                    <Accordion
                        head={<span style={{ color: '#FF0000' }} className="accordion--trigger">
                                Test
                              </span>}
                        isWrapped
                    >

                        <div className="accordion__content">
                            Hello World 1
                        </div>
                    </Accordion>
                    <Accordion head="Test" isWrapped>
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                    <Accordion head="Test" badge={<i className="fa fa-warning" />} isWrapped>
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                </Accordion>

                <Accordion head="Autogrow" autogrow>
                    <div style={{ height: '20000px', background: 'linear-gradient(0deg, red, yellow)' }} />
                </Accordion>
            </div>
        );
    }
}
