import React, { useState } from 'react';
import { ComboBox } from '../../src/index';

const pizza = [
    {
        id: '0',
        name: 'Margherita',
        price: '4.00',
    },
    {
        id: '1',
        name: 'Salami',
        price: '4.50',
    },
    {
        id: '2',
        name: 'Prosciutto',
        price: '4.50',
    },
    {
        id: '3',
        name: 'Funghi',
        price: '5.00',
    },
];

const htmlElements = [
    {
        id: 'p',
        name: <p>Default Text</p>,
    },
    {
        id: 'h1',
        name: <h1>Headline 1</h1>,
    },
    {
        id: 'h2',
        name: <h2>Headline 2</h2>,
    },
    {
        id: 'h3',
        name: <h3>Headline 3</h3>,
    },
    {
        id: 'footer',
        name: <footer>Footer</footer>,
    },
];

const longList = [];

for (let i = 0; i < 100; i += 1) {
    longList.push({
        key: i,
        value: i.toString(),
    });
}

const ComboBoxExample = () => {
    const [pizzaValue, setPizzaValue] = useState(null);

    return (
        <div style={{ marginBottom: '300px' }}>
            <div style={{ marginBottom: '20px' }}>
                <ComboBox
                    label="Select Pizza"
                    list={pizza}
                    onSelect={(value) => {
                        setPizzaValue(value.id);
                        console.log(value);
                    }}
                    listKey="id"
                    listValue="name"
                    stopPropagation
                    value={pizzaValue}
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
                    list={pizza}
                    onSelect={(value) => {
                        console.log(value);
                    }}
                    listKey="id"
                    listValue="name"
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
                    list={longList}
                    onSelect={(value) => {
                        console.log(value);
                    }}
                    listKey="key"
                    listValue="value"
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <ComboBox
                    label="HTML Elements"
                    list={htmlElements}
                    onSelect={console.log}
                    listKey="id"
                    listValue="name"
                />
            </div>
        </div>
    );
};

export default ComboBoxExample;
