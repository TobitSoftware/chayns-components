import React from 'react';

import AmountControl from '../../src/react-chayns-amountcontrol/index';
import '../../src/react-chayns-amountcontrol/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            amount: 0
        };
    }

    onChange = (value) => {
        this.setState({
            amount: value
        });
    };

    render() {
        const {amount} = this.state;

        return(
            <div data-equalize="group-1" style={{ border: 'solid 1px grey', padding: '5px' }}>
                <h1>AmountControl Example</h1>

                <AmountControl
                    disabled={false}
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="0,15"
                />

                <br />

                <AmountControl
                    disabled={false}
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="mtl. 15,95 €"
                />

                <br />

                <AmountControl
                    disabled={true}
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="test-article"
                />
            </div>
        );
    }
}