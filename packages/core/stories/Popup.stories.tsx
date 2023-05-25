import { ComponentMeta, ComponentStory } from '@storybook/react';
import Popup from '../src/components/popup/Popup';

export default {
    title: 'Core/Popup',
    component: Popup,
    args: {
        content: (
            <span style={{ display: 'block', padding: '5px' }}>
                <h1>Popup</h1>
                <p>Das ist ein popup!</p>
            </span>
        ),
    },
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = ({ ...args }) => (
    <Popup {...args}>
        hweuishgpvwerbehdfffffffffff fffffffffffffffffffffffffffffffff fffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffff fffffffffffffffffffffffff hweuishgpvwerbehdfffffffffff
        fffffffffffffffffffffffffffffffff fffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffff fffffffffffffffffffffffff
    </Popup>
);

export const General = Template.bind({});
