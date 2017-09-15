import React from 'react';

import ExampleContainer from '../ExampleContainer';
import { InspectElementAnimation as InspectElement } from '../../src/index';
import ExampleChild from './ExampleChild';
import '../../src/react-chayns-animations/index.scss';

export default class Example extends React.Component {
    state = {
        open: false
    };

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({
                open: true
            });
        }, 1000);
    }

    render() {
        const { open } = this.state;

        return(
            <ExampleContainer headline="Animations" >
                <div className="accordion accordion--open" data-group="acc">
                    <div className="accordion__head">Test</div>
                    <div className="accordion__body">
                        <div className="accordion__content">
                            <span style={{ margin: '15px' }}>
                                <InspectElement
                                    component={ExampleChild}
                                    name="Test1"
                                    // expanded={open}
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
            </ExampleContainer>
        );
    }
}
