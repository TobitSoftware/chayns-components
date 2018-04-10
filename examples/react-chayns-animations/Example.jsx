import React from 'react';

import ExampleContainer from '../ExampleContainer';
import InspectElementExample from './InspectElementExample';
import ScaleInExample from './ScaleInExample';

import '../../src/react-chayns-animations/index.scss';
import '../../src/react-chayns-animations/component/ScaleIn/index.scss';

export default class Example extends React.Component {
    state = {
        show: false,
    };

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                show: !this.state.show,
            });
        }, 5000);
    }

    render() {
        return(
            <ExampleContainer headline="Animations" >
                <div className="accordion">
                    <div className="accordion__head">InspectElement</div>
                    <div className="accordion__body">
                        <InspectElementExample />
                    </div>
                </div>

                <div className="accordion">
                    <div className="accordion__head">ScaleIn</div>
                    <div className="accordion__body">
                        <ScaleInExample
                            in={this.state.show}
                            style={{
                                background: '#666666',
                            }}
                        />
                    </div>
                </div>
            </ExampleContainer>
        );
    }
}
