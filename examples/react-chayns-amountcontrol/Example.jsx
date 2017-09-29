import React from 'react';

import { AmountControl } from '../../src/index';
import '../../src/react-chayns-amountcontrol/index.scss';
import ExampleContainer from '../ExampleContainer';

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
        const { amount } = this.state;

        return(
            <ExampleContainer
                headline="AmountControl Example"
                data-equalize="group-1"
            >
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
                    disabled
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="test-article"
                />

                <br />

                <AmountControl
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="mtl. 15,95 €"
                    disableInput
                />

                <br />


                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <AmountControl
                        amount={amount}
                        onChange={this.onChange}
                        equalize="group-1"
                        buttonText="mtl. 15,95 €"
                        disableRemove
                    />

                    <AmountControl
                        amount={amount}
                        onChange={this.onChange}
                        equalize="group-1"
                        buttonText="mtl. 15,95 €"
                        disableAdd
                    />

                    <AmountControl
                        amount={amount}
                        onChange={this.onChange}
                        equalize="group-1"
                        buttonText="mtl. 15,95 €"
                        disableAdd
                        disableRemove
                    />
                </div>
            </ExampleContainer>
        );
    }
}
