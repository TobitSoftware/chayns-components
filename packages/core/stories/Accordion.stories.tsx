import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from '../src/components/accordion/Accordion';

export default {
    title: 'Core/Accordion',
    component: Accordion,
    args: {
        children: 'Click me!',
    },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = ({ children, ...args }) => (
    <Accordion {...args}>
        <p>Hallo David</p>
        <p>Hallo Heiner</p>
        <Accordion title="Test 123">
            <p>Hallo Jannik</p>
        </Accordion>
        <p>Hallo Patrick</p>
    </Accordion>
);

export const General = Template.bind({});
