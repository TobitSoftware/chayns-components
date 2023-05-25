import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from '../src/components/tooltip/Tooltip';

export default {
    title: 'Core/Tooltip',
    component: Tooltip,
    args: {
        item: {
            headline: 'Info',
            text: 'Dieses Gericht enthält Gluten!',
        },
    },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args}>Pizza</Tooltip>;

export const General = Template.bind({});
