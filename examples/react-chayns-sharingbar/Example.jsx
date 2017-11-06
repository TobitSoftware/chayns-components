import React from 'react';
import { Sharingbar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends React.Component {
    render() {
        return(
            <ExampleContainer headline="Sharingbar">
                <Sharingbar link="https://www.facebook.com/tobit.software/"/>
            </ExampleContainer>
        );
    }
}
