import React, { Component } from 'react';

import { Accordion } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends Component {
    state = {
        open: true
    };

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({
                open: false
            });
        }, 5000);
    }

    render() {
        return(
            <ExampleContainer headline="Accordion">
                <Accordion head="Test" badge="2" open={this.state.open}>
                    <Accordion
                        head={<span style={{ color: '#FF0000' }} className="accordion--trigger">
                                Test
                              </span>}
                        isWrapped
                        open
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
                    <Accordion head="Test" badge={<i className="fa fa-warning" />} badgeStyle={{ backgroundColor: 'red' }} isWrapped>
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                </Accordion>

                <Accordion head="Autogrow" autogrow>
                    <div style={{ height: '20000px', background: 'linear-gradient(0deg, red, yellow)' }} />
                </Accordion>
            </ExampleContainer>
        );
    }
}
