import React from 'react';
import { SharingBar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends React.Component {
    render() {
        return(
            <ExampleContainer headline="SharingBar">
                <SharingBar />
            </ExampleContainer>
        );
    }
}
