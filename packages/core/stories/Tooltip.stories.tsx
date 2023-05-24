import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TooltipAlignment } from '../src/components/tooltip/interface';
import Tooltip from '../src/components/tooltip/Tooltip';

export default {
    title: 'Core/Tooltip',
    component: Tooltip,
    args: {
        item: {
            headline: 'Info',
            text: 'Dieses Gericht enthält Gluten!',
        },
        alignment: TooltipAlignment.BottomCenter,
    },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args}>Pizza</Tooltip>;

export const General = Template.bind({});
