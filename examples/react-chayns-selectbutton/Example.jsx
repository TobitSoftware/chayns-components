import React, { PureComponent } from 'react';

import { SelectButton } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {
    render() {
        const pizza = [
            {
                id: '0',
                name: 'Margherita',
                price: '4.00',
            }, {
                id: '1',
                name: 'Salami',
                price: '4.50',
                isMyPizza: true,
            }, {
                id: '2',
                name: 'Prosciutto',
                price: '4.50',
            }, {
                id: '3',
                name: 'Funghi',
                price: '5.00',
            }
        ];

        return (
            <ExampleContainer headline="SelectButton">
                <div style={{ marginBottom: '20px' }}>
                    <SelectButton
                        stopPropagation
                        label="Select Pizza"
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <SelectButton
                        description="Select one or more pizza"
                        label="Select one or more pizza"
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                        multiSelect
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <SelectButton
                        showLabel
                        title="Find your pizza"
                        label="Find your pizza"
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                        selectedFlag="isMyPizza"
                        quickFind
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <SelectButton
                        label="Disabled Pizza"
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                        disabled
                    />
                </div>
            </ExampleContainer>
        );
    }
}
