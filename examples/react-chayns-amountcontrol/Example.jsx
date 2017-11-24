import React from 'react';

import { AmountControl } from '../../src/index';
import '../../src/react-chayns-amountcontrol/shop.scss';
import ExampleContainer from '../ExampleContainer';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            amount: 1
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
                    autoInput
                    disabled={false}
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="0,15"
                    shopStyle
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

                <Accordion head={
                    <AmountControl
                        disabled={false}
                        amount={amount}
                        onChange={this.onChange}
                        equalize="group-1"
                        buttonText="0,15"
                    />}
                >
                    Test
                </Accordion>

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

                <AmountControl
                    amount={amount}
                    onChange={this.onChange}
                    buttonFormatHandler={({ amount: a }) => `${a} h`}
                    disableInput
                />

                <br />

                <AmountControl
                    amount={amount}
                    onChange={this.onChange}
                    buttonText="(Amount > 0) => Input"
                    showInput={amount > 0}
                />
            </ExampleContainer>
        );
    }
}
