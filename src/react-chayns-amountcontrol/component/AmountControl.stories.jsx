import React, { useState } from 'react';
import AmountControl from './AmountControl';

export default {
    title: 'chayns-components/AmountControl',
    component: AmountControl,
};

const Template = (args) => <AmountControl {...args} />;

export const BasicExample = (args) => {
    const [value, setValue] = useState(0);

    return <AmountControl {...args} amount={value} onChange={setValue} />;
};

export const WithoutState = Template.bind({});
WithoutState.args = {};
