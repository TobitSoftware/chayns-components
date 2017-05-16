import React from 'react';

import Accordion from "../../src/react-chayns-accordion/component/Accordion";

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Accordion head="Test">
                    <Accordion
                        head={<span style={{color: '#FF0000'}} className="accordion--trigger">
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
                </Accordion>
            </div>
        );
    }
}