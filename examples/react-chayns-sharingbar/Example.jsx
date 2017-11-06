import React from 'react';
import { SharingBar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import '../../src/react-chayns-sharingbar/index.scss';


export default class Example extends React.Component {
    render() {
        return(
            <ExampleContainer headline="SharingBar">
                <SharingBar />
            </ExampleContainer>
        );
    }
}
