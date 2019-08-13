/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { AmountControl } from '../../src/index';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

const AmountControlExample = () => {
    const [amount, setAmount] = useState(0);

    return (
        <div data-equalize="group-1">
            <AmountControl
                autoInput
                disabled={false}
                amount={amount}
                onChange={setAmount}
                equalize="group-1"
                buttonText="0,15"
                addColor="#20C65A"
                removeColor="#E71E28"
                iconColor="#20C65A"
                focusOnClick={false}
                icon={faShoppingCart}
                stopPropagation
            />

            <br />

            <AmountControl
                disabled={false}
                amount={amount}
                onChange={setAmount}
                contentWidth={200}
                buttonText="mtl. 15,95 €"
                icon="ts-tobit"
                plusIcon="ts-tobit"
                minusIcon="ts-tobit"
                removeIcon="ts-tobit"
            />

            <br />

            <AmountControl
                disabled
                amount={amount}
                onChange={setAmount}
                equalize="group-1"
                buttonText="test-article"
            />

            <br />

            <Accordion
                right={(
                    <AmountControl
                        className="accordion--no-trigger"
                        icon="ts-bamboo"
                        amount={amount}
                        onChange={setAmount}
                        equalize="group-1"
                        buttonText="2,20€"
                        iconColor="blue"
                    />
                )}
                head="Afri Cola"
            >
                Test
            </Accordion>

            <br />

            <AmountControl
                amount={amount}
                onChange={setAmount}
                equalize="group-1"
                buttonText="mtl. 15,95 €"
                disableInput
            />

            <br />

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <AmountControl
                    amount={amount}
                    onChange={setAmount}
                    equalize="group-1"
                    buttonText="mtl. 15,95 €"
                    disableRemove
                />

                <AmountControl
                    amount={amount}
                    onChange={setAmount}
                    equalize="group-1"
                    buttonText="mtl. 15,95 €"
                    disableAdd
                />

                <AmountControl
                    amount={amount}
                    onChange={setAmount}
                    equalize="group-1"
                    buttonText="mtl. 15,95 €"
                    disableAdd
                    disableRemove
                />
            </div>

            <AmountControl
                amount={amount}
                onChange={setAmount}
                buttonFormatHandler={({ amount: a }) => `${a} h`}
                disableInput
            />

            <br />

            <AmountControl
                amount={amount}
                onChange={setAmount}
                buttonText="(Amount > 0) => Input"
                showInput={amount > 0}
            />

            <div style={{ textAlign: 'right' }}>
                <AmountControl
                    autoInput
                    disabled={false}
                    amount={amount}
                    onChange={setAmount}
                    buttonText="0,15"
                />
            </div>

            <AmountControl
                amount={amount}
                onInput={setAmount}
                buttonText="0,10"
                showInput={amount > 0}
            />

            <br />

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <AmountControl
                    amount={amount}
                    onChange={setAmount}
                    buttonText="min 2"
                    showInput={amount > 0}
                    min={2}
                />

                <AmountControl
                    amount={amount}
                    onChange={setAmount}
                    buttonText="max 5"
                    showInput={amount > 0}
                    max={5}
                />

                <AmountControl
                    amount={amount}
                    onChange={setAmount}
                    buttonText="min 2, max 5"
                    showInput={amount > 0}
                    min={2}
                    max={5}
                />
            </div>
        </div>
    );
};

export default AmountControlExample;
