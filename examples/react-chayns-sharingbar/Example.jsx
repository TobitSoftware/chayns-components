import React, { Component } from 'react';
import { SharingBar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';


export default class SharingBarExample extends Component {
    render() {
        return(
            <ExampleContainer headline="SharingBar">
                <SharingBar stopPropagation />
            </ExampleContainer>
        );
    }
}
