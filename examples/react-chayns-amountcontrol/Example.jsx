import React, { Component } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { AmountControl } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

export default class Example extends Component {
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

        return (
            <ExampleContainer
                headline="AmountControl"
                data-equalize="group-1"
            >
                <AmountControl
                    autoInput
                    disabled={false}
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="0,15"
                    addColor="#20C65A"
                    removeColor="#E71E28"
                    iconColor="#20C65A"
                    focusOnClick={false}
                    icon={faShoppingCart}
                />

                <br/>

                <AmountControl
                    disabled={false}
                    amount={amount}
                    onChange={this.onChange}
                    contentWidth={200}
                    buttonText="mtl. 15,95 €"
                    icon="ts-tobit"
                />

                <br/>

                <AmountControl
                    disabled
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="test-article"
                />

                <br/>

                <Accordion
                    right={(
                        <AmountControl
                            icon="ts-bamboo"
                            disabled={false}
                            amount={amount}
                            onChange={this.onChange}
                            equalize="group-1"
                            buttonText="2,20€"
                            iconColor="blue"
                        />
                    )}
                    head="Afri Cola"
                >


                    Test
                </Accordion>

                <br/>

                <AmountControl
                    amount={amount}
                    onChange={this.onChange}
                    equalize="group-1"
                    buttonText="mtl. 15,95 €"
                    disableInput
                />

                <br/>

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

                <br/>

                <AmountControl
                    amount={amount}
                    onChange={this.onChange}
                    buttonText="(Amount > 0) => Input"
                    showInput={amount > 0}
                />

                <div style={{ textAlign: 'right' }}>
                    <AmountControl
                        autoInput
                        disabled={false}
                        amount={amount}
                        onChange={this.onChange}
                        buttonText="0,15"
                    />
                </div>

                <AmountControl
                    amount={amount}
                    onInput={this.onChange}
                    buttonText="0,10"
                    showInput={amount > 0}
                />
            </ExampleContainer>
        );
    }
}
