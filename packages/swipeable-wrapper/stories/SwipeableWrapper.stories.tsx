import { Icon, ListItem } from '@chayns-components/core';
import { Meta, StoryFn } from '@storybook/react';
import SwipeableWrapper from '../src/components/swipeable-wrapper/SwipeableWrapper';

export default {
    title: 'SwipeableWrapper/SwipeableWrapper',
    component: SwipeableWrapper,
    args: {
        children: <ListItem title="Swipe me" />,
        leftActions: [
            {
                action: () => console.log('Comment'),
                backgroundColor: 'blue',
                color: 'white',
                icon: <Icon color="white" icons={['fa fa-comment']} />,
                key: 'comment',
                text: 'Comment',
            },
        ],
        rightActions: [
            {
                action: () => console.log('Star'),
                backgroundColor: 'darkkhaki',
                color: 'black',
                icon: <Icon color="black" icons={['fa fa-star']} />,
                key: 'star',
                text: 'Star',
            },
            {
                action: () => console.log('Fire'),
                backgroundColor: 'red',
                color: 'white',
                icon: <Icon color="white" icons={['fa fa-fire']} />,
                key: 'fire',
                text: 'Fire',
            },
        ],
    },
} as Meta<typeof SwipeableWrapper>;

const Template: StoryFn<typeof SwipeableWrapper> = ({ children, ...args }) => (
    <SwipeableWrapper {...args}>{children}</SwipeableWrapper>
);

export const General = Template.bind({});
