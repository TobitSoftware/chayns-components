import React from 'react';
import ComboBox from './ComboBox';

export default {
    title: 'chayns-components/ComboBox',
    component: ComboBox,
};

const Template = (args) => <ComboBox {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {
    label: 'Select Pizza',
    list: [
        { id: '0', name: 'Margherita', price: '4.00' },
        { id: '1', name: 'Salami', price: '4.50' },
        { id: '2', name: 'Prosciutto', price: '4.50' },
        { id: '3', name: 'Funghi', price: '5.00' },
    ],
    listKey: 'id',
    listValue: 'name',
};
