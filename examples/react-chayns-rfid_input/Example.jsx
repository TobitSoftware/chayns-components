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
        return(
            <ExampleContainer headline="RFID Input">
                <h3>RFID-Live</h3>
                <p>{this.state.rfidInput || '-'}</p>
                <h3>RFID</h3>
                <p>{this.state.rfid || '-'}</p>

                <RfidInput
                    onConfirm={this.onConfirm}
                    onInput={this.onInput}
                    value={this.state.rfidInput}
                    enableScan={chayns.env.isApp && chayns.env.isAndroid}
                />
            </ExampleContainer>
        );
    }
}
