import { Meta, StoryFn } from '@storybook/react';
import AmountControl from '../src/components/amount-control/AmountControl';
import Button from '../src/components/button/Button';
import {useState} from "react";

export default {
    title: 'Core/AmountControl',
    component: AmountControl,
    args: {},
} as Meta<typeof AmountControl>;

const Template: StoryFn<typeof AmountControl> = (args) => <AmountControl {...args} />;

const ResetTemplate: StoryFn<typeof AmountControl> = (args) => {
    const [amount, setAmount] = useState(0);


    return <><Button onClick={()=> setAmount(0)}>Zurücksetzen</Button><AmountControl {...args} amount={amount} onChange={(newAmount)=> setAmount(newAmount)} /></>
};

export const General = Template.bind({});

export const WithLabel = Template.bind({});

export const WithMaxAmount = Template.bind({});

export const ResetAmount = ResetTemplate.bind({});

WithLabel.args = {
    label: '1,43',
};

WithMaxAmount.args = {
    maxAmount: 1,
};
