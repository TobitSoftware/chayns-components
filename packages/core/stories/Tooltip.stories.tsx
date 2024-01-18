import { Meta, StoryFn } from '@storybook/react';
import Tooltip from '../src/components/tooltip/Tooltip';

export default {
    title: 'Core/Tooltip',
    component: Tooltip,
    args: {
        item: {
            headline: 'Info',
            text: 'Dieses Gericht enthält Gluten!',
            button: { text: 'Hallo', onClick: () => alert('hallo') },
            imageUrl:
                'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
        },
    },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => (
    <Tooltip {...args}>
        <p>Pizza</p>
    </Tooltip>
);

export const General = Template.bind({});
