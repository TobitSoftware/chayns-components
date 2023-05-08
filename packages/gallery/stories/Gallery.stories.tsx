import { ComponentMeta, ComponentStory } from '@storybook/react';

import Gallery from '../src/components/Gallery';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    args: {
        files: [
            {
                uploadedFile: {
                    id: '1',
                    url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                },
            },
            {
                uploadedFile: {
                    id: '2',
                    url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
                },
            },
            {
                uploadedFile: {
                    id: '3',
                    url: 'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                },
            },
        ],
    },
} as unknown as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = ({ children, ...args }) => (
    <Gallery {...args}>{children}</Gallery>
);

export const General = Template.bind({});

export const EditMode = Template.bind({});

EditMode.args = {
    isEditMode: true,
};
