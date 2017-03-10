import React from 'react';

import Accordion from '../src/index';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <Accordion head="Testds mdfdmsfdkfjkljsj fddjfkls jlf jsdlj " badge="Test" right={
                <div className="hi"><input type="search" /></div>
            }>
                <div className="accordion__intro">
                    Intro
                </div>

                <div className="accordion__content">
                    test
                </div>
            </Accordion>
        );
    }
}