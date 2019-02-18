import React, { Component } from 'react';
import { SharingBar } from '../../src/index';

export default class SharingBarExample extends Component {
    render() {
        return(
            <SharingBar stopPropagation />
        );
    }
}
