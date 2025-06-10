import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import GroupedImage from '../src/components/grouped-image/GroupedImage';

export default {
    title: 'Core/GroupedImage',
    component: GroupedImage,
    args: {
        images: [
            'https://picsum.photos/id/669/160/160.jpg',
            'https://picsum.photos/id/823/160/160.jpg',
        ],
        shouldPreventBackground: false,
        shouldShowRoundImage: true,
    },
} as Meta<typeof GroupedImage>;

const Template: StoryFn<typeof GroupedImage> = (args) => <GroupedImage {...args} />;

export const General = Template.bind({});

export const LargerDimensions = Template.bind({});

export const WithCornerImage = Template.bind({});

LargerDimensions.args = {
    images: [
        'https://picsum.photos/id/669/320/320.jpg',
        'https://picsum.photos/id/823/320/320.jpg',
    ],
    height: '80px',
};

WithCornerImage.args = {
    cornerImage: 'https://sub60.tobit.com/l/1214?size=160',
};
