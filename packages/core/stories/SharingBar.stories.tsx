import { ComponentMeta, ComponentStory } from '@storybook/react';
import SharingBar from '../src/components/sharing-bar/SharingBar';

export default {
    title: 'Core/SharingBar',
    component: SharingBar,
    args: {
        link: 'https://components.chayns.net/',
    },
} as ComponentMeta<typeof SharingBar>;

const Template: ComponentStory<typeof SharingBar> = (args) => <SharingBar {...args} />;

export const General = Template.bind({});
