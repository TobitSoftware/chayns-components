import React from 'react';

import {SelectButton} from '../src/index';
import '../src/css/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        let pizza = [
            {
                id: '0',
                name: 'Margherita',
                price: '4.00'
            }, {
                id: '1',
                name: 'Salami',
                price: '4.50'
            }, {
                id: '2',
                name: 'Prosciutto',
                price: '4.50'
            }, {
                id: '3',
                name: 'Funghi',
                price: '5.00'
            }
        ];

        return(
            <SelectButton
                label="Select-Button"
                list={pizza}
                onSelect={(value) => { console.log(value) }}
                listKey="id"
                listValue="name"
            />
        );
    }
}