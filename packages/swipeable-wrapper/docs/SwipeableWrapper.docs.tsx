import React, { FC } from 'react';
import { SwipeableWrapper, SwipeableActionItem } from '@chayns-components/swipeable-wrapper';
import { Icon } from '@chayns-components/core';

const Component: FC = () => {
    const leftActions: SwipeableActionItem[] = [
        {
            action: () => console.log('Comment'),
            backgroundColor: 'blue',
            color: 'white',
            icon: <Icon color="white" icons={['fa fa-comment']} />,
            key: 'comment',
            text: 'Comment',
        },
    ];

    const rightActions: SwipeableActionItem[] = [
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
    ];

    return (
        <SwipeableWrapper rightActions={rightActions} leftActions={leftActions}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SwipeableWrapper>
    );
};

Component.displayName = 'Component';

export default Component;
