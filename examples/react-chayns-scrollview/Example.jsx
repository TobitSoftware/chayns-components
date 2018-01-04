import React from 'react';

import ExampleContainer from '../ExampleContainer';
import { ScrollView } from '../../src/index';


export default class Example extends React.Component {
    state = {
        children: ['Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />,'Test', <br />],
        // children: ['Test', <br />,'Test', <br />],
    };

    componentDidMount() {
        // window.setInterval(() => {
        //     let children = this.state.children || [];
        //     children.push('Test');
        //     children.push(<br />);
        //
        //     this.setState({
        //         children,
        //     });
        // }, 500);
    }

    render() {
        return(
            <ExampleContainer headline="ScrollView">
                <ScrollView
                    style={{
                        maxHeight: '500px',
                        width: '500px',
                    }}
                    showScrollbar
                >
                    {this.state.children}
                </ScrollView>
            </ExampleContainer>
        );
    }
}
