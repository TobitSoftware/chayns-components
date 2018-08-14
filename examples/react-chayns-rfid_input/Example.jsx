import React from 'react';

import { RfidInput } from '../../src/index';
import '../../src/react-chayns-rfid_input/index.scss';
import ExampleContainer from '../ExampleContainer';

export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            rfidInput: '',
            rfid: '',
        };
    }

    onInput = (rfidInput) => {
        this.setState({ rfidInput });
    };

    onConfirm = (rfid) => {
        this.setState({ rfid });
    };

    render() {
        const { rfid, rfidInput } = this.state;

        return (
            <ExampleContainer headline="RFID Input">
                <h3>RFID-Live</h3>
                <p>{rfidInput || '-'}</p>
                <h3>RFID</h3>
                <p>{rfid || '-'}</p>

                <RfidInput
                    onConfirm={this.onConfirm}
                    onInput={this.onInput}
                    value={rfidInput}
                    enableScan={RfidInput.isNfcAvailable()}
                />

                <RfidInput
                    onConfirm={this.onConfirm}
                    onInput={this.onInput}
                    value={rfidInput}
                    enableScan
                />
            </ExampleContainer>
        );
    }
}
