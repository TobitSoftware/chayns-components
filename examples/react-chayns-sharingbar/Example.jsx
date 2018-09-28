import React, { Component } from 'react';
import { SharingBar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';


export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="SharingBar">
                <SharingBar />
            </ExampleContainer>
        );
    }
}
