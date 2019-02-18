import React, { Component } from 'react';
import { SharingBar } from '../../src/index';
import ExampleContainer from '../utils/components/ExampleContainer';


export default class SharingBarExample extends Component {
    render() {
        return(
            <ExampleContainer
                headline="SharingBar"
                id="react-chayns-sharingbar"
            >
                <SharingBar stopPropagation />
            </ExampleContainer>
        );
    }
}
