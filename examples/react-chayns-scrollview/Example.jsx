import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import { ScrollView } from '../../src/index';


export default class Example extends PureComponent {
    children = ['Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test',
        <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test',
        <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test',
        <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test',
        <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test',
        <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test', <br/>, 'Test',
        <br/>];

    render() {
        return (
            <ExampleContainer headline="ScrollView">
                <ScrollView
                    style={{
                        maxHeight: '500px',
                        width: '100%',
                    }}
                    showScrollbar
                >
                    {this.children}
                </ScrollView>
                <ScrollView
                    style={{
                        maxHeight: '500px',
                        width: '100%',
                    }}
                    showScrollbar
                >
                    {'Not scrollable'}
                    <br/>
                    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirm'}
                </ScrollView>
            </ExampleContainer>
        );
    }
}
