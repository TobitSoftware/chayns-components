import { Meta, StoryFn } from '@storybook/react';
import GridImage from '../src/components/grid-image/GridImage';

export default {
    title: 'Core/GridImage',
    component: GridImage,
    args: {
        images: [
            'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
            'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
            'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
            'https://tsimg.cloud/77896-21884/fce5e30f68c75c8c524cc9ac0887832f263b79ff.png',
        ],
        size: 250,
    },
} as Meta<typeof GridImage>;

const Template: StoryFn<typeof GridImage> = (args) => <GridImage {...args} />;

export const General = Template.bind({});
