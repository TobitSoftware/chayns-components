import React, { PureComponent } from 'react';
import { ComboBox } from '../../src/index';

export default class ComboBoxExample extends PureComponent {
    constructor() {
        super();
        this.longList = [];
        for (let i = 0; i < 100; i += 1) {
            this.longList.push({
                key: i,
                value: i.toString(),
            });
        }
    }

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
            }, {
                id: '2',
                name: 'Prosciutto',
                price: '4.50',
            }, {
                id: '3',
                name: 'Funghi',
                price: '5.00',
            },
        ];

        return (
            <div style={{ marginBottom: '300px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <ComboBox
                        label="Select Pizza"
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                        stopPropagation
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <ComboBox
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                        defaultValue="2"
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <ComboBox
                        label="Select Pizza"
                        list={pizza}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="id"
                        listValue="name"
                        disabled
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <ComboBox
                        label="Long list"
                        list={this.longList}
                        onSelect={(value) => {
                            console.log(value);
                        }}
                        listKey="key"
                        listValue="value"
                    />
                </div>
            </div>
        );
    }
}
