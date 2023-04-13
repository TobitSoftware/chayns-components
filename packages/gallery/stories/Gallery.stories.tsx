import { ComponentMeta, ComponentStory } from '@storybook/react';

import Gallery from '../src/components/gallery/Gallery';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    args: {},
} as unknown as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = ({ children, ...args }) => (
    <Gallery {...args}>{children}</Gallery>
);

export const General = Template.bind({});
