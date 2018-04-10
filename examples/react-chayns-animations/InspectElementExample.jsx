import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExampleChild from './ExampleChild';
import InspectElement from '../../src/react-chayns-animations/component/InspectElement/InspectElement';

export default class InspectElementExample extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <div className="accordion accordion--open" data-group="acc">
                    <div className="accordion__head">Test</div>
                    <div className="accordion__body">
                        <div className="accordion__content">
                            <span style={{ margin: '15px' }}>
                                <InspectElement
                                    component={ExampleChild}
                                    name="Test1"
                                    expandedWidth={500}
                                >
                                    test
                                </InspectElement>
                            </span>

                            <span style={{ margin: '15px' }}>
                                <InspectElement
                                    component={ExampleChild}
                                    name="Test2"
                                    expandedWidth={400}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="accordion accordion--open" data-group="acc">
                    <div className="accordion__head">Test</div>
                    <div className="accordion__body">
                        <div className="accordion__content">
                            <span style={{ margin: '15px' }}>
                                <InspectElement
                                    component={ExampleChild}
                                    name="Test3"
                                />
                            </span>

                            <span style={{ margin: '15px' }}>
                                <InspectElement
                                    component={ExampleChild}
                                    name="Test4"
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <span style={{ margin: '15px' }}>
                    <InspectElement component={ExampleChild} name="Test5" />
                </span>

                <span style={{ margin: '15px' }}>
                    <InspectElement component={ExampleChild} name="Test6" />
                </span>
            </div>
        );
    }
}
